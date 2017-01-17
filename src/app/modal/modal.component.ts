/**
 * Created by Janine on 16-1-2017.
 */
import {Component, ViewContainerRef} from '@angular/core';
import {MdDialogRef, MdDialog} from "@angular/material";
import {FollowDialog} from "../follow/follow.component";

@Component({
//  moduleID: module.id,
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})


export class ModalComponent {

  constructor( public dialogRef: MdDialogRef<FollowDialog>) {}

 /* constructor(public dialog: MdDialog, MdDialogRef: FollowDialog) {
  }

  openDialog() {
    this.dialogRef = this.dialog.open(FollowDialog, {
      disableClose: false
    });

    this.dialogRef.afterClosed().subscribe(result => {
      console.log('result: ' + result);
      this.dialogRef = null;
    });
  }*/
}

