import { Component, Provider, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { ArtistService } from "./artist.service";


@Component({
  template: '',
})

export class CallbackComponent {
  public loading: boolean = false;
  public errorMessage: string;

  constructor(public router: Router, private spotifyService: ArtistService) {
    let hash = window.location.hash;
    if (hash) {
      if (window.location.search.substring(1).indexOf('error') !== -1) {
        // login failure
        window.close();
      } else if (hash) {
        // login success
        let token = window.location.hash.split('&')[0].split('=')[1];
        localStorage.setItem('angular2-spotify-token', token);
      }
    } else {
      window.close();
    }
  }
}


