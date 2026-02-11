import {test, expect} from "@playwright/test";
import { log } from "console";
import { pseudoRandomBytes } from "crypto";
import { delay } from "rxjs-compat/operator/delay";
import { timeout } from "rxjs-compat/operator/timeout";


test.beforeEach(async({page})=>{
await page.goto('http://localhost:4200')
})


test.describe('Form Layout Page',async()=>{

test.beforeEach(async({page})=>{
await page.getByText('Forms').click()
   await page.getByText('Form Layouts').click()
})




test('Input Fields', async({page})=>{
    
    const usingGridInputfield= page.locator('nb-card',{hasText:'Using the Grid'}).locator('#inputEmail1')
   await usingGridInputfield.fill('Mohammedhassanen@gmail.com')
   await usingGridInputfield.clear()
   await usingGridInputfield.pressSequentially('mohammedhassanen',{delay:500})
   await page.screenshot({path: 'screenshots/FormsLayout.png'}) //to create a screenshot of whole page after the step
   await page.locator('nb-card',{hasText:'Using the Grid'}).screenshot({path: 'screenshots/UsingTheGridPart.png'})

   //Generic Assertation
   const emailFieldValue=await usingGridInputfield.inputValue()
   expect(emailFieldValue).toEqual('mohammedhassanen')

//Locator Assertation
await expect(usingGridInputfield).toHaveValue('mohammedhassanen')
   
})

test('Radios',async({page})=>{
//await page.locator('nb-card',{hasText:'Using the Grid'}).getByLabel('Option 1').check({force:true})
const radiobutton1=page.locator('nb-card',{hasText:'Using the Grid'}).getByRole('radio',{name:'Option 1'})
await radiobutton1.check({force:true})

//locator assertions
await expect(radiobutton1).toBeChecked()

//generic assertions
const radiobutton1Status= await radiobutton1.isChecked()
expect(radiobutton1Status).toBeTruthy()


})



})




test.describe('ModalAndOverlays Page',async()=>{
test.beforeEach(async({page})=>{


const modalOverlays= page.getByText('Modal & Overlays')
const toastr= page.getByText('Toastr')
await modalOverlays.click()
await toastr.click()

})

test('Checkboxes',async({page})=>{



const hideOnClickCheckbox= page.getByRole('checkbox',{name:'Hide on click'})
await hideOnClickCheckbox.check({force:true})
expect(await hideOnClickCheckbox.isChecked()).toBeTruthy()

const allBoxes= page.getByRole('checkbox')

for(const box of await allBoxes.all()){
await box.check({force:true})
 expect(await box.isChecked()).toBeTruthy()
}

for(const box of await allBoxes.all()){
await box.uncheck({force:true})
 expect(await box.isChecked()).toBeFalsy()
}



})




})


test('Dropdown', async({page})=>{
const moodDropdown= page.locator('ngx-header nb-select')  //define the dropdown box
await moodDropdown.click();  //open it
//const colorMood= ' Cosmic'
//await page.getByRole('list') DDL UL
//await page.getByRole('listitem') DDL LI

const optionList= page.locator('nb-option-list nb-option') //define all values in the list and save them in variable optionList
await expect(optionList).toHaveText(['Light','Dark','Cosmic','Corporate'])  //verify the correct values in the list
//await optionList.filter({hasText:'Dark'}).click()
 //await page.getByRole('list').locator('nb-option',{hasText:colorMood}).click()

 const headerLayOut= page.locator('nb-layout')  //define variable for the layout element to go through and verify the background color
  // await expect(headerLayOut).toHaveCSS('background-color','rgb(21, 26, 48)')

const colors={
'Light':"rgb(237, 241, 247)",
'Dark':"rgb(21, 26, 48)",
'Cosmic':"rgb(27, 27, 56)",
'Corporate':"rgb(237, 241, 247)"
}
//important to use For in loop not of loop because for in loop is recommended for index/key /for of "value"
for(const color in colors){
await optionList.filter({hasText:color}).click()
await expect(headerLayOut).toHaveCSS('background-color',colors[color])
if(color !='Corporate')
await moodDropdown.click()

}

})


test('Tooltips',async({page})=>{

const modalOverlays= page.getByText('Modal & Overlays')
const toolTip= page.getByText('Tooltip')
await modalOverlays.click()
await toolTip.click()
const toolTipHeader=page.locator('nb-card',{hasText:'Tooltip Placements'})
// await toolTipHeader.getByRole('button',{name:'Top'}).hover()
// await expect(page.locator('nb-tooltip')).toBeVisible()
// await expect(page.locator('nb-tooltip')).toContainText('This is a tooltip')


const allToolTips=['Top','Right','Bottom','Left']

// for(const tool of allToolTips){
// await toolTipHeader.getByRole('button',{name:tool}).hover()
// await expect(page.locator('nb-tooltip')).toBeVisible()
// await expect(page.locator('nb-tooltip')).toContainText('This is a tooltip')
// }

for(const tool of allToolTips){
await toolTipHeader.getByRole('button',{name:tool}).hover()
 expect(page.locator('nb-tooltip').waitFor({state:"visible"}))
await expect(page.locator('nb-tooltip')).toContainText('This is a tooltip')
}

})


