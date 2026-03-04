import {test} from "../page-objects/fixture";
import { Finanzierportal } from "../page-objects/finanziererportalPage";



// test.beforeEach(async({page})=>{

//     await page.goto('https://keycloak-test.itinera-risksolutions.de/realms/risksolutions/protocol/openid-connect/auth?response_type=code&client_id=finanziererportal-frontend&scope=openid%20profile%20roles&state=8b8m1L_CMRNzQdJPh0Mxvw5Y3DnhWQXN5SwwHSq5Flk%3D&redirect_uri=https://finanziererportal-test.itinera-risksolutions.de/login/oauth2/code/keycloak&nonce=uE2oxIkyI8dQfn2FHpDz2TUuLaxijRYuPxNjPQjB9XA')
// })


test('first testcase finanziererportal',async({loginAndLogout})=>{
    const finanzierPortal=new Finanzierportal(loginAndLogout)
    await finanzierPortal.seachForEngagmentWithFilter('EGGROUP-20260126-1100')
    await finanzierPortal.setupAnAppointment(100)


})


test.only('Second test case',async({loginAndLogout})=>{
    const finanzierPortal=new Finanzierportal(loginAndLogout)
    await finanzierPortal.searchForEngagament('EGGROUP-20260126-1100')
    

 
})




test('logout',async({page})=>{







})
