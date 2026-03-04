import { Page,expect } from "@playwright/test";



export  class DatepickerPago{

    private readonly page:Page

    constructor(page:Page){
        this.page=page

    }



    async selectFormDatepicker(numberOfDaysFromToday:number){

        await this.page.getByRole('textbox',{name:'Form Picker'}).click()
        const expectedDate=await this.selectDatefromCalender(numberOfDaysFromToday)
        await expect(this.page.getByRole('textbox',{name:'Form Picker'})).toHaveValue(expectedDate)
        
    }


    async SelectDatePickerRange(numberOfDaysFromTodayStart:number,numberOfDaysFromTodayEnd:number){

        await this.page.getByRole('textbox',{name:'Range Picker'}).click()
        const expectedDateStart=await this.selectDatefromCalender(numberOfDaysFromTodayStart)
        const expectedDateEnd=await this.selectDatefromCalender(numberOfDaysFromTodayEnd)
        await expect(this.page.getByRole('textbox',{name:'Range Picker'})).toHaveValue(`${expectedDateStart} - ${expectedDateEnd}`)


    }




    private async selectDatefromCalender(numberOfDaysFromToday:number){

        let date=new Date()
        date.setDate(date.getDate()+numberOfDaysFromToday)

        const expectedDay=date.getDate().toString()
        const expectedMonthShort=date.toLocaleString('EN-US',{month:'short'})
        const expectedMonthLong=date.toLocaleString('EN-US',{month:'long'})
        const expectedYear=date.getFullYear()
        const expectedDate=`${expectedMonthShort} ${expectedDay}, ${expectedYear}`
        const expectedDateMonthYear=` ${expectedMonthLong} ${expectedYear} `

        let actualCalender=await this.page.locator('nb-calendar-view-mode').textContent()


            while(actualCalender!==expectedDateMonthYear){
                await this.page.locator('[data-name="chevron-right"]').click()
                actualCalender=await this.page.locator('nb-calendar-view-mode').textContent()

            }

        await this.page.locator('.day-cell.ng-star-inserted').getByText(expectedDay,{exact:true}).click()
       return expectedDate





    }



}