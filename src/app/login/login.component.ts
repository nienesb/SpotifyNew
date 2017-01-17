import {Component, Provider, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import {ArtistService} from "../artist.service";

@Component({
  templateUrl: './login.component.html',
})

export class LoginComponent {
  public loading: boolean = false;
  public errorMessage: string;

  constructor(private router : Router, private route: ActivatedRoute, private spotifyService : ArtistService){
  }

  LoginSpotify() {
    this.spotifyService.login().subscribe(
      token => {
        this.router.navigate(['/home']);
      },
      err => {
        this.errorMessage = err;
        console.error(this.errorMessage);
      },
      () => { })
    // window.location.href='https://accounts.spotify.com/authorize?client_id=62b917dd9db545c9993305cca9b84f48&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A4200%2Flogin';
  }

}


