import { Page, expect } from "@playwright/test";
import { HelperBase } from "./helperBase";

export class Finanzierportal extends HelperBase{

    constructor(page:Page){
        super(page)



    }
    


    // async loginWithUsernameAndPassword(username:string,password:string){
    //     await this.page.getByRole('textbox',{name:'username'}).fill(username)
    //     await this.page.getByRole('textbox',{name:'Password'}).fill(password)
    //     await this.page.getByRole('button',{name:'Sign in'}).click()
    //     this.waitforTimeOut(2)
    //     const OverviewOfEngag=  await this.page.locator('.ui-panel-title').getByText('Übersicht der Engagements').textContent()
    //     expect(OverviewOfEngag).toContain('Übersicht der Engagements')


    //     }


    async seachForEngagmentWithFilter(engagmentName:string){
        await this.page.getByRole('searchbox',{name:'Filtern Engagemen'}).pressSequentially(engagmentName)
        await this.page.waitForResponse('https://finanziererportal-test.itinera-risksolutions.de/secure/dashboard-global/dashboard.xhtml')
        const rowId= this.page.getByRole('row',{name:engagmentName})
        await rowId.click()
        await expect(this.page.locator('[class="text-overflow-ellipsis overflow-hidden white-space-nowrap block"]')).toHaveText(engagmentName)
    }




    async searchForEngagament(engagmentName:string){

        let found=false
        const Rows=()=>this.page.locator('tbody[id="form:engagementsTableId_data"] tr'); 
        const nextBtn=  this.page.getByRole('button',{name:'Nächste Seite'})

        const maxPages:number=50

    for (let p = 0; p < maxPages; p++) {
    const rowCount = await Rows().count();

     for (let i = 0; i < rowCount; i++) {
    const row = Rows().nth(i);
    const firstColumValue = (await row.locator('td').first().innerText()).trim();

    if (firstColumValue === engagmentName) {
      await row.locator('td').first().click();
      found = true;
      break; // exit rows loop
    }
  }

  if (found) break; // exit pages loop

  const disabled =
    (await nextBtn.getAttribute('disabled')) !== null ||
    (await nextBtn.getAttribute('aria-disabled')) === 'true' ||
    (await nextBtn.isDisabled().catch(() => false));

  if (disabled) break;

  const before = (await Rows().first().locator('td').first().innerText()).trim();
  await nextBtn.click();
  await expect(Rows().first().locator('td').first()).not.toHaveText(before);
}

// ✅ now assertions will run
expect(found).toBeTruthy(); // optional: fail if not found

await expect(
  this.page.locator('.text-overflow-ellipsis.overflow-hidden.white-space-nowrap.block')).toHaveText(engagmentName);


}





      async setupAnAppointment(NumbOfDaysFromToday:number){

        await this.page.locator('[title="Übersicht und Erstellung von Kalender-Terminen."]').first().click()
        await this.page.getByRole('button',{name:'Termin erstellen'}).click()
        await expect(this.page.locator('[class="flex align-items-start justify-content-between"]').getByText('Neuer Termin')).toBeVisible()
        const startdatumField= this.page.getByRole('combobox',{name:'Startdatum'})
        await startdatumField.click()
        const expectedFullDate=await this.selectDatefromDatePicker(NumbOfDaysFromToday)

        await expect(startdatumField).toHaveValue(`${expectedFullDate}`)
        await this.page.locator('[id="form:scaffold:all-day"]').click()
        const toggleStatus= await this.page.locator('[id="form:scaffold:all-day_input"]').getAttribute('aria-checked')
        expect(toggleStatus).toEqual('true')

        // await this.page.locator('[id="form:scaffold:all-day"]').click()
        // await expect(this.page.locator('[id="form:scaffold:all-day_input"]')).toBeChecked()

            
    }






    private async selectDatefromDatePicker(NumbOfDaysFromToday:number){
        let date =new Date()
        date.setDate(date.getDate()+NumbOfDaysFromToday)
        const expectedDay=date.getDate().toString()
        const expectedDayNUm=date.toLocaleString('De-de',{day:'2-digit'})
        const expectedMonth=date.toLocaleString('De-de',{month:'long'})
        const expectedMonthNum=date.toLocaleString('De-de',{month:'2-digit'})
        const expectedYear=date.getFullYear().toString()
        const expectedMonthDay=`${expectedMonth} ${expectedDay}`
        const expectedMonthYear=`${expectedMonth} ${expectedYear}`
        const expectedFullDate=`${expectedDayNUm}.${expectedMonthNum}.${expectedYear}`
        let datepickerMonth= await this.page.locator('[class="ui-datepicker-month"]').first().textContent()
        let datepickerYear=await this.page.locator('[class="ui-datepicker-year"]').first().textContent()
        let datepickerMonthYear=`${datepickerMonth} ${datepickerYear}`

        console.log(`actualmonthYear:${datepickerMonthYear}`)
        console.log(`expectmonthYear:${expectedMonthYear}`)



        while(datepickerMonthYear !==expectedMonthYear){
            await this.page.getByRole('button',{name:'Nächster Monat'}).click()
            datepickerMonth= await this.page.locator('[class="ui-datepicker-month"]').first().textContent()
            datepickerYear=await this.page.locator('[class="ui-datepicker-year"]').first().textContent()
            datepickerMonthYear=`${datepickerMonth} ${datepickerYear}`
        }
    
        await this.page.getByRole('gridcell',{name:expectedMonthDay,exact:true}).click()
        return expectedFullDate




    }







}
