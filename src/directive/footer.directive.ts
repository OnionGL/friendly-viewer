import { Directive, OnChanges, OnDestroy, OnInit, TemplateRef } from "@angular/core";
import { FooterService } from "../services/footer/footer.service";

@Directive({
    selector: '[footerContent]'
})

export class FooterDirective implements OnInit, OnDestroy {

    constructor(private el: TemplateRef<any>, private footerService: FooterService) {
        footerService.setTemplateRef(el)
    }

    public ngOnInit(){
        this.footerService.setTemplateRef(this.el)
    }
    
    public ngOnDestroy(){
        this.footerService.clearTemplateRef()
    }

}