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
                    height: 0,
                    marginTop: '0',
                    transform: 'translate3d(0, 40px, 0)',
                }),
                group([
                    animate(
                    '450ms ease-out',
                    style({
                        opacity: 1,
                        height: '*',
                    })
                    ),
                    animate(
                    '150ms ease-out',
                    style({
                        transform: 'translate3d(0, 0, 0)',
                        marginTop: '10px',
                    })
                    ),
                ]),
            ]),
            transition(':leave', [
                group([
                    animate(
                    '550ms 400ms cubic-bezier(0, 0, 0.19, 1)',
                    style({ height: 0, marginTop: 0 })
                    ),
                    animate(
                    '350ms cubic-bezier(0.550, 0.055, 0.675, 0.190)',
                    style({ opacity: 0, transform: 'translate3d(100%, 0, 0)' })
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
                color = 'red'
                break
            default:
                color = ''
        }

        return color

    }

    constructor(public alertService: AlertService) {}

}