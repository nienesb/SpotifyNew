import {Component, OnInit} from '@angular/core';
import { NavbarComponent} from './navbar/navbar.component';
import {ArtistService} from "./artist.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
 // directives: [NavbarComponent]
})

export class AppComponent implements OnInit {

  constructor (private spotifyService: ArtistService){

  }

  ngOnInit() {
    this.spotifyService.getCurrentUser().subscribe(user => {
        this.spotifyService.userInfo = user;
        });
      }
}
