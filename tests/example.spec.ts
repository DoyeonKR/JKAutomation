import { test, expect } from '@playwright/test';

test('잡코리아 페이지 타이틀 확인', async ({ page }) => {
  await page.goto('https://www.jobkorea.com');
  await expect(page).toHaveTitle(/jobkorea/);
});