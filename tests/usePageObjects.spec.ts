import {test,Page,expect } from "@playwright/test";
import { NavigatePage } from "../page-objects/navigationPage";
import { FormLayout } from "../page-objects/formLayoutPage";
import { DatepickerPage } from "../page-objects/datapickerPage";


test.beforeEach(async ({page})=> {
   await page.goto('/')

})


test('Navigate to Form Page', async({page})=>{
    const navigatoFormPage= new NavigatePage(page)
    await navigatoFormPage.formlayoutPage()
    await navigatoFormPage.datepickerPage()
    await navigatoFormPage.smartTablePage()
    await navigatoFormPage.toastrPage()
    await navigatoFormPage.toolTipPage()

})



test('Paramterzied Method', async({page})=>{
    const navigatoFormPage= new NavigatePage(page)
    const formLayoutPage=new FormLayout(page)
    await navigatoFormPage.formlayoutPage()
    await formLayoutPage.signInUseTheGridWithCredentionals("MohammedHassanen66","Test1234","Option 2")
    await formLayoutPage.fillInlineFormCredentials("Zizo","zizo@sqs.com",false)
})



test('DatePicker',async({page})=>{
const navigatoDatepicker= new NavigatePage(page)
const selectDatepicker= new DatepickerPage(page)
await navigatoDatepicker.datepickerPage()
await selectDatepicker.selectCommonDatePickerDateFromToday(30)
await selectDatepicker.selectCommonDatePickerRangeFromToday(15,30)


})