const { test, expect } = require('@playwright/test')
test('supplier portal renders its regression evidence workspace', async ({ page }) => { await page.goto('/'); await expect(page.getByRole('heading', { name: 'Supplier Portal' })).toBeVisible() })
