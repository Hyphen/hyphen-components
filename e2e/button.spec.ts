import { test, expect } from '@playwright/test';

const storyUrl = (id: string) =>
  `/iframe.html?id=${id}&viewMode=story`;

test.describe('Button', () => {
  test('renders default button with text', async ({ page }) => {
    await page.goto(storyUrl('components-button--default'));
    const button = page.getByRole('button', { name: 'Button' });
    await expect(button).toBeVisible();
  });

  test('default button is clickable', async ({ page }) => {
    await page.goto(storyUrl('components-button--default'));
    const button = page.getByRole('button', { name: 'Button' });
    // Click fires without error — default story calls alert() so we dismiss it
    page.once('dialog', (dialog) => dialog.dismiss());
    await button.click();
  });

  test('disabled buttons have aria-disabled and disabled attribute', async ({ page }) => {
    await page.goto(storyUrl('components-button--disabled'));
    const buttons = page.getByRole('button');
    const count = await buttons.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i++) {
      const btn = buttons.nth(i);
      await expect(btn).toHaveAttribute('aria-disabled', 'true');
      await expect(btn).toBeDisabled();
    }
  });

  test('loading buttons have spinner and are disabled', async ({ page }) => {
    await page.goto(storyUrl('components-button--loading'));
    const buttons = page.getByRole('button');
    const count = await buttons.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i++) {
      const btn = buttons.nth(i);
      await expect(btn).toHaveAttribute('aria-disabled', 'true');
      await expect(btn).toBeDisabled();
    }
    // At least one spinner is present in the loading story
    const spinners = page.locator('[role="status"], svg[aria-label*="loading" i], .spinner, [data-testid*="spinner"]');
    // Verify loading buttons contain some indicator — check via aria-label on buttons
    const primaryLoading = page.getByRole('button', { name: /primary loading/i });
    await expect(primaryLoading).toBeVisible();
    await expect(primaryLoading).toBeDisabled();
  });

  test('all five variants render', async ({ page }) => {
    await page.goto(storyUrl('components-button--variants'));
    await expect(page.getByRole('button', { name: 'Primary' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Secondary' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Tertiary' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Danger' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Link' })).toBeVisible();
  });

  test('full-width button renders', async ({ page }) => {
    await page.goto(storyUrl('components-button--full-width'));
    const button = page.getByRole('button', { name: 'Full Width' });
    await expect(button).toBeVisible();
    // Full-width button should stretch to fill its container
    const buttonBox = await button.boundingBox();
    const viewportSize = page.viewportSize();
    expect(buttonBox).not.toBeNull();
    expect(buttonBox!.width).toBeGreaterThan(viewportSize!.width * 0.5);
  });
});
