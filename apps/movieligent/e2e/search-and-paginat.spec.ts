import { test, expect } from "@playwright/test";

test("search, pagination and elements count in search page", async ({
  page,
}) => {
  await page.goto("https://movieligent.blntrsz.com/");

  await page.locator("input").fill("groot");

  await page.locator("button").click();

  await expect(page.locator("li[data-testid='movieResult']")).toHaveCount(20);

  await page.locator("text=Next").click();

  await expect(page.locator("li[data-testid='movieResult']")).toHaveCount(20);

  await expect(page.url()).toBe(
    "https://movieligent.blntrsz.com/?page=2&query=groot"
  );

  await expect(page.locator("input")).toHaveValue("groot");
});
