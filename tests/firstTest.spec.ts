import {test,expect } from "@playwright/test";

test.beforeEach(async ({page})=> {
   await page.goto('/')
   await page.getByText('Forms').click()
   await page.getByText('Form Layouts').click()
})

test('Locater synatx rules', async({page})=>{
//by Tag Name
page.locator('input')
//by ID
await page.locator('button[class="appearance-filled size-medium shape-rectangle status-primary nb-transition"][type="submit"]:text("Submit")').click();
//by class part of the value
page.locator('.status-basic')
//by abolute value
page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')
//by xpath
page.locator('[type="email"]')

})

test('Facing locatos', async({page})=>{
   //finding the input field associated to the label in page examp: label""password" inputfield "password"
await page.getByLabel('Password').first().click();
await page.getByPlaceholder('Jane Doe').click();
await page.getByRole('button',{name: 'Sign in'}).first().click();
await page.getByTitle('IoT Dashboard').click();
// we can add our data-TestId by search for the elemnet in playwrite and created and used here with facing locator getByTestId
await page.getByTestId('SIN').click();
})

test('locating child elements',async({page})=>{

await page.locator('nb-card').locator('nb-radio-group').locator(':text-is("Option 1")').click();
//find and click on "Sign in" button which exists in nb card with header "Horizontal form"
await page.locator('nb-card').filter({ has: page.getByText('Horizontal form') }).getByRole('button',{name: 'Sign in'}).click();
//find button with the index of the container which it is located in 
await page.locator('nb-card').nth(2).getByRole('button').click();

})

test('locating parent elements',async({page})=>{
//finding sign in button using parent element hastext with name of element in same container but unique in page
// await page.locator('nb-card', {hasText:'Horizontal form'}).getByRole('button',{name:'Sign in'}).click();
//finding singin button with another locator inside the rb-card body
// await page.locator('nb-card', {has:page.locator(':text-is("Horizontal form")')}).getByRole('button',{name:'Sign in'}).click();
//finding email input field in rb-card body using parent elemnt with gebylabel
// await page.locator('nb-card', {has:page.locator(':text-is("Horizontal form")')}).getByLabel('Email').click();
//await page.locator('nb-card', {has:page.locator(':text-is("Horizontal form")')}).locator('#inputEmail3').click();
//await page.locator('nb-card').filter({ hasText:'Horizontal form' }).getByRole('button',{name: 'Sign in'}).click();
//await page.locator('nb-card').filter({has:page.locator(':text-is("Horizontal form")')}).getByRole('button',{name: 'Sign in'}).click();
//await page.locator('nb-card').filter({has:page.locator('.status-primary')}).getByLabel('Email').click();
//await page.locator('nb-card').filter({has:page.locator('nb-checkbox')}).filter({hasText:"Sign in"}).getByLabel('Email').click();
await page.locator('nb-card').filter({has:page.locator('nb-radio-group')}).filter({hasText:"Sign in"}).getByLabel('Email').click();

})

test('Reusing locators',async({page})=>{

//page.locator('nb-card').filter({hasText:'Basic form'}).fill("mohammedhassanen@gmail.com");
   const BasicForm=page.locator('nb-card').filter({hasText:'Basic form'})
   const EmailField= BasicForm.getByLabel('Email address')
   const PasswordField= BasicForm.getByLabel('Password')
   const Checkbox1=BasicForm.locator('[class*="custom-checkbox"]')
   const Checkbox2=BasicForm.locator('[class*="custom-checkbox checked"]')
   const SubmitButton= BasicForm.getByRole('button',{name:'Submit'})

  await EmailField.fill("mohammedhassanen@gmail.com");
  await PasswordField.fill("Test1234");
  await Checkbox1.click();
   await SubmitButton.click();

   await expect(EmailField).toHaveValue('mohammedhassanen@gmail.com')
   await expect(PasswordField).not.toBeEmpty();
   await expect(Checkbox2).toBeChecked();

})

test('Extracting values', async({page})=>{

   //how to get single test value .textContent();
const BasicForm=page.locator('nb-card').filter({hasText:'Basic form'})
const GridForm=page.locator('nb-card').filter({hasText:'Using the Grid'})
const ButtonText= await BasicForm.getByRole('button').textContent();
 expect(ButtonText).toEqual('Submit');

//all text values .allTextContents();
const allRadioButtontext =await GridForm.locator('nb-radio').allTextContents();
 expect(allRadioButtontext).toContainEqual('Option 1');

//Input values .inputValue();
const expectedValue= "mohammedhassanen61@gmail.com"
const emailField=BasicForm.locator('#exampleInputEmail1')
await emailField.fill(expectedValue);
const actualValue=await emailField.inputValue();
expect(actualValue).toEqual(expectedValue);

//how to get placeholder of an inputfield and validate it .getAttribute('placeholder');

const placeholderValue=await emailField.getAttribute('placeholder');
expect(placeholderValue).toEqual('Email');

})


test('assertions',async({page})=>{

const BasicForm=page.locator('nb-card').filter({hasText:'Basic form'})
const ButtonText= await BasicForm.getByRole('button').textContent();
const basicFormButton=  BasicForm.getByRole('button');

//General assertions which does not need await because it compares to expressions 
expect(ButtonText).toEqual('Submit');

//locator assertion which need await because it searchs in weblocator in page and compares it to the expected value
await expect( basicFormButton).toHaveText('Submit')

//soft assertion used if you would like to contiue with the test even if the assertion is failed
await expect.soft( basicFormButton).toHaveText('Submits')
await basicFormButton.click();

})








// test('Test case Name',async(page)=>{


// })

// test('Tc Name', async({page})=>{


// })