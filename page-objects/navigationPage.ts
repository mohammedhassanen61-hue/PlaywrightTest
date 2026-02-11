import { Locator, Page } from "@playwright/test";

export class NavigatePage{

    //for the locators we have to create field for them in the class like readyonly <nameOfLocator>:Locater
    //and this assign the instance in constructor and replace the technical locator with the variable
        private readonly page:Page
        constructor(page:Page){

            this.page=page

        }

    async formlayoutPage(){

            await this.selectGroupMenuItem('Forms')
            await this.page.getByText('Form Layouts').click()
        }

    async datepickerPage(){

        await this.selectGroupMenuItem('Forms')
        await this.page.waitForTimeout(1000)
        await this.page.getByText('Datepicker').click()
    }

    async toolTipPage(){
        await this.selectGroupMenuItem('Modal & Overlays')
        await this.page.getByText('Tooltip').click()
    }

    async smartTablePage(){
        await this.selectGroupMenuItem('Tables & Data')
        await this.page.getByText('Smart Table').click()

    }

    async toastrPage(){
        await this.selectGroupMenuItem('Modal & Overlays')
        await this.page.getByText('Toastr').click()
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


