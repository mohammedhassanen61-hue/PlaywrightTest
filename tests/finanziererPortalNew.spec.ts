import test, { expect } from "@playwright/test";
import { FinanziererportalPage } from "../page-objects/newFinanziererportal";


test.beforeEach(async({page})=>{
await page.goto('https://keycloak-test.itinera-risksolutions.de/realms/risksolutions/protocol/openid-connect/auth?response_type=code&client_id=finanziererportal-frontend&scope=openid%20profile%20roles&state=8b8m1L_CMRNzQdJPh0Mxvw5Y3DnhWQXN5SwwHSq5Flk%3D&redirect_uri=https://finanziererportal-test.itinera-risksolutions.de/login/oauth2/code/keycloak&nonce=uE2oxIkyI8dQfn2FHpDz2TUuLaxijRYuPxNjPQjB9XA')

})

test('First Test Case',async({page})=>{
    const username="advisor2-tc-001@itinera.de"
    const password="advisor2-tc-001@itinera.de"
    const engagementName="EGGROUP-20260220-rc055"
    const rowLocators=()=>  page.locator('table tbody[id="form:engagementsTableId_data"] tr')
    const nxtBtn= page.getByRole('button',{name:'Nächste Seite'})
    let found=false
    const maxPage=100

    await page.goto('https://keycloak-test.itinera-risksolutions.de/realms/risksolutions/protocol/openid-connect/auth?response_type=code&client_id=finanziererportal-frontend&scope=openid%20profile%20roles&state=8b8m1L_CMRNzQdJPh0Mxvw5Y3DnhWQXN5SwwHSq5Flk%3D&redirect_uri=https://finanziererportal-test.itinera-risksolutions.de/login/oauth2/code/keycloak&nonce=uE2oxIkyI8dQfn2FHpDz2TUuLaxijRYuPxNjPQjB9XA')
    await page.getByRole('textbox',{name:'username'}).fill(username)
    await page.getByRole('textbox',{name:'password'}).fill(password)
    await page.getByRole('button',{name:'Sign in'}).click()
    await expect(page.locator('[id="form:engagements_header"] [class="ui-panel-title"]')).toHaveText('Übersicht der Engagements')
        for(let p=0;p<maxPage;p++){
            const rowCount= await rowLocators().count()
            for(let i=0; i<rowCount;i++){

                const row=rowLocators().nth(i)
                const valueFirstColum=(await row.locator('td').first().innerText()).trim()
                console.log(`${valueFirstColum} and the expected:${engagementName}`)

                if(valueFirstColum==engagementName){
                    
                    await row.locator('td').first().click()
                    found=true
                    break;

                }         


            }
            if(found)break;
            await nxtBtn.click()
            await page.waitForLoadState('networkidle')
        }
        await page.waitForLoadState('networkidle')

        await expect(page.locator('[class="text-overflow-ellipsis overflow-hidden white-space-nowrap block"]')).toHaveText(engagementName)

        await page.locator('[data-nodetype="calendar"]').click()
        await page.locator('[data-nodetype="calendar_proposals"]').click()
        await expect(page.locator('[class="font-medium text-3xl text-900"]').filter({hasText:'Terminvorschläge'})).toBeVisible()
        await page.getByRole('button',{name:'Terminvorschlag erstellen'}).click()
        await expect(page.locator('[class="font-medium text-3xl text-900"]').filter({hasText:'Neuer Terminvorschlag'})).toBeVisible()
        await page.getByRole('textbox',{name:'Titel'}).fill('neuer Termin')

        const durationSliderMin=page.locator('[id="form:content:duration-slider"] .ui-slider-range-min')
        const durationSliderDefault=page.locator('[id="form:content:duration-slider"] .ui-state-default')
        const durationSilder=page.locator('[id="form:content:duration-slider"]')
        await durationSliderMin.evaluate(node =>{
            node.setAttribute('style','width: 76.4706%')
        })

        await durationSliderDefault.evaluate(node =>{
            node.setAttribute('style','left: 76.4706%')
        })

        await durationSliderDefault.click()

        const terminfinundAb= page.getByRole('combobox',{name:'Terminfindung läuft ab'})
        await terminfinundAb.click()
        let actualMonth=await page.locator('[class="ui-datepicker-title"] .ui-datepicker-month').textContent()
        let actualYear=await page.locator('[class="ui-datepicker-title"] .ui-datepicker-year').textContent()
        let actualhour=await page.locator('[class="ui-hour-picker"] span').nth(1).textContent()
        let actualMinutes=await page.locator('[class="ui-minute-picker"] span').nth(1).textContent()


      let date =new Date()
        date.setDate(date.getDate()+10)
        const expectedDay=date.getDate().toString()
        const expectedDaylong=date.toLocaleString("de-DE",{day:'2-digit'})
        const expectedMonthDigits=date.toLocaleDateString("de-DE",{month:'2-digit'})
        const expectedMonth=date.toLocaleString("de-DE",{month: 'long'})
        const expectedYear=date.toLocaleString("de-DE",{year:'numeric'})
        const expectedMonthDay=`${expectedMonth} ${expectedDay}`
        const expectedFullDate=`${expectedDaylong}.${expectedMonthDigits}.${expectedYear}`
        date.setHours(date.getHours()+5)
        const expectedHour=date.getHours().toString()
        date.setMinutes(date.getMinutes()+5)
        const expectedMinutes=date.toLocaleString("de-DE",{minute:'2-digit'})

        console.log(`actualdate: ${actualMonth} ${actualYear} and expecteddate: ${expectedMonth} ${expectedYear}`)

        while( actualMonth!==expectedMonth || actualYear!==expectedYear){
            await page.getByRole('button',{name:'Nächster Monat'}).click()
             actualMonth=await page.locator('[class="ui-datepicker-title"] .ui-datepicker-month').textContent()
             actualYear=await page.locator('[class="ui-datepicker-title"] .ui-datepicker-year').textContent()
        }
        
        await page.getByRole('gridcell',{name:expectedMonthDay}).click()
        


         while( actualhour!==expectedHour){
            console.log(`expectedHour: ${expectedHour} actualHour: ${actualhour}`)
            await page.getByRole('button',{name:'Nächste Stunde'}).click()
             actualhour=await page.locator('[class="ui-hour-picker"] span').nth(1).textContent()
            
        }


         while( actualMinutes!==expectedMinutes){
            await page.getByRole('button',{name:'Nächste Minute'}).click()
             actualMinutes=await page.locator('[class="ui-minute-picker"] span').nth(1).textContent()
            
        }


        await expect(terminfinundAb).toHaveValue(`${expectedFullDate} ${expectedHour}:${expectedMinutes}`)
        await page.locator('[class="fc-toolbar-title"]').click()


})




test('fo test',async({page})=>{

    const finanzierportal=new FinanziererportalPage(page)
    await finanzierportal.loginWithUsernameAndPassword("advisor2-tc-001@itinera.de","advisor2-tc-001@itinera.de")
    await finanzierportal.searchForEngagementWithoutfilter("EGGROUP-20260220-rc055")
    


})