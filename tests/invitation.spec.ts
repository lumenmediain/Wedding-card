import { test, expect } from "@playwright/test";
test("printed card content, opening, chapters and event interaction", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/");
  expect(await page.evaluate(() => window.innerWidth)).toBe(
    page.viewportSize()!.width,
  );
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Amritpal SinghwedsAkamdeep Kaur",
  );
  await expect(page.getByRole("navigation")).not.toBeVisible();
  await page.getByRole("button", { name: "Open Invitation" }).click();
  await expect(page.getByRole("navigation")).toBeVisible();
  await expect(page.locator("#blessings")).toBeFocused();
  await expect(
    page.getByText("Sardar Satnam Singh Nagi", { exact: true }),
  ).toBeVisible();
  expect(
    await page.locator("section").evaluateAll((els) => els.map((el) => el.id)),
  ).toEqual(["blessings", "invitation", "venue", "itinerary", "family"]);
  await expect(
    page.getByRole("link", { name: "Get Directions" }),
  ).toHaveAttribute(
    "href",
    "https://www.google.com/maps/search/?api=1&query=Satyam%20Palace%2C%20Hisar%20Road%2C%20Sirsa",
  );
  await expect(page.locator(".event-list time")).toHaveText([
    "9:15 AM",
    "11:15 AM",
    "1:15 PM",
    "4:15 PM",
  ]);
  await page.getByRole("button", { name: /02 Anand Karaj/ }).click();
  await expect(page.locator(".event-preview h3")).toHaveText("Anand Karaj");
  await expect(
    page.getByRole("button", { name: /02 Anand Karaj/ }),
  ).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator(".palace-art img")).toBeVisible();
  expect(
    await page
      .locator(".palace-art img")
      .evaluate(
        (img: HTMLImageElement) => img.complete && img.naturalWidth > 0,
      ),
  ).toBe(true);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  expect(errors).toEqual([]);
});
test("skip, keyboard access and invite routing", async ({ page }) => {
  await page.goto("/invite/amritpal-akamdeep");
  await page.getByRole("button", { name: "Skip animation" }).focus();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("navigation")).toBeVisible();
  const response = await page.goto("/invite/unknown-invitation");
  expect(response?.status()).toBe(404);
});
test("reduced motion opens immediately", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.getByRole("button", { name: "Open Invitation" }).click();
  await expect(page.getByRole("navigation")).toBeVisible();
  await expect(page.locator(".cover-stage")).toHaveCount(0);
});

test("visual review captures", async ({ browser }, testInfo) => {
  const page = await browser.newPage({
    viewport:
      testInfo.project.name === "mobile"
        ? { width: 390, height: 844 }
        : { width: 1440, height: 1000 },
  });
  test.skip(!process.env.QA_SCREENSHOTS);
  await page.goto("/");

  await page.screenshot({
    path: `../qa/${testInfo.project.name}-cover.png`,
    timeout: 8000,
  });
  await page.getByRole("button", { name: "Skip animation" }).click();
  await expect(page.locator(".cover-stage")).toHaveCount(0);
  await page.screenshot({
    path: `../qa/${testInfo.project.name}-blessings.png`,
  });
  for (const id of ["invitation", "venue", "itinerary"]) {
    await page.locator(`#${id}`).scrollIntoViewIfNeeded();
    await page.waitForTimeout(800);
    await page.screenshot({ path: `../qa/${testInfo.project.name}-${id}.png` });
  }
});
