import { ComponentType } from "@angular/cdk/portal";
import { Injectable, TemplateRef } from "@angular/core";
import { MatDialog, MatDialogConfig, MatDialogRef } from "@angular/material/dialog";

@Injectable({providedIn: 'root'})
export class ModalService {

    constructor(public dialog: MatDialog) {}

    public createDialog(
        component: ComponentType<any> | TemplateRef<any>,
        data: any = {},
        config: MatDialogConfig = { autoFocus: false }
    ): MatDialogRef<any> {
        return this.dialog.open(component, { data: data, ...config});
    }


}