import { test, expect } from '@playwright/test'


test('check popup', async ({ page }) => {
    await page.goto("https://practicesoftwaretesting.com/");

    await page.locator("span[data-test='product-price']").first().click();

    await page.locator("//*[@id='btn-add-to-cart']").click();

    await expect(page.locator("//div[@role='alert']")).toHaveText(" Product added to shopping cart. ")
});

test('get products with range less than 10', async ({ page }) => {
    await page.goto("https://practicesoftwaretesting.com/");

    let value = await page.locator("(//span[contains(@class,'ngx-slider-bubble')])[4]").innerText();

    let slider = page.locator("span[aria-label='ngx-slider-max']");
    await slider.click();
    while (true) {
        value = await page.locator("(//span[contains(@class,'ngx-slider-bubble')])[4]").innerText();
        if (value === '10') {
            break;
        }
        await slider.press('ArrowLeft')
    }

    await expect(page.locator("(//span[contains(@class,'ngx-slider-bubble')])[4]"))
        .toHaveText('10')

    await expect(page.locator("//*[@data-test='product-name']")).toHaveCount(9);

    let productNames = await page.locator("//*[@data-test='product-name']").allTextContents();


    expect(productNames).toContain('Washers');

    //wait until product

    //add to busket
    console.log(productNames);
});

//add test for login and add product to a busket

test('login and add to busket', async ({ page }) => {

    await page.goto("https://www.saucedemo.com/");

    await page.fill("#user-name", "standard_user");
    await page.fill("#password", "secret_sauce");

    await page.locator("#login-button").click();

    await page.locator("#add-to-cart-sauce-labs-backpack").click();

    await page.locator("a[data-test='shopping-cart-link']").click();

    await expect(page.locator("div[data-test='inventory-item-name']")).toHaveText("Sauce Labs Backpack");
})



