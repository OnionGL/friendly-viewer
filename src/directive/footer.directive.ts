import { Directive, OnChanges, OnDestroy, OnInit, TemplateRef } from "@angular/core";
import { FooterService } from "../services/footer/FooterService.service";

@Directive({
    selector: '[footerContent]'
})

export class FooterDirective implements OnInit, OnDestroy {

    constructor(private el: TemplateRef<any>, private footerService: FooterService) {}

    public ngOnInit(){
        console.log("ON INIT" , this.el)
        this.footerService.setTemplateRef(this.el)
    }
    
    public ngOnDestroy(){
        this.footerService.clearTemplateRef()
    }

}