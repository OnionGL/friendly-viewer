import { Injectable, TemplateRef } from "@angular/core";

@Injectable({providedIn: 'root'})
export class FooterService {

    public templateRef: TemplateRef<any> | null

    constructor() {}

    public setTemplateRef(templateRef: TemplateRef<any>) {
        console.log("Set" , templateRef)
        this.templateRef = templateRef
    }

    public clearTemplateRef(){
        this.templateRef = null
    }

}