import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, FormBuilder } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule, MdDialogModule } from '@angular/material';
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';


import { AppComponent } from './app.component';
import { NavbarComponent } from "./navbar/navbar.component";
import { AppRoutes } from "./app.routes";
import { SearchComponent } from "./search/search.component";
import { FollowComponent } from "./follow/follow.component";
import { ArtistService} from "./artist.service";
import { TruncatePipe } from "./truncate";
import { LoginComponent } from "./login/login.component";
import { CallbackComponent } from "./callback.component";
import { ModalComponent } from "./modal/modal.component";



@NgModule({
  declarations: [
    AppComponent,
    CallbackComponent,
    NavbarComponent,
    FollowComponent,
    SearchComponent,
    LoginComponent,
    ModalComponent,
    TruncatePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutes,
    MaterialModule.forRoot(),
    MdDialogModule
  ],
  providers: [
    ArtistService,
    FormBuilder,
  ],
  bootstrap: [AppComponent],
})

export class AppModule {

}
