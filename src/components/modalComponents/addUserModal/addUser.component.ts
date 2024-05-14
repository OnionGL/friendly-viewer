import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
    selector: 'add-user',
    templateUrl: './addUser.component.html',
    styleUrl: './addUser.component.scss'
})

export class AddUserModalComponent {

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: {roomId: string},
        public dialogRef: MatDialogRef<AddUserModalComponent>,
    ) {
        
    }

    public closeModal() {
        this.dialogRef.close()
    }

}