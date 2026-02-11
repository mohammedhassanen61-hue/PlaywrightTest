import {test,Page,expect } from "@playwright/test";
import { PageManager } from "../page-objects/pageManager";
import {faker} from "@faker-js/faker"


test.beforeEach(async ({page})=> {
   await page.goto('/') //here we put the url as variable in playwright config file in BaseUrl: and this ('/') this expressions tells playwright to get the url from baseUrl

})


test('Navigate to Form Page', async({page})=>{
    const pm= new PageManager(page)
    await pm.navigateto().formlayoutPage()
    await pm.navigateto().datepickerPage()
    await pm.navigateto().smartTablePage()
    await pm.navigateto().toastrPage()
    await pm.navigateto().toolTipPage()


})



test('Paramterzied Method', async({page})=>{
    const pm= new PageManager(page)
    const randomFullname=faker.person.fullName()
    const randomMail=`${randomFullname.replace(' ','')}${faker.number.int(10)}@test.com`
    await pm.navigateto().formlayoutPage()
    await pm.formLayoutPage().signInUseTheGridWithCredentionals("MohammedHassanen66","Test1234","Option 2")
    await pm.formLayoutPage().fillInlineFormCredentials(randomFullname,randomMail,false)
})



test('DatePicker',async({page})=>{
const pm= new PageManager(page)
await pm.navigateto().datepickerPage()
await pm.onDatePickerPage().selectCommonDatePickerDateFromToday(30)
await pm.onDatePickerPage().selectCommonDatePickerRangeFromToday(15,30)

})

test('testing with argos ci', async({page})=>{
    const pm= new PageManager(page)
    const randomFullname=faker.person.fullName()
    const randomMail=`${randomFullname.replace(' ','')}${faker.number.int(10)}@test.com`
    await pm.navigateto().formlayoutPage()
    await pm.formLayoutPage().signInUseTheGridWithCredentionals("MohammedHassanen66","Test1234","Option 2")
    await pm.formLayoutPage().fillInlineFormCredentials(randomFullname,randomMail,false)
})