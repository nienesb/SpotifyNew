import { Component } from '@angular/core';
import {ArtistService} from "../artist.service";

@Component({
//  moduleID: module.id,
  selector: 'navbar',
  templateUrl: './navbar.component.html',
})

export class NavbarComponent {

  constructor(private spotifyService: ArtistService) {

  }

  LogoutSpotify() {
    this.spotifyService.logout();
  }
}
