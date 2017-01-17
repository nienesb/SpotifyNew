///<reference path="../artist.service.ts"/>
import {Component, OnInit} from '@angular/core';
import {ArtistService} from "../artist.service";
import {Artist} from "../../../Artist";
import {Router} from "@angular/router";


@Component({
//  moduleID: module.id,
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit{
  zoekTerm: string;
  searchRes: Artist[];
  private src;

  constructor (public router: Router, private spotifyService: ArtistService) {
  }

  ngOnInit() {
    this.spotifyService.getCurrentUser().subscribe(user => {
        this.spotifyService.userInfo = user;

        this.spotifyService.getCurrentUsersPlaylists(20, 0).subscribe(playLists => {
          this.spotifyService.playListInfo = playLists.items;
        });
      },
      err => {
        this.router.navigate(['/login']);
        return false;
      });
  }

  followArtist (artistId: string) {
    this.spotifyService.follow('artist', artistId).subscribe(data => {
    });

  }

  searchMusic(){
   this.spotifyService.getArtist(this.zoekTerm).subscribe(res => {
       this.searchRes = res.artists.items;
     })
  }

  imgError (img) {
    img.target.src="app/search/no-image.png";
  };
}
