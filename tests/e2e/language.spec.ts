import { signIn } from "./sign-in";
import { test, expect } from "@playwright/test";
test("German essential screens, keyboard resources and reduced motion", async ({
  page,
}, testInfo) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/login");
  await signIn(page);
  const response = await page.request.get("/api/learning/profile");
  const profile = await response.json();
  const saved = await page.request.post("/api/learning/profile", {
    headers: { Origin: process.env.APP_URL || "http://localhost:4173" },
    data: { ...profile.data, language: "de", onboardingComplete: true },
  });
  expect(saved.ok()).toBe(true);
  for (const [path, title] of [
    ["today", "Ein Stück weiter,"],
    ["course", "Ein klarer Weg. Dein Tempo."],
    ["practice", "Gezielt üben."],
    ["errors", "Aus Fehlern lernen."],
    ["progress", "Fortschritt mit Nachweisen."],
    ["settings", "Lernen, das in deinen Alltag passt."],
  ]) {
    await page.goto("/" + path);
    await expect(
      page.getByRole("heading", {
        name: new RegExp(title.replaceAll(".", "\\.")),
      }),
    ).toBeVisible();
    await expect(page.locator(".workspace")).toHaveAttribute("lang", "de");
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
    if (path === "today")
      await page.screenshot({
        path: testInfo.outputPath("today-de.png"),
        fullPage: true,
      });
  }
  const menu = page.getByRole("button", { name: "Ressourcen öffnen" });
  if (await menu.isVisible()) {
    await menu.focus();
    await page.keyboard.press("Enter");
    await expect(menu).toHaveAttribute("aria-expanded", "true");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Escape");
    await expect(menu).toBeFocused();
    await expect(menu).toHaveAttribute("aria-expanded", "false");
  }
  await page.goto("/learn/B2-02-L01");
  await expect(page.getByRole("button", { name: "Jetzt üben" })).toBeVisible();
  expect(
    await page
      .locator(".button")
      .first()
      .evaluate((el) => getComputedStyle(el).transitionDuration),
  ).toBe("0s");
  await page.keyboard.press("Tab");
  expect(
    await page.evaluate(() => document.activeElement !== document.body),
  ).toBe(true);
});
