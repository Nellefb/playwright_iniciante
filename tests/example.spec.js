// @ts-check
import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  //abrir pagina
  await page.goto('https://automationpratice.com.br/');
})

test('Testando scroll', async ({ page }) => {
  // const button = await page.getByRole('button', { name: 'Send Mail' })
  // await button.scrollIntoViewIfNeeded()
  // await button.click()

  const texto = await page.waitForSelector('text=NEWSLETTER')
  await texto.scrollIntoViewIfNeeded()
  
  await page.getByRole('link', { name: ' Login' }).click();
  await page.locator('#user').click();
  await page.locator('#user').fill('nala@gmial.com');
  await page.screenshot({ path: 'screenshots/screenshot1.png' });
  await page.locator('#password').click();
  await page.locator('#password').fill('nalanala');
  await page.locator('#password').screenshot({ path: 'screenshots/elementosenha.png' });
  await page.screenshot({ path: 'screenshots/screenshot2.png' });
  await page.getByRole('button', { name: 'login' }).click();

});


test('Login com sucesso 1 @login', async ({ page }) => {

  // Expect a title "to contain" a substring.
  await page.getByRole('link', { name: ' Login' }).click();
  await page.locator('#user').click();
  await page.locator('#user').fill('nala@gmial.com');
  await page.screenshot({ path: 'screenshots/screenshot1.png' });
  await page.locator('#password').click();
  await page.locator('#password').fill('nalanala');
  await page.locator('#password').screenshot({ path: 'screenshots/elementosenha.png' });
  await page.screenshot({ path: 'screenshots/screenshot2.png' });
  await page.getByRole('button', { name: 'login' }).click();
});

test('Login com sucesso 2 @login', async ({ page }) => {

  // Expect a title "to contain" a substring.
  await page.getByRole('link', { name: ' Login' }).click();
  await page.locator('#user').click();
  await page.locator('#user').fill('nala@gmial.com');
  await page.screenshot({ path: 'screenshots/screenshot1.png' });
  await page.locator('#password').click();
  await page.locator('#password').fill('nalanala');
  await page.locator('#password').screenshot({ path: 'screenshots/elementosenha.png' });
  await page.screenshot({ path: 'screenshots/screenshot2.png' });
  await page.getByRole('button', { name: 'login' }).click();
});

test.afterEach(async ({ page }) => {

})