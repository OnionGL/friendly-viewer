import { Component, Input } from "@angular/core";
import {Location} from '@angular/common';
import { FooterService } from "../../services/footer/footer.service";


@Component({
    selector: 'footer',
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.scss'
})

export class FooterComponent {

    @Input() isBackButton: boolean = true
    
    constructor(private _location: Location , public footerService: FooterService){}

    public redirectToPrevPage(){
        this._location.back();
    }

}