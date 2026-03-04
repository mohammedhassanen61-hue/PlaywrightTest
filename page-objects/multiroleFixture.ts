import { test as base, expect, BrowserContext, Page } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

type Role = 'admin' | 'user';

const  finanziererUrl=process.env.FINANZIERER_URL

const creds: Record<Role, { username: string; password: string }> = {
  admin: {
    username: process.env.ADMIN_USERNAME ?? '',
    password: process.env.ADMIN_PASSWORD ?? '',
  },
  user: {
    username: process.env.USER_USERNAME ?? '',
    password: process.env.USER_PASSWORD ?? '',
  },
};

async function login(page: Page, role: Role) {
  const { username, password } = creds[role];

  if (!username || !password) {
    throw new Error(`Missing credentials for role "${role}". Check your .env file.`);
  }

        await page.goto(finanziererUrl)
        await page.getByRole('textbox',{name:'username'}).fill(username)
        await page.getByRole('textbox',{name:'Password'}).fill(password)
        await page.getByRole('button',{name:'Sign in'}).click()
        const OverviewOfEngag=  await page.locator('.ui-panel-title').getByText('Übersicht der Engagements').textContent()
        expect(OverviewOfEngag).toContain('Übersicht der Engagements')

  // Adjust this to something that reliably indicates "logged in"
  await expect(page).not.toHaveURL(/\/login/i);
}

type Fixtures = {
  adminPage: Page;
  userPage: Page;
};

export const test = base.extend<Fixtures>({
  adminPage: async ({ browser }, use) => {
    const context: BrowserContext = await browser.newContext();
    const page = await context.newPage();
    await login(page, 'admin');
    await use(page);
    // await context.close();
  },

  userPage: async ({ browser }, use) => {
    const context: BrowserContext = await browser.newContext();
    const page = await context.newPage();
    await login(page, 'user');
    await use(page);
    // await context.close();
  },
});

export { expect };