import { test, expect } from '@playwright/test';

const storyUrl = (id: string) =>
  `/iframe.html?id=${id}&viewMode=story`;

test.describe('TextInput', () => {
  test('renders label and input linked by htmlFor/id', async ({ page }) => {
    await page.goto(storyUrl('components-textinput--basic'));
    const label = page.getByText('TextInput Label');
    await expect(label).toBeVisible();
    const input = page.getByRole('textbox');
    await expect(input).toBeVisible();
    // Label's for attribute matches input id
    const labelFor = await label.evaluate((el) =>
      el.closest('label')?.getAttribute('for') ?? el.getAttribute('for')
    );
    const inputId = await input.getAttribute('id');
    expect(labelFor).toBe(inputId);
  });

  test('placeholder text is shown', async ({ page }) => {
    await page.goto(storyUrl('components-textinput--placeholder'));
    const input = page.getByRole('textbox');
    await expect(input).toHaveAttribute('placeholder', 'Custom placeholder...');
  });

  test('disabled input cannot be focused and shows preset value', async ({ page }) => {
    await page.goto(storyUrl('components-textinput--disabled'));
    const input = page.getByRole('textbox');
    await expect(input).toBeDisabled();
    await expect(input).toHaveValue('Preset value');
  });

  test('required input shows indicator and aria-required', async ({ page }) => {
    await page.goto(storyUrl('components-textinput--required'));
    const input = page.getByRole('textbox');
    await expect(input).toHaveAttribute('aria-required', 'true');
    // Required indicator " *" is visible alongside the label
    await expect(page.getByText('*')).toBeVisible();
  });

  test('validation error is displayed and input is aria-invalid', async ({ page }) => {
    await page.goto(storyUrl('components-textinput--validation-error'));
    const input = page.getByRole('textbox');
    await expect(input).toHaveAttribute('aria-invalid', 'true');
    await expect(page.getByText('Helpful validation message')).toBeVisible();
  });

  test('help text is displayed below the input', async ({ page }) => {
    await page.goto(storyUrl('components-textinput--with-help-text'));
    await expect(
      page.getByText('We willl use this phone number to contact you via text')
    ).toBeVisible();
  });

  test('clear button is present when value is set and clears on click', async ({ page }) => {
    await page.goto(storyUrl('components-textinput--clearable'));
    const input = page.getByRole('textbox');
    await expect(input).toHaveValue('clear me');
    const clearButton = page.getByRole('button');
    await expect(clearButton).toBeVisible();
    await clearButton.click();
    await expect(input).toHaveValue('');
  });

  test('prefix and suffix content renders', async ({ page }) => {
    await page.goto(storyUrl('components-textinput--prefix-and-suffix'));
    // First input has "@" prefix
    await expect(page.getByText('@')).toBeVisible();
    // Second input has "$" prefix and "per month" suffix
    await expect(page.getByText('$')).toBeVisible();
    await expect(page.getByText('per month')).toBeVisible();
  });
});
