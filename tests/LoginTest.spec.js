import { test, expect } from '@playwright/test';

test('Login com sucesso', async ({ page }) => {
    //abrir 
    await page.goto('https://automationpratice.com.br/login');
    //logar
    await page.locator('#user').fill('nala@gmial.com');
    await page.locator('#password').fill('nalanala');
    await page.getByRole('button', { name: 'login' }).click();
    //verificar
    await expect(page.getByRole('heading', { name: 'Login realizado' })).toBeVisible();
});

test('Login com email vazio', async ({ page }) => {
    //abrir site
    await page.goto('https://automationpratice.com.br/login');
    //logar com e-mail vazio
    await page.locator('#password').fill('nalanala');
    await page.getByRole('button', { name: 'login' }).click();
    //validar mensagem de e-mail inválido
    await expect(page.getByText('E-mail inválido')).toBeVisible({ timeout: 10000 });
});

test('Login com senha vazia', async ({ page }) => {
    //abrir site
    await page.goto('https://automationpratice.com.br/login');
    //logar com senha vazia
    await page.locator('#user').fill('nala@gmial.com');
    await page.getByRole('button', { name: 'login' }).click();
    //validar mensagem de senha inválida
    await expect(page.getByText('Senha inválida')).toBeVisible();
});


