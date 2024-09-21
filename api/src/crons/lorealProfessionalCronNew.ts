import Products from '../schemas/products';
import { load } from 'cheerio';
import { By, until, WebDriver } from 'selenium-webdriver';
import { CronsUtils } from '../utils/cronsUtils';
import Variants from '../schemas/variants';
import Brands from '../schemas/brands';
import Categories from '../schemas/categories';
import ProductsCategories from '../schemas/productsCategories';
import ProductImages from '../schemas/productImages';
import fs from 'fs';

export class LorealProfessionalCronNew {

    public async start() {
        console.log('=========================== Loreal Professional Cron Started ===========================');
        try {

            const cronUtils = new CronsUtils()
            const driver = await cronUtils.buildBrowser() as WebDriver;
            await this.login(driver);

            const start = 0;
            const limit = 12;
            const products: any[] = [];
            try {
                const urls = await this.getAllUrls(driver);
                for (const baseUrl of urls) {
                    try {
                        const cleanUrl = baseUrl.replace('https://ca.lorealpartnershop.com/en', '');
                        const url = `${cleanUrl}?start=${start}&sz=${limit}&target=page-element&format=ajax&isAjax=true`;
                        // const url = `https://ca.lorealpartnershop.com/en/shop-by-brand/${brandName}/${lineName}/?start=${start}&sz=${limit}&target=page-element&format=ajax&isAjax=true`;
                        await driver.get(url);
                        await driver.wait(until.urlContains(url), 10000);
                        const html = await driver.getPageSource();
                        const $ = load(html);
                        const productsUrls = $(
                            'a[data-ui="productDetailLink"]'
                        ).map((i, el) => `https://ca.lorealpartnershop.com/en${$(el)?.attr('href')}`);

                        for (const productUrl of productsUrls) {
                            try {
                                await driver.get(productUrl);

                                await cronUtils.sleep(5000);
                                const productHtml = await driver.getPageSource();
                                const $productElem = load(productHtml);
                                const product: any = await this.saveProduct($productElem);

                                const checkVariant = $productElem('div.search-result-content').length > 0;
                                const mainId = $productElem('div[id="pdpMain"]').attr('data-itemid');
                                if (checkVariant) {
                                    product.variations = [];
                                    let variantStart = 0;
                                    while (true) {
                                        try {
                                            const variantUrl = `https://ca.lorealpartnershop.com/on/demandware.store/Sites-becom-ca-Site/en_CA/Product-QuickSelection?pid=${mainId}&start=${variantStart}&sz=12&target=page-element&format=ajax&isAjax=true`
                                            await driver.get(variantUrl);
                                            await driver.wait(until.urlContains(variantUrl), 10000);
                                            await cronUtils.sleep(1000);
                                            const variantHtml = await driver.getPageSource();
                                            const $variantElem = load(variantHtml);
                                            const variants = $variantElem('div.c-product');
                                            if (variants.length === 0) {
                                                break;
                                            }

                                            for (const [i, el] of variants.toArray().entries()) {
                                                const variantObj: any = {};
                                                const variantData = JSON.parse($variantElem(el)?.attr('data-tileproduct') ?? "{}");
                                                variantObj.variation_name = variantData.name;
                                                variantObj.price = variantData.price;
                                                const imageElem = $variantElem(el).find('img');
                                                if (imageElem) {
                                                    variantObj.variation_image = imageElem.eq(0).attr('src');
                                                }

                                                product.variations.push(variantObj);
                                            }
                                            variantStart += 12;
                                        } catch (error: any) {
                                            console.log(error.message);
                                            continue;
                                        }
                                    }
                                }
                                // write each product to a file to avoid losing data
                                products.push(product);
                                fs.writeFileSync('loreal.json', JSON.stringify(products, null, 2));

                            } catch (error: any) {
                                console.log(error.message);
                                continue;
                            }
                        }
                    } catch (error: any) {
                        console.log(error.message);
                        continue;
                    }

                }
                fs.writeFileSync('loreal.json', JSON.stringify(products, null, 2));
            } catch (error: any) {
                console.log(error.message);

            }

        } catch (error: any) {
            console.log(error.message);
        }
    }

    private async login(driver: WebDriver) {
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

    }

