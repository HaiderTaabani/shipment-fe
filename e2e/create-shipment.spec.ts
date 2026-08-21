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

test('should show errors and not call the API when the form is empty', async ({ page }) => {
  const postRequests: string[] = [];

  page.on('request', (request) => {
    if (request.url().endsWith('/api/shipments') && request.method() === 'POST') {
      postRequests.push(request.url());
    }
  });

  await page.goto('/');
  await page.getByRole('button', { name: 'Create Shipment' }).click();

  const requiredErrors = page.getByText('This field is required', { exact: true });

  await expect(requiredErrors).toHaveCount(2);
  await expect(requiredErrors.first()).toBeVisible();
  await expect(requiredErrors.last()).toBeVisible();
  expect(postRequests).toHaveLength(0);
});
