import Products from '../schemas/products';
import { load } from 'cheerio';
import fs from 'fs';
import { By, until, Key, WebDriver } from 'selenium-webdriver';
import { CronsUtils } from '../utils/cronsUtils';


export const lorealProfessionalCron = async (brandName: string, lineName: string, bucketName: string) => {
    console.log('=========================== Loreal Cron Started ===========================');
    // const httpsAgent = new HttpsProxyAgent('https://a5e03546c5cb61a78f2e:65c19ff36ff2b304@gw.dataimpulse.com:823')

    try {

        const cronUtils = new CronsUtils()
        const driver = await cronUtils.buildBrowser() as WebDriver;

        const email = 'Royalschoolhairdressing@gmail.com';
        const password = 'Progress@680';
        await driver.get('https://ca.lorealpartnershop.com/en/login/');

        await driver.findElement(
            // by name contains 'dwfrm_login_username'
            By.css('input[name*="dwfrm_login_username"]')
        ).sendKeys(email);
        await driver.findElement(By.css('input[name*="dwfrm_login_password"]')).sendKeys(password);
        await driver.wait(until.elementIsVisible(driver.findElement(By.id('onetrust-accept-btn-handler'))), 10000);
        await driver.findElement(By.id('onetrust-accept-btn-handler')).click();
        await driver.wait(until.elementIsVisible(driver.findElement(By.css('button[data-ui="submitButton"]'))
        ), 10000);
        await driver.findElement(By.css('button[data-ui="submitButton"]')).click();
        await driver.wait(until.urlContains('https://ca.lorealpartnershop.com/en/homepage/?alert=&validateform=success'), 10000);

        const start = 0;
        const limit = 12;

        const products: any[] = [];

        try {
            const url = `https://ca.lorealpartnershop.com/en/shop-by-brand/${brandName}/${lineName}/?start=${start}&sz=${limit}&target=page-element&format=ajax&isAjax=true`;
            await driver.get(url);
            await driver.wait(until.urlContains(url), 10000);
            const html = await driver.getPageSource();
            const $ = load(html);
            const productsUrls = $(
                'a[data-ui="productDetailLink"]'
            ).map((i, el) => `https://ca.lorealpartnershop.com/en${$(el)?.attr('href')}`);

            for (const productUrl of productsUrls) {
                await driver.get(productUrl);
                // await driver.wait(until.urlContains(productUrl), 10000);
                // sleep for 5 seconds
                // {
                //     "_id": {
                //         "$oid": "6643ab9820a7f5e2d787fdb2"
                //     },
                //     "product_name": "Revive ProCare Shampoo 750 ML",
                //         "description": "<p>Naturally-based Shampoo<span> </span><br>A gentle sulfate-free daily cleanser/shampoo formulated with protein, vitamin complexes and nutrients to cleanse your scalp of styling product buildup, environmental residue and toxins<br>that collect on your scalp. Addresses scalp concerns such as dryness, flaking and itching. Sodium chloride free, safe for chemically treated hair such as hair color and keratin straightening.<br>Usage Directions: Apply to wet hair. Lather 1 minute. Rinse. Repeat if necessary. Follow with Moisture+ Conditioner.<br><br>Active Botanical extracts: Epilobium Angustifolium Flower/Leaf/Stem Extract, Olive leaf, Trifolium Pratense, Serenoa Serrulata Fruit Extract.<br><br>Features<br>Sulfate-free<br>Sodium chloride free, Sodium benzoate free<br>Color safe<br>removes environmental residue, product<br>removes DHT build-up from the hair and scalp<br>Formulated with REVIV3 Proprietary Complex, herbal extracts, amino acids and glycoprotein for strength and volume.</p>\n<p>Benefits<br>Protects against damage from chemical residue<br>Increases volume<br>Protects color vibrancy<br>Stops color fading<br>Reduces daily hair loss &amp; increases volume<br>First step in creating a healthy scalp environment</p>",
                //             "sale_price": {
                //         "sale": 0
                //     },
                //     "price": {
                //         "regular": 55.62
                //     },
                //     "categories": [
                //         {
                //             "name": "hair loss",
                //             "main": "shampoo"
                //         },
                //         {
                //             "name": "REVIVE",
                //             "main": "shampoo"
                //         },
                //         {
                //             "name": "Shampoo",
                //             "main": "shampoo"
                //         },
                //         {
                //             "name": "thinning hair",
                //             "main": "shampoo"
                //         }
                //     ],
                //         "imgs": [
                //             "https://salonbrandz.s3.ca-central-1.amazonaws.com/salonbrandsImgs/Revive_ProCare_Shampoo_750_ML-0.webp"
                //         ],
                //             "isHidden": false,
                //                 "status": "NORMAL",
                //                     "rating": 0,
                //                         "variation_type": null,
                //                             "variations": [],
                //                                 "wholesale_price": null,
                //                                     "lineName": null,
                //                                         "companyName": {
                //         "name": "REVIVE"
                //     },
                //     "perfix": null,
                //         "priceType": "single",
                //             "proDiscPercent": 0.2,
                //                 "__v": 0,
                //                     "createdAt": {
                //         "$date": "2024-05-14T18:21:12.909Z"
                //     },
                //     "updatedAt": {
                //         "$date": "2024-05-14T18:21:12.909Z"
                //     }
                // }
                await cronUtils.sleep(5000);
                const productHtml = await driver.getPageSource();
                const $productElem = load(productHtml);
                const mainId = $productElem('div[id="pdpMain"]').attr('data-itemid');
                const productObj: any = {};
                productObj.product_name = $productElem('h1.c-product__name').text().replace(/\s+/g, ' ').trim();
                $productElem(
                    'div[data-target="tab-description"]'
                ).each((i: any, el: any) => {
                    if (i === 0) {
                        const description = $productElem(el).text().replace(/\s+/g, ' ').trim();
                        if (description && description !== 'Missing') {
                            productObj.description = description;
                        }
                    }
                });
                const productImage = $productElem('img.c-productslider__primary-image').attr('src');
                if (productImage) {
                    const imgUrl = await cronUtils.downloadImagesAndUploadToS3(productImage, productObj.product_name, bucketName);
                    if (imgUrl) {
                        productObj.imgs = [imgUrl];
                    }
                }
                const productPrice = $productElem('span.productsPrice').text().replace(/\s+/g, ' ').trim();

                const checkVariant = $productElem('div.search-result-content') ? true : false;
                if (checkVariant) {

                    let variantStart = 0;
                    productObj.variations = [];
                    while (true) {
                        try {
                            const variantUrl = `https://ca.lorealpartnershop.com/on/demandware.store/Sites-becom-ca-Site/en_CA/Product-QuickSelection?pid=${mainId}&start=${variantStart}&sz=12&target=page-element&format=ajax&isAjax=true`
                            await driver.get(variantUrl);
                            await driver.wait(until.urlContains(variantUrl), 10000);
                            const variantHtml = await driver.getPageSource();
                            const $variantElem = load(variantHtml);
                            const variants = $variantElem('div.c-product');
                            if (variants.length === 0) {
                                break;
                            }

                            variants.each((i: number, el: any) => {
                                async () => {
                                    const variantObj: any = {};
                                    const variantData = JSON.parse($variantElem(el)?.attr('data-tileproduct') ?? "{}");
                                    variantObj.variation_name = variantData.name;
                                    variantObj.price = variantData.price;
                                    const imageElem = $variantElem(el).find('img');
                                    if (imageElem) {
                                        variantObj.img = imageElem.attr('src');
                                        const imgUrl = await cronUtils.downloadImagesAndUploadToS3(variantObj.img, `${variantObj.variation_name}-${mainId}-${i}`, bucketName);
                                        if (imgUrl) {
                                            variantObj.variation_image = imgUrl;
                                        }
                                    }
                                    productObj.variations.push(variantObj);
                                }
                            });
                            variantStart += 12;
                        } catch (error: any) {
                            console.log(error.message);
                        }
                    }
                    if (productPrice) {
                        productObj.price = {
                            min: productObj.variations.reduce((acc: any, curr: any) => {
                                return Math.min(acc, curr.price);
                            }, Infinity),
                            max: productObj.variations.reduce((acc: any, curr: any) => {
                                return Math.max(acc, curr.price);
                            }, -Infinity),
                        };
                    }

                } else {
                    productObj.price = {
                        regular: productPrice,
                    }
                }
                products.push(productObj);
            }
            fs.writeFileSync('lorealProfessional-haircolor.json', JSON.stringify(products, null, 2));
            console.log(productsUrls);
        } catch (error: any) {
            console.log(error.message);
        }

    } catch (error: any) {
        console.log(error.message);
        console.log(error.response.data);
    }
}


