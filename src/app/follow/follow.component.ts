import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {Observable} from "rxjs";
import {Response} from "@angular/http";
import {ArtistService} from "../artist.service";
import {Router} from "@angular/router";
import {Artist} from "../../../Artist";
import {MdDialogRef, MdDialog, MdDialogConfig} from "@angular/material";
import {DialogComponent} from "../dialog/dialog.component";


@Component({
//  moduleID: module.id,
  selector: 'follow',
  templateUrl: 'follow.component.html',
  styleUrls: ['follow.component.css']
})



export class FollowComponent implements OnInit{
  private http;

  constructor (public router: Router,
               private spotifyService: ArtistService,
               private dialog: MdDialog) {
  }

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
    let dialogRef = this.dialog.open(DialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        console.log("Ja!");
        this.spotifyService.unfollow('artist', artistId).subscribe(data => {
          console.log('test');
          this.initFollowList();
        })
      }
    });
  }

  imgError (img) {
    img.target.src="app/search/no-image.png";
  };
}
