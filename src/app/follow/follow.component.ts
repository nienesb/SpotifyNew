import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {Observable} from "rxjs";
import {Response} from "@angular/http";
import {ArtistService} from "../artist.service";
import {Router} from "@angular/router";
import {Artist} from "../../../Artist";
import {ModalComponent} from "../modal/modal.component";
import {MdDialogRef, MdDialog, MdDialogConfig} from "@angular/material";


@Component({
//  moduleID: module.id,
  selector: 'follow',
  templateUrl: 'follow.component.html',
  styleUrls: ['follow.component.css']
})

export class FollowDialog {
  dialogRef: MdDialogRef<any>;
  private _dialog;
  private lastDialogResult;

  openDialog() {

    let dialogRef = this._dialog.open(ModalComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.lastDialogResult = result;
    })
  }

/*  constructor(
    public dialog: MdDialog,
    public viewContainerRef: ViewContainerRef) { }

  open(key) {
    let config = new MdDialogConfig();
    config.viewContainerRef = this.viewContainerRef;

    this.dialogRef = this.dialog.open(ModalComponent, config);

    this.dialogRef.afterClosed().subscribe(result => {
      this.dialogRef = null;
    });
  }*/
}


export class FollowComponent implements OnInit{
  private http;

  constructor (public router: Router,
               private spotifyService: ArtistService) {}

  initFollowList(){
    this.spotifyService.getCurrentUser().subscribe(user => {
        this.spotifyService.userInfo = user;
        this.spotifyService.following('artist').subscribe(followed => {
          this.spotifyService.favoritesInfo = followed.artists.items;
          console.log(followed);
        });
      },
      err => {
        this.router.navigate(['/login']);
        return false;
      });
  }

  ngOnInit() {
    this.initFollowList();
  }

  unfollowArtist (artistId: string) {
    this.spotifyService.unfollow('artist', artistId).subscribe(data => {
      this.initFollowList();
    });
  }

  imgError (img) {
    img.target.src="app/search/no-image.png";
  };
}
