import Products from '../schemas/products';
import { load } from 'cheerio';
import fs from 'fs';
import { By, until, Key, WebDriver } from 'selenium-webdriver';
import { CronsUtils } from '../utils/cronsUtils';


export const cosmoProfCron = async () => {
    console.log('=========================== CosmoProf Cron Started ===========================');
    // const httpsAgent = new HttpsProxyAgent('https://a5e03546c5cb61a78f2e:65c19ff36ff2b304@gw.dataimpulse.com:823')

    try {
        const categoriesArray = [
            "hair-color",
            "hair-care",
            "professional-tools",
            "salon-essentials",
            "skin-and-body",
            "nails",
            "barber",
            "last-chance"
        ]

        const cronUtils = new CronsUtils()
        const driver = await cronUtils.buildBrowser() as WebDriver;

        const email = 'Royalschoolhairdressing@gmail.com';
        const password = 'Royal@234';
        await driver.get('https://www.cosmoprofbeauty.ca/login');

        while (true) {
            if (await hasCaptcha(driver)) {
                await handleCaptcha(driver);
            } else {
                await driver.wait(until.urlContains('https://www.cosmoprofbeauty.ca/login'), 10000);
                break;
            }
        }
        await driver.findElement(By.id('login-form-email')).sendKeys(email);
        await driver.findElement(By.id('login-form-password')).sendKeys(password);
        await driver.findElement(By.id('login-btn')).click();
        await driver.wait(until.urlContains('https://www.cosmoprofbeauty.ca/'), 10000);

        const limit = 18;
        const page = 1;
        try {
            const products: any[] = [];
            for (const category of categoriesArray) {
                while (true) {
                    const url = `https://www.cosmoprofbeauty.ca/on/demandware.store/Sites-CosmoProf-CA-Site/default/Search-UpdateGrid?cgid=${category}&start=${page}&sz=${limit}&isFromPLPFlow=true`

                    await driver.get(url);

                    while (true) {
                        if (await hasCaptcha(driver)) {
                            await handleCaptcha(driver);
                        } else {
                            await driver.wait(until.urlContains(url), 10000);
                            break;
                        }
                    }
                    const browserHtml = await driver.getPageSource();
                    const $ = load(browserHtml);
                    const productsDivs = $('.product-tile');

                    for (const product of productsDivs) {
                        const productJson = $(product).attr('data-ga4tile') ?? '{}';
                        try {
                            const validJson = productJson.replace(/'/g, '"');
                            const productData = JSON.parse(validJson);
                            const productId = productData.ecommerce.items[0].item_id;
                            await driver.get(`https://www.cosmoprofbeauty.ca/on/demandware.store/Sites-CosmoProf-CA-Site/default/Product-Variation?pid=${productId}`);
                            while (true) {
                                if (await hasCaptcha(driver)) {
                                    await handleCaptcha(driver);
                                } else {
                                    await driver.wait(until.urlContains(`https://www.cosmoprofbeauty.ca/on/demandware.store/Sites-CosmoProf-CA-Site/default/Product-Variation?pid=${productId}`), 10000);
                                    break;
                                }
                            }
                            const pageSource = await driver.getPageSource();
                            const detailData = load(pageSource);
                            const productObj: any = {};
                            productObj.name = productData.ecommerce.items[0].item_name;
                            productObj.price = detailData('.product-price').text();
                            productObj.description = detailData('.product-description').text();
                            products.push(productObj);
                            console.log("===================================" + productObj.name + "===================================");
                        } catch (error: any) {
                            console.log(`Error parsing JSON: ${error.message}`);
                        }
                    }
                }
            }
            fs.writeFileSync('cosmoProf.json', JSON.stringify(products, null, 2));

        } catch (error) {
            console.log(error);
        }
    } catch (error: any) {
        console.log(error.message);
        console.log(error.response.data);
    }
}

const handleCaptcha = async (driver: WebDriver) => {
    try {
        const btnContainer = await driver.findElement(By.id('px-captcha'));
        // once clicked on the button hold it for 10 seconds then release
        if (btnContainer) {
            console.log('PRESS & HOLD button found');
            await sleep(5000);
            await driver.actions()
                .keyDown(Key.TAB)
                .perform();
            await sleep(5000);
            await driver.actions()
                .keyDown(Key.ENTER)
                .pause(10000)
                .perform();
            await driver.actions()
                .keyUp(Key.ENTER)
                .perform();
            await sleep(5000);
        } else {
            console.log('PRESS & HOLD container not found');
        }
    } catch (error: any) {
        console.log(`Error handling captcha: ${error.message}`);
    }
}

const hasCaptcha = async (driver: any) => {
    try {
        const btnContainer = await driver.findElement(By.id('px-captcha'));
        if (btnContainer) {
            console.log('PRESS & HOLD container found');
            return true;
        } else {
            console.log('PRESS & HOLD container not found');
            return false;
        }
    } catch (error: any) {
        console.log(`Error handling captcha: ${error.message}`);
        return false;
    }
}

const sleep = (ms: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}
