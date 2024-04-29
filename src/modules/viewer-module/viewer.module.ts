import { NgModule } from "@angular/core";
import { ViewerComponent } from "../../components/viewer/viewer.component";
import { ControlsModule } from "../controls-module/controls-module.module";
import { DirectiveModule } from "../../directive/directive.module";
import { ViewerService } from "../../services/viewer/viewer.service";
import { CommonModule } from "@angular/common";

@NgModule({
    imports: [
        CommonModule,
        ControlsModule,
        DirectiveModule
    ],
    exports: [
        ViewerComponent
    ],
    declarations: [
        ViewerComponent
    ],
    providers: [ViewerService]
})

export class ViewerModule {}