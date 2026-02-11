import { Page, expect } from "@playwright/test";

export class FormLayout{
    readonly page:Page
    constructor(page:Page){
        this.page=page

    }


async signInUseTheGridWithCredentionals(email:string, password: string, optionText:string){

    const BasicForm=this.page.locator('nb-card').filter({hasText:'Using the Grid'})
    const EmailField= BasicForm.getByLabel('Email')
    const PasswordField= BasicForm.getByLabel('Password')
    const signInButton= BasicForm.getByRole('button',{name:'Sign in'})
    const radiobutton1=BasicForm.getByRole('radio',{name:optionText})
    await EmailField.fill(email);
    await PasswordField.fill(password);
    await radiobutton1.check({force:true})
    await signInButton.click();
        }    


        /**
         * this method will fill out inline form with user credentials
         * @param name  should be first and lastname
         * @param email your email ex: test@gmail.com
         * @param toCheck check the checkbox if want to save the credentials
         */
async fillInlineFormCredentials(name:string, email:string,toCheck:boolean){

    const inLineForm=this.page.locator('nb-card').filter({hasText:'Inline form'})
    const nameField= inLineForm.getByPlaceholder('Jane Doe')
    const emailField= inLineForm.getByPlaceholder('Email')
    const SubmittButton= inLineForm.getByRole('button',{name:'Submit'})
    const inLineFormCheckbox= inLineForm.getByRole('checkbox')
    await nameField.fill(name);
    await emailField.fill(email);
    

    if(toCheck){
        await inLineFormCheckbox.check({force:true})
        await expect(inLineForm.locator('[class*="custom-checkbox checked"]')).toBeChecked();
    }
    await SubmittButton.click();


}

}