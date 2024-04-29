import { Component } from "@angular/core";
import { HeaderService } from "../../services/header/header.service";
import { Router } from "@angular/router";

@Component({
    selector: 'header',
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})

export class HeaderComponent {

    constructor(public headerService: HeaderService , private router: Router) {}

    public routeToPersonalArea() {
        this.router.navigate(['personalArea'])
    }

    public redirectToHome() {
        this.router.navigate(['home'])
    }
    
}