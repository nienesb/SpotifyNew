import {Component, Optional, Input} from "@angular/core";
import {MdDialogRef} from "@angular/material";

@Component({
  templateUrl: "./dialog.component.html",
  styleUrls: ["./dialog.component.scss"]
})

export class DialogComponent {

  constructor(@Optional() public dialogRef: MdDialogRef<DialogComponent>) {
    console.log();
  }
}
