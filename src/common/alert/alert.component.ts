import { AfterViewInit, Component, HostBinding, OnInit } from "@angular/core";
import { AlertService, AlertTypes } from "../../services/alert/alertService.service";
import { trigger, transition, style, group, animate } from "@angular/animations";

@Component({
    selector: 'alert',
    templateUrl: 'alert.component.html',
    styleUrl: 'alert.component.scss',
    animations: [
        trigger('showHide', [
            transition(':enter', [
                style({
                    opacity: 0,
                    transform: 'translateX(40px)',
                }),
                group([
                    animate(
                    '400ms ease-out',
                    style({
                        opacity: 1,
                        transform: 'translateX(0)',
                    })
                    ),
                ]),
            ]),
            transition(':leave', [
                style({
                    opacity: 1,
                }),
                group([
                    animate(
                    '400ms ease-out',
                    style({
                        opacity: 0,
                    })
                    ),
                ]),
            ]),
        ]),
        ],

})

export class AlertComponent {

    @HostBinding('style.background')
    public get color() {
        const alertType = this.alertService.alertType

        let color = ''

        switch(alertType) {
            case AlertTypes.SUCCESS:
                color ='green'
                break
            case AlertTypes.WARNING:
                color = 'yellow'
                break
            case AlertTypes.ERROR:
                color = '#290d0a'
                break
            default:
                color = ''
        }

        return color

    }

    constructor(public alertService: AlertService) {}

}