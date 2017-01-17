import {RouterModule, Routes} from '@angular/router';
import {SearchComponent} from './search/search.component';
import {FollowComponent} from  './follow/follow.component';
import {NgModule} from "@angular/core";
import {LoginComponent} from "./login/login.component";
import {CallbackComponent} from "./callback.component";
import {ModalComponent} from "./modal/modal.component";

const routes: Routes = [
  {path:'', component: SearchComponent},
  {path:'home', component: SearchComponent},
  {path:'follow', component: FollowComponent},
  {path:'login', component: LoginComponent},
  {path:'callback', component: CallbackComponent},
  {path:'modal', component: ModalComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutes {

}