    private async saveProduct($productElem: any) {
        const product: any = {};
        const mainStringJson = $productElem('div[id="pdpMain"]').attr('data-product');
        const mainJson = JSON.parse(mainStringJson);
        const brand = mainJson.brand;
        const line = mainJson.category;
        product['companyName'] = {}
        product['companyName']['name'] = brand;
        product['companyName']['line'] = line;
        const categoriesBeforeClean = $productElem('span.c-breadcrumb__item');
        const parentCategory = categoriesBeforeClean.eq(1).text().replace(/\s+/g, ' ').trim();
        const subCategory = categoriesBeforeClean.eq(2).text().replace(/\s+/g, ' ').trim();
        product['categories'] = {};
        product['categories']['main'] = parentCategory;
        product['categories']['name'] = subCategory;


        product.price = {};
        product.price['regular'] = parseInt($productElem('div[data-price]')?.attr('data-price') ?? "0") === 0 ? undefined : parseInt($productElem('div[data-price]')?.attr('data-price') ?? "0");
        product.product_name = $productElem('h1.c-product__name').text().replace(/\s+/g, ' ').trim();
        $productElem(
            'div[data-target="tab-description"]'
        ).each((i: any, el: any) => {
            if (i === 0) {
                const description = $productElem(el).text().replace(/\s+/g, ' ').trim();
                if (description && description !== 'Missing') {
                    product.description = description;
                }
            }
        });

        const images =
            // img tag where class contains 'c-productslider' 
            $productElem('img[class*="c-productslider"]');
        product.img = [];
        if (images.length > 0) {
            for (const [index] of images.toArray().entries()) {
                const imgUrl = images.eq(index).attr('src');
                const imgUrlClean = imgUrl?.replace('?$pdp$', '');
                if (imgUrlClean) {
                    product.img.push(imgUrlClean);
                }
            }
        }
        return product;
    }

    private async getAllUrls(driver: WebDriver) {
        const allCatUrl = 'https://ca.lorealpartnershop.com/en/shop-by-category/';
        await driver.get(allCatUrl);
        await driver.wait(until.urlContains(allCatUrl), 10000);
        const html = await driver.getPageSource();
        const $ = load(html);
        const mainCatDiv = $('div[data-ui="filtersSection"]');
        const mainCats = mainCatDiv.find('div[data-ui="filter"]');
        const urls: string[] = [];
        for (const mainCat of mainCats.slice(0, 5)) {
            const aTags = $(mainCat).find('a');
            for (const aTag of aTags) {
                const url = `https://ca.lorealpartnershop.com/en${$(aTag).attr('href')}`;
                urls.push(url);
            }
        }
        return urls;
    }

    public async saveImagesInS3() {
        const products = JSON.parse(fs.readFileSync('loreal.json', 'utf8'));
        const newProducts = [];
        for (const product of products) {
            for (let img of product.img) {
                const imageUrl = await CronsUtils.downloadImagesAndUploadToS3(img,
                    // unique name for each product and clean the name from special characters to be image url friendly
                    product.product_name.replace(/[^a-zA-Z0-9]/g, '')
                        .replace(/\s+/g, ' ')
                        .replace(/ /g, '-')
                    , 'salonbrandz');
                // delete image from product img array and replace it with the new url
                product.img = product.img.filter((i: string) => i !== img);
                product.img.push(imageUrl);
            }
            if (product.variations && product.variations.length > 0) {
                for (let variant of product.variations) {
                    const imageUrl = await CronsUtils.downloadImagesAndUploadToS3(variant.variation_image,
                        `${product.product_name.replace(/[^a-zA-Z0-9]/g, '')
                            .replace(/\s+/g, ' ')
                            .replace(/ /g, '-')}-${variant.variation_name.replace(/[^a-zA-Z0-9]/g, '')
                                .replace(/\s+/g, ' ')
                                .replace(/ /g, '-')}`
                        , 'salonbrandz');
                    variant.variation_image = imageUrl;
                }
            }
            newProducts.push(product);
            fs.writeFileSync('lorealFinal.json', JSON.stringify(newProducts, null, 2));
            console.log(`Product ${product.product_name} saved successfully`);
        }
        console.log('=========================== Loreal Professional Cron Finished ===========================');
    }
}


