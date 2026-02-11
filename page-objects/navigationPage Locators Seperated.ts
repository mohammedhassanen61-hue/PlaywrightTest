import { Locator, Page } from "@playwright/test";

export class NavigatePage{

    //for the locators we have to create field for them in the class like readyonly <nameOfLocator>:Locater
    //and this assign the instance in constructor and replace the technical locator with the variable
        readonly page:Page
        readonly formLayoutItem: Locator
        readonly datepickerItem:Locator
        readonly tooltipItem: Locator
        readonly smartTableItem: Locator
        readonly toastrItem: Locator
        constructor(page:Page){

            this.page=page
            this.formLayoutItem=this.page.getByText('Form Layouts')
            this.datepickerItem=this.page.getByText('Datepicker')
            this.tooltipItem=this.page.getByText('Tooltip')
            this.smartTableItem=this.page.getByText('Smart Table')
            this.toastrItem=this.page.getByText('Toastr')

        }

    async formlayoutPage(){

            await this.selectGroupMenuItem('Forms')
            await this.formLayoutItem.click()
        }

    async datepickerPage(){

        await this.selectGroupMenuItem('Forms')
        await this.page.waitForTimeout(1000)
        await this.datepickerItem.click()
    }

    async toolTipPage(){
        await this.selectGroupMenuItem('Modal & Overlays')
        await this.tooltipItem.click()
    }

    async smartTablePage(){
        await this.selectGroupMenuItem('Tables & Data')
        await this.smartTableItem.click()

    }

    async toastrPage(){
        await this.selectGroupMenuItem('Modal & Overlays')
        await this.toastrItem.click()
    }
    
//this is a helper method inside the class navigate page helps to check first if the Item for Example 'Form' first expanded or not if not then click on it 
private async selectGroupMenuItem(groupMenuTitle:string){
    const groupMenuItem= this.page.getByTitle(groupMenuTitle)
    const expandedStatus= await groupMenuItem.getAttribute('aria-expanded')
    if(expandedStatus=='false'){
        await groupMenuItem.click()

    }

}

}


