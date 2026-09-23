import { expect, type Page } from "@playwright/test";
export async function signIn(page: Page) {
  await page.getByLabel("Email address").fill(process.env.OWNER_EMAIL!);
  await page
    .getByLabel("Password", { exact: true })
    .fill(process.env.OWNER_PASSWORD!);
  for (let attempt = 0; attempt < 3; attempt++) {
    const [response] = await Promise.all([
      page.waitForResponse(
        (r) =>
          r.url().includes("/api/auth/sign-in/email") &&
          r.request().method() === "POST",
      ),
      page.getByRole("button", { name: "Continue learning" }).click(),
    ]);
    if (response.status() !== 429) {
      expect(response.ok()).toBe(true);
      await expect(page).toHaveURL(/today|onboarding/);
      return;
    }
    // Exercise the production rate limit; honor its retry window instead of disabling it for tests.
    const seconds = Number(response.headers()["retry-after"] || 10);
    await page.waitForTimeout(Math.min(15, Math.max(1, seconds)) * 1000 + 100);
  }
  throw new Error(
    "Test sign-in remained rate-limited after the server retry window.",
  );
}