test('dialog boxes', async({page})=>{

   await page.getByText('Tables & Data').click()
   await page.getByText('Smart Table').click()


   //if we are dealing with browser dialog box we have to user page.on method
page.on('dialog',dialog=>{
expect(dialog.message()).toEqual('Are you sure you want to delete?')
dialog.accept()

})
   //await page.locator('nb-card',{hasText:'Smart Table'}).getByRole('table').locator('tr',{hasText:'mdo@gmail.com'}).locator('.nb-edit').click()
   await page.locator('table tr',{hasText:'mdo@gmail.com'}).locator('.nb-trash').click()
   expect(page.locator('table tr').first()).not.toHaveText('mdo@gmail.com')




})

test('web tables',async({page})=>{
   await page.getByText('Tables & Data').click()
   await page.getByText('Smart Table').click()

//1get the row ny any test in this row if the rows has unique values
   const targetRow= page.getByRole('row',{name:'ann@gmail.com'})
   await targetRow.locator('.nb-edit').click()

   //here the text converted to input field so we have can not user getbyrole , only .locator
  await page.locator('input-editor').getByPlaceholder('Age').clear()
   await page.locator('input-editor').getByPlaceholder('Age').fill('22')
   await page.locator('.nb-checkmark').click()
//_____________________________________
//2get the row based on the value in specific colum , if for examples the vaules not unique in whole table but unique in specific colum

await page.locator('.ng2-smart-pagination-nav').getByText('2').click()
//here to get the row with value "11" but only in colum by index(1) which in the table colum "ID"
const targetRowById=page.getByRole('row', {name:'11'}).filter({has: page.locator('td').nth(1).getByText('11')})
await targetRowById.locator('.nb-edit').click()
  await page.locator('input-editor').getByPlaceholder('Age').clear()
   await page.locator('input-editor').getByPlaceholder('Age').fill('22')
   await page.locator('.nb-checkmark').click()
//here we verify that the value in the colum 6 of the target row is equal "22"
 expect(targetRowById.locator('td').nth(6)).toHaveText('22')

//_________________________________________________

 //3 test tilter of the table
 const ages=["20","30","40","200"]

 for(let age of ages){
   await page.locator('input-filter').getByPlaceholder('Age').clear()
   await page.locator('input-filter').getByPlaceholder('Age').fill(age)
   await page.waitForTimeout(500)
   //here we get first all rows in table after entering the age in search field
   const agesRows= page.locator('tbody tr')
//we go inside every row in table
   for(let agerow of await agesRows.all()){
      //we get the value of the last colum in every row
   const cellValue= await agerow.locator('td').last().textContent()

   if(age=="200"){
expect(page.locator('tbody td')).toContainText('No data found')

   }else{

 expect(cellValue).toEqual(age)
   }


   }

 }
   
})


test('DatePicker',async({page})=>{
   
   //1 set hardcoded date
   await page.getByText('Forms').click()
   await page.getByText('Datepicker').click()

   const comDarepickerfield=page.getByPlaceholder('Form Picker')
   await comDarepickerfield.click()

   await page.locator('[class="day-cell ng-star-inserted"]').getByText('1',{exact:true}).click()
   await expect(comDarepickerfield).toHaveValue('Feb 1, 2026')


   //2 set dynamic date

   
   await comDarepickerfield.click()

   //here we have create a instiance from a method Date
   let date=new Date()
   date.setDate(date.getDate()+200);



   const expectedDay=date.getDate().toString()
   const expectedMonthshort=date.toLocaleString('EN-US', { month: 'short' });
   const expectedMonthlong=date.toLocaleString('En-US', { month: 'long' });
   const expectedYear=date.getFullYear()



   const expectedDate=`${expectedMonthshort} ${expectedDay}, ${expectedYear}`

   //here we get the value of the month and year header and verify or the calender is locating in desired month and year if not we click on the right pfeil 
   let actualDateField= await page.locator('nb-calendar-view-mode').textContent()
   const expectedMonthYear=` ${expectedMonthlong} ${expectedYear} `

//we compare the expected date for example March 2026
   while(!actualDateField.includes(expectedMonthYear)){
      await page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click()
       actualDateField= await page.locator('nb-calendar-view-mode').textContent() //we defined the actualDateField with let as we will reassign it the values of month year
   }



   await page.locator('[class="day-cell ng-star-inserted"]').getByText(expectedDay,{exact:true}).click()
   await expect(comDarepickerfield).toHaveValue(expectedDate)

})


test('Silders',async({page})=>{
   //update slider by attributes 
   const tempGaug= page.locator('[tabtitle="Temperature"] ngx-temperature-dragger circle')

   await tempGaug.evaluate(node=> {
      node.setAttribute('cx','264.588')
      node.setAttribute('cy','180.48122')
   }) 

   await tempGaug.click()
   const tempBox= page.locator('[tabtitle="Temperature"] ngx-temperature-dragger')
   await expect(tempBox).toContainText('28')


   //update slider by mouse movement

   await tempBox.scrollIntoViewIfNeeded()
   const box=await tempBox.boundingBox()
   const x=box.x + box.width /2
   const y=box.y + box.height /2
   await page.mouse.move(x,y)
   await page.mouse.down()
   await page.mouse.move(x +100,y)
   await page.mouse.move(x +100,y+100)
   await page.mouse.up()
   await expect(tempBox).toContainText('30')


   
})









