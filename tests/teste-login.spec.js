import { test, expect } from '@playwright/test';

test('Teste de Login', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByText('Swag Labs')).toBeVisible();
})

