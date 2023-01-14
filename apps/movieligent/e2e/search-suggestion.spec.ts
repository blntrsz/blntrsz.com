import { test, expect } from "@playwright/test";

test("search suggestion quick link", async ({ page }) => {
  await page.goto("https://movieligent.blntrsz.com/");

  await page.locator("input").fill("groot");

  await page.locator("text=Groot Takes a Bath").click();

  await expect(page.locator("h1")).toHaveText("Groot Takes a Bath");
  await expect(page.locator("h1 + p")).toHaveText(
    "Everybody needs some alone time to relax and wash up, but things go quite differently when you’re a Flora Colossi toddler."
  );
});
