import { NgModule } from "@angular/core";
import { FooterDirective } from "./footer.directive";
import { HeaderDirective } from "./header.directive";

@NgModule({
    declarations: [ FooterDirective , HeaderDirective ],
    exports: [ FooterDirective , HeaderDirective ]
})


export class SharedModule {}