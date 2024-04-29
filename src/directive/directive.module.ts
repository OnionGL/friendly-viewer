import { NgModule } from "@angular/core";
import { FooterDirective } from "./footer.directive";
import { HeaderDirective } from "./header.directive";
import { CommonModule } from "@angular/common";

@NgModule({
    imports: [CommonModule],
    declarations: [ FooterDirective , HeaderDirective ],
    exports: [ FooterDirective , HeaderDirective ]
})


export class DirectiveModule {}