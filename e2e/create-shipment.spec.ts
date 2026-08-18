import { expect, test } from '@playwright/test';

test('should create a shipment', async ({ page }) => {
  const uniqueValue = Date.now();
  const origin = `Paris E2E ${uniqueValue}`;
  const destination = `Lyon E2E ${uniqueValue}`;

  await page.goto('/');

  await page.getByLabel('Origin').fill(origin);
  await page.getByLabel('Destination').fill(destination);
  await page.getByLabel('Estimated Delivery').fill('3 days');

  const createResponse = page.waitForResponse(
    (response) =>
      response.url().endsWith('/api/shipments') &&
      response.request().method() === 'POST',
  );

  await page.getByRole('button', { name: 'Create Shipment' }).click();

  expect((await createResponse).status()).toBe(201);

  await page.reload();

  await expect(page.getByText(origin, { exact: true })).toBeVisible();
  await expect(page.getByText(destination, { exact: true })).toBeVisible();
});
