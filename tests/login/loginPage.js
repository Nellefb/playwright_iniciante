const { expect } = require('@playwright/test'); 

const abrirSite = async (page) => {
    await page.goto('https://automationpratice.com.br/login');
}

const logarComSucesso = async (page) => {
    await page.locator('#user').fill('nala@gmial.com');
    await page.locator('#password').fill('nalanala');
    await page.getByRole('button', { name: 'login' }).click();
}

const verificarSeLogado = async (page) => {
    await expect(page.getByRole('heading', { name: 'Login realizado' })).toBeVisible();
}

const logarEmailVazio = async (page) => {
    await page.locator('#password').fill('nalanala');
    await page.getByRole('button', { name: 'login' }).click();
}

const logarSenhaVazia = async (page) => {
    await page.locator('#user').fill('nala@gmial.com');
    await page.getByRole('button', { name: 'login' }).click();
}

const validarEmailInvalido = async (page) => {
    await expect(page.getByText('E-mail inválido')).toBeVisible({ timeout: 10000 });
}

const validarSenhaInvalida = async (page) => {
    await expect(page.getByText('Senha inválida')).toBeVisible();
}

module.exports = {
    abrirSite,
    logarComSucesso,
    verificarSeLogado,
    logarEmailVazio, 
    validarEmailInvalido,
    logarSenhaVazia,
    validarSenhaInvalida
}