import { signIn } from "./sign-in";
import { test, expect } from "@playwright/test";
test("closed signup and a saved authenticated learner journey", async ({
  page,
  request,
}, testInfo) => {
  const signup = await request.post("/api/auth/sign-up/email", {
    data: {
      email: "forbidden@example.test",
      password: "not-a-real-user-password",
      name: "Not allowed",
    },
  });
  expect(signup.ok()).toBe(false);
  await page.goto("/today");
  await expect(page).toHaveURL(/login/);
  await signIn(page);
  const profileResponse = await page.request.get("/api/learning/profile");
  expect(profileResponse.ok()).toBe(true);
  const profile = await profileResponse.json();
  const updated = await page.request.post("/api/learning/profile", {
    headers: { Origin: process.env.APP_URL || "http://localhost:4173" },
    data: {
      ...profile.data,
      onboardingComplete: true,
      name: "Test Learner",
      language: "en",
    },
  });
  expect(updated.ok()).toBe(true);
  await page.goto("/today");
  await expect(
    page.getByRole("heading", { name: /A little closer/ }),
  ).toBeVisible();
  await page.screenshot({
    path: testInfo.outputPath("today.png"),
    fullPage: true,
  });
  await page.goto("/learn/B2-02-L01");
  await expect(
    page.getByRole("button", { name: /Put it into practice/ }),
  ).toBeVisible();
  await page.getByRole("button", { name: /Put it into practice/ }).click();
  await expect(
    page.getByRole("button", { name: "Check my answer" }),
  ).toBeVisible();
  await page.getByRole("radio").first().click();
  await page.getByRole("button", { name: "Check my answer" }).click();
  await expect(
    page.getByRole("button", { name: "Next question" }),
  ).toBeVisible();
  await page.reload();
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await page.goto("/settings");
  await expect(page.getByRole("link", { name: "JSON backup" })).toBeVisible();
  const exported = await page.request.get("/api/data/json");
  expect(exported.ok()).toBe(true);
  expect((await exported.json()).attempts.length).toBeGreaterThan(0);
  await page.goto("/exam");
  await expect(
    page.getByRole("heading", { name: "Service und Zusammenarbeit" }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Reading + customer reply" })
    .first()
    .click();
  await expect(page).toHaveURL(/exam\/[a-f0-9-]+/);
  await expect(page.getByRole("timer")).toBeVisible();
  await expect(page.getByRole("radio").first()).toBeVisible();
  await page.getByRole("radio").first().check();
  await page.waitForTimeout(1000);
  await page.reload();
  await expect(page.getByRole("radio").first()).toBeChecked();
  await page.screenshot({
    path: testInfo.outputPath("exam.png"),
    fullPage: true,
  });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
});
