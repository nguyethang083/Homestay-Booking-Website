import { test, expect } from "@playwright/test";

const UI_URL = "http://localhost:5173/";

const today = new Date();
today.setDate(today.getDate() + 2);
const tomorrow = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate() + 1
);
const tomorrowDay = tomorrow.getDate();

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:5173/sign-in");
  // get the sign in button
  await page.locator("[name=email]").fill("1@1.com");
  await page.locator("[name=password]").fill("123123");
  await page.getByRole("button", { name: "Login" }).click();
  await expect(page.getByText("Sign in Successful!")).toBeVisible();
});

test("should show homestay search results", async ({ page }) => {
  await page.goto("http://localhost:5173/search");

  // Wait for the page to load
  await page.waitForLoadState("load");

  // Wait for the AutoComplete component to be visible
  await page.waitForSelector(
    ".ant-select-auto-complete .ant-select-selector input"
  );

  // Fill in the search bar
  await page.fill(
    ".ant-select-auto-complete .ant-select-selector input",
    "Dublin"
  );

  await page.click(".ant-picker-input"); // Open the date picker
  await page.click(".ant-picker-cell-today .ant-picker-cell-inner"); // Select today's date

  // Submit the form
  await page.click('button:has-text("Search")');

  // Check if the text is present on the page
  await expect(page.getByText("Rooms found in Dublin")).toBeVisible();
  await expect(page.getByText("Dublin Getaways")).toBeVisible();
});

test("should show homestay detail", async ({ page }) => {
  await page.goto("http://localhost:5173/search");
  await page.waitForLoadState("load");
  await page.waitForSelector(
    ".ant-select-auto-complete .ant-select-selector input"
  );
  // Fill in the search bar
  await page.fill(
    ".ant-select-auto-complete .ant-select-selector input",
    "Dublin"
  );
  await page.click(".ant-picker-input"); // Open the date picker
  // Select tomorrow's date
  await page.click(".ant-picker-cell-today .ant-picker-cell-inner"); // Select today's date
  await page.click('button:has-text("Search")');
  await page.getByText("Dublin Getaways").click();

  await page.click('button:has-text("Check Availability")');
  // Wait for the "Book now" button to appear
  await page.waitForSelector('button:has-text("Book now")');
  // Check if the "Book now" button is visible
  await expect(page.getByRole("button", { name: "Book now" })).toBeVisible();
});

test("should book homestay", async ({ page }) => {
  await page.goto("http://localhost:5173/search");
  await page.waitForLoadState("load");
  // Wait for the AutoComplete component to be visible
  await page.waitForSelector(
    ".ant-select-auto-complete .ant-select-selector input"
  );
  // Fill in the search bar
  await page.fill(
    ".ant-select-auto-complete .ant-select-selector input",
    "Dublin"
  );

  await page.click('button:has-text("Search")');
  await page.getByText("Dublin Getaways").click();

  await page.click('button:has-text("Check Availability")');
  await page.click('button:has-text("Book Now")');

  await expect(page.getByText("Total Cost: $119.00")).toBeVisible();

  const stripeFrame = page.frameLocator("iframe").first();
  await stripeFrame
    .locator('[placeholder="Card number"]')
    .fill("4242424242424242");
  await stripeFrame.locator('[placeholder="MM / YY"]').fill("04/30");
  await stripeFrame.locator('[placeholder="CVC"]').fill("242");
  await stripeFrame.locator('[placeholder="ZIP"]').fill("24225");

  await page.getByRole("button", { name: "Confirm Booking" }).click();
  await expect(page.getByText("Booking Saved!")).toBeVisible();
});
