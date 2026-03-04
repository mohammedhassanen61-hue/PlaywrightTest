import { Locator, Page,expect } from "@playwright/test";

export class FinanziererportalPage{

    private readonly page:Page
    readonly username: Locator
    readonly password: Locator
    readonly signInButton: Locator
    readonly engagmentsOverview:Locator
    readonly engagmentTableRows:Locator
    readonly nextPageinTable:Locator
    readonly sidebarEngagementName: Locator


    constructor(page:Page){

        this.page=page
        this.username=this.page.getByRole('textbox',{name:'username'})
        this.password=this.page.getByRole('textbox',{name:'password'})
        this.signInButton=this.page.getByRole('button',{name:'Sign in'})
        this.engagmentsOverview=this.page.locator('[id="form:engagements_header"] [class="ui-panel-title"]')
        this.engagmentTableRows=this.page.locator('table tbody[id="form:engagementsTableId_data"] tr')
        this.nextPageinTable=this.page.getByRole('button',{name:'Nächste Seite'})
        this.sidebarEngagementName=this.page.locator('[class="text-overflow-ellipsis overflow-hidden white-space-nowrap block"]')



    }



    async loginWithUsernameAndPassword(username:string,password:string){

        await this.username.fill(username)
        await this.password.fill(password)
        await this.signInButton.click()
        await expect(this.engagmentsOverview).toHaveText('Übersicht der Engagements')

    }


    async searchForEngagementWithoutfilter(engagementName:string){

        const rowLocators=()=>  this.engagmentTableRows
        let found=false
        const maxPage=100
        for(let p=0;p<maxPage;p++){
            const rowCount= await rowLocators().count()
            for(let i=0; i<rowCount;i++){

                const row=rowLocators().nth(i)
                const valueFirstColum=(await row.locator('td').first().innerText()).trim()
                
                if(valueFirstColum==engagementName){
                    
                    await row.locator('td').first().click()
                    found=true
                    break;

                }         


            }
            if(found)break;
            await this.nextPageinTable.click()
            await this.page.waitForLoadState('networkidle')
        }
        await this.page.waitForLoadState('networkidle')

        await expect(this.sidebarEngagementName).toHaveText(engagementName)



    }



}