import {test,expect} from "@playwright/test";
import { argosScreenshot } from "@argos-ci/playwright";

test.beforeEach(async ({page})=> {
   await page.goto('http://uitestingplayground.com/ajax')
   await page.getByRole('button',{name:'Button Triggering AJAX Request'}).click();
})

test('auto waiting firstcase',async({page})=>{
   const successButton=  page.locator('.bg-success')

   await successButton.waitFor({state:"visible"})
   //const successButtonText= await successButton.allTextContents();
   //expect(successButtonText).toContain('Data loaded with AJAX get request.')
   expect(successButton).toHaveText('Data loaded with AJAX get request.',{timeout:2000})
   
})

test('alternative wait mechanism', async({page})=>{

const successButton=  page.locator('.bg-success')

//wait for element
await page.waitForSelector('.bg-success')

//wait for the response in the page compeleted
//await page.waitForResponse('http://uitestingplayground.com/ajaxdata')

//wait that all network calls is completed (Not Recommended) if call stucks test case will fail
//await page.waitForLoadState("networkidle")

expect(successButton).toHaveText('Data loaded with AJAX get request.')
await argosScreenshot(page, "homepage");

})