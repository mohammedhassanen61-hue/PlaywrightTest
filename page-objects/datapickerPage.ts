import { Page,expect } from "@playwright/test";

export class DatepickerPage{

    readonly page:Page

    constructor(page:Page){

        this.page=page

    }


    async selectCommonDatePickerDateFromToday(numberOfDaysFromToday: number){

            const comDarepickerfield=this.page.getByPlaceholder('Form Picker')
            await comDarepickerfield.click()
            const expectedDate=await this.selectDateinCalender(numberOfDaysFromToday)   //we save the returned value "expectedDate" in the called method to an const startDate to assert the actual value later
            await expect(comDarepickerfield).toHaveValue(expectedDate)

    }



    async selectCommonDatePickerRangeFromToday(startNumberOfDaysFromToday:number, endNumberOfDaysFromToday:number){

            const comDarepickerfield=this.page.getByPlaceholder('Range Picker')
            await comDarepickerfield.click()
            const starDate=await this.selectDateinCalender(startNumberOfDaysFromToday)  //we save the returned value "expectedDate" in the called method to an const startDate to assert the actual value later
            const endeDate=await this.selectDateinCalender(endNumberOfDaysFromToday)    //we save the returned value "expectedDate" in the called method to an const startDate to assert the actual value later
            const expectedDate=`${starDate} - ${endeDate}`
            await expect(comDarepickerfield).toHaveValue(expectedDate)


    }





    //we create here an private method for selecting the date in the calender and we reuse it in different calender for example Form Picker and Range / 
     private async selectDateinCalender(numberOfDaysFromToday:number){
            //here we have create a instiance from a method Date
            let date=new Date()
            date.setDate(date.getDate()+numberOfDaysFromToday);
            
            
            
            const expectedDay=date.getDate().toString()
            const expectedMonthshort=date.toLocaleString('EN-US', { month: 'short' });
            const expectedMonthlong=date.toLocaleString('En-US', { month: 'long' });
            const expectedYear=date.getFullYear()
            
            
            
            const expectedDate=`${expectedMonthshort} ${expectedDay}, ${expectedYear}`
            
            //here we get the value of the month and year header and verify or the calender is locating in desired month and year if not we click on the right pfeil 
            let actualDateField= await this.page.locator('nb-calendar-view-mode').textContent()
            const expectedMonthYear=` ${expectedMonthlong} ${expectedYear} `
            
            //we compare the expected date for example March 2026
            while(!actualDateField.includes(expectedMonthYear)){
                await this.page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click()
                actualDateField= await this.page.locator('nb-calendar-view-mode').textContent() //we defined the actualDateField with let as we will reassign it the values of month year
            }
            
            
            
            await this.page.locator('.day-cell.ng-star-inserted').getByText(expectedDay,{exact:true}).click()
            return expectedDate     //here we have to return the expectedDate in this method to use it later in called method to assert the actual value

    }


}