import { test as setup } from "@playwright/test";

const TOKEN_FILEPATH = "playwright/.auth/user.json";

setup('authenticate', async ({ page }) => {

    await page.goto('https://www.saucedemo.com/');

    await page.locator('[data-test="username"]').click();
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').click();
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await page.waitForTimeout(5000);
    await page.context().storageState({ path: TOKEN_FILEPATH })

});