import { da } from "@faker-js/faker/.";
import {test,expect} from "@playwright/test";
import { DatepickerPago } from "../page-objects/datePickerNewPage";

test.beforeEach(async({page})=>{


    await page.goto('http://localhost:4200/')
    // await page.getByRole('link',{name:'Tables & Data'}).click()
    // await page.getByRole('link',{name:'Smart Table'}).click()



})


test('Datepicker Form',async({page})=>{
    const datepicker=new DatepickerPago(page)
    await datepicker.selectFormDatepicker(60)
    await datepicker.SelectDatePickerRange(30,70)


})





test('Smart Table',async({page})=>{

    const rowLocators=()=> page.locator('table tbody tr')
    const maxPage=20
    let found=false
    const targetEmail='louisekirby@comtours.com'
    const nxtBtn= page.getByRole('link',{name:'Next'})
    for(let p=0; p<maxPage; p++){
        const rowCount= await rowLocators().count()

        for(let i=0; i<rowCount; i++){
            const row=rowLocators().nth(i)
            const emailValue= (await row.locator('td').nth(5).innerText()).trim()
            console.log(emailValue)
            if(emailValue==targetEmail){
                await row.locator('td').nth(0).filter({has: page.locator('[class="nb-edit"]')}).click()
                await expect(row.locator('td').nth(2)).toHaveText('Louise')
                found=true
                break;

            }

        }
            if(found) break;

    await nxtBtn.click();

    }

expect(found).toBeTruthy();




})

test('Dropdownlist',async({page})=>{

    await page.locator('nb-select[class="appearance-outline size-medium status-primary shape-rectangle nb-transition"]').click()
    await page.locator('[class="option-list"] nb-option').filter({hasText:'Dark'}).click()
    await expect(page.locator('nb-layout-header')).toHaveCSS('background-color','rgb(34, 43, 69)')

    
})