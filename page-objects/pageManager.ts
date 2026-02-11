import {test,Page,expect } from "@playwright/test";
import { NavigatePage } from "../page-objects/navigationPage";
import { FormLayout } from "../page-objects/formLayoutPage";
import { DatepickerPage } from "../page-objects/datapickerPage";

export class PageManager{
    //first we create field to every page object and then 
    private readonly page:Page
    private readonly navigatePage:NavigatePage
    private readonly formLayout:FormLayout
    private readonly datepickerPage:DatepickerPage

    constructor(page:Page){
        this.page = page
        //here we need to call all our Page objects inside our page fixture
        this.navigatePage = new NavigatePage(this.page)
        this.formLayout = new FormLayout(this.page)
        this.datepickerPage = new DatepickerPage(this.page)

    }


    navigateto(){
        return this.navigatePage
    }

    formLayoutPage(){
        return this.formLayout
    }


    onDatePickerPage(){
        return this.datepickerPage

    }




}