import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Subscription, fromEvent } from "rxjs";

type TInputParams = {
    formControl: FormControl,
    placeholder?: string,
    type?: string
}

@Component({
    selector: 'input-component',
    templateUrl: './input.component.html',
    styleUrl: './input.component.scss'
})

export class InputComponent implements AfterViewInit , OnDestroy {

    @ViewChild('input') inputRef: ElementRef

    @Input() params: TInputParams

    private inputSub: Subscription

    constructor() {}

    public ngAfterViewInit(): void {
        this.inputSub = fromEvent<any>(this.inputRef.nativeElement , 'input').subscribe(input => {
            const inputValue = input.target['value'] as any
            this.params.formControl.setValue(inputValue)
        })    
    }

    public ngOnDestroy(): void {
        this.inputSub?.unsubscribe()    
    }

}