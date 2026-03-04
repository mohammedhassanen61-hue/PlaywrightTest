import { Page,expect } from "@playwright/test";



export class HelperBase{
    
     readonly page:Page
     readonly username:string
     readonly password:string


    constructor(page:Page){
        this.page=page

    }


    async waitforTimeOut(numberOfSeconds:number){

        await this.page.waitForTimeout(numberOfSeconds* 1000)
    }

    
//  async loginWithUsernameAndPassword(username:string,password:string){
//             await this.page.getByRole('textbox',{name:'username'}).fill(username)
//             await this.page.getByRole('textbox',{name:'Password'}).fill(password)
//             await this.page.getByRole('button',{name:'Sign in'}).click()
//             await this.waitforTimeOut(2)
//             const OverviewOfEngag=  await this.page.locator('.ui-panel-title').getByText('Übersicht der Engagements').textContent()
//             expect(OverviewOfEngag).toContain('Übersicht der Engagements')
    
    
//             }




}
