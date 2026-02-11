import {test,expect} from "@playwright/test";

test('Drag and Drop', async({page})=>{
await page.goto('https://www.globalsqa.com/demo-site/draganddrop/')


await page.waitForTimeout(5000)
const constentButton=page.locator('.fc-consent-root [class="fc-button fc-cta-consent fc-primary-button"]')
const frame=page.frameLocator('[rel-title="Photo Manager"] iframe')


//if the google dialog appears asking for using cookies click constent
for (let i = 0; i < 3; i++) {
  if (await constentButton.isVisible().catch(() => false)) {
    await constentButton.click();
  } else {
    break;
  }
}
//as the photo are located in iframe , we have to define the iframe with method call frameLocator and inside it we can define the elements we want

 await frame.locator('li',{hasText:'High Tatras 2'}).dragTo(frame.locator('#trash'))
 //More precise drag and drop
await frame.locator('li',{hasText:'High Tatras 4'}).hover()
await page.mouse.down()  //to right click on the mouse
await frame.locator('#trash').hover()
await page.mouse.up() //to release the click from the mouse
await expect(frame.locator('#trash li h5')).toHaveText(['High Tatras 2','High Tatras 4']) //here we verify that two pics moved correct that's why we using the array here



})