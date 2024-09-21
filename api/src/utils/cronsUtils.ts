import axios from 'axios';
import { Builder } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';
import { PutObjectCommandInput, S3 } from '@aws-sdk/client-s3';

export class CronsUtils {

    constructor() { }

    public async buildBrowser() {
        try {
            const chromeOptions = new chrome.Options();
            // chromeOptions.addArguments('--headless');
            chromeOptions.addArguments('--disable-gpu');
            chromeOptions.addArguments('--no-sandbox');
            chromeOptions.addArguments('--disable-blink-features=AutomationControlled');
            chromeOptions.addArguments('user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
            chromeOptions.addArguments('--disable-notifications');
            chromeOptions.addArguments('--disable-popup-blocking');
            chromeOptions.excludeSwitches("enable-automation")
            chromeOptions.addArguments('--disable-blink-features=AutomationControlled');

            const driver = new Builder()
                .forBrowser('chrome')
                .disableEnvironmentOverrides()
                .withCapabilities({
                    'browserName': 'chrome', 'name': 'Chrome Test', 'tz': 'America/Los_Angeles', 'build': 'Chrome Build', 'idleTimeout': '60', "acceptSslCerts": true, "acceptInsecureCerts": true
                })
                .setChromeOptions(chromeOptions)
                .build();
            return driver;
        } catch (error) {
            console.error("Setup failed: ", error);
            return null;
        }
    }

    public async sleep(ms: number) {
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    }

    public static async downloadImagesAndUploadToS3(imageUrl: string, imageName: string, bucketName: string) {
        const s3 = new S3({
            region: "ca-central-1",
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? "",
                secretAccessKey: process.env.AWS_SECRET_KEY ?? "",
            },
        });

        try {
            await s3.headBucket({ Bucket: bucketName });
        } catch (error: any) {
            if (error.name === 'NotFound') {
                await s3.createBucket({
                    Bucket: bucketName,
                    CreateBucketConfiguration: {
                        LocationConstraint: "ca-central-1",
                    },
                });
                // Set bucket policy to make it public
                const bucketPolicyParams = {
                    Bucket: bucketName,
                    Policy: JSON.stringify({
                        Version: "2012-10-17",
                        Statement: [
                            {
                                Sid: "PublicReadGetObject",
                                Effect: "Allow",
                                Principal: "*",
                                Action:
                                    // get and upload
                                    "s3:GetObject, s3:PutObject",
                                Resource: `arn:aws:s3:::${bucketName}/*`,
                            },
                        ],
                    }),
                };

                await s3.putBucketPolicy(bucketPolicyParams);

                // make bucket public
                const publicAccessBlockParams = {
                    Bucket: bucketName,
                    PublicAccessBlockConfiguration: {
                        BlockPublicAcls: false,
                        IgnorePublicAcls: false,
                        BlockPublicPolicy: false,
                        RestrictPublicBuckets: false,
                    },
                };

                await s3.putPublicAccessBlock(publicAccessBlockParams);

            } else {
                console.error("Error accessing bucket: ", error);
                return;
            }
        }





        // Upload image to S3
        try {
            const data = await axios.get(imageUrl, {
                responseType: "arraybuffer",
                responseEncoding: "binary",
            });
            const arrayOfBuffer = data.data;
            if (!arrayOfBuffer) {
                return;
            }

            const params: PutObjectCommandInput = {
                Bucket: bucketName,
                Key: `${bucketName}/${imageName.replace(/ /g, '-')}.webp`,
                Body: arrayOfBuffer,
                ContentType: "image/webp",
            };
            await s3.putObject(params);
            const newImg = `https://${bucketName}.s3.amazonaws.com/${bucketName}/${imageName.replace(/ /g, '-')}.webp`;
            return newImg;
        } catch (error) {
            console.error("Error downloading image: ", error);
        }
    }
}