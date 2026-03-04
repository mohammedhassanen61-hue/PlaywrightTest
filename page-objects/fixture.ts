import {test as base, expect, Page} from "@playwright/test";
import * as dotenv from 'dotenv';
dotenv.config();

const username=process.env.FINANZIERER_USERNAME
const password=process.env.FINANZIERER_PASSWORD
const finanziererUrl=process.env.FINANZIERER_URL

type MyFixture ={

    loginAndLogout:Page
}

 export const test=base.extend<MyFixture>({
    



    loginAndLogout: async ({page},use)=>{

            await page.goto(finanziererUrl)
            await page.getByRole('textbox',{name:'username'}).fill('advisor2-tc-001@itinera.de')
            await page.getByRole('textbox',{name:'Password'}).fill('advisor2-tc-001@itinera.de')
            await page.getByRole('button',{name:'Sign in'}).click()
            const OverviewOfEngag=  await page.locator('.ui-panel-title').getByText('Übersicht der Engagements').textContent()
            expect(OverviewOfEngag).toContain('Übersicht der Engagements')

            await use(page);

            // await page.getByTitle('Profil').click()
            // await page.getByRole('link',{name:'Abmelden'}).click()
            // await expect(page.locator('[class="exception-title"]')).toHaveText('Logout successful')



    }


})