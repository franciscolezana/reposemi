import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { LoginComponent } from '../login/login.component';
import { SigninComponent } from '../signin/signin.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { PrincipalComponent } from '../principal/principal.component';
import { ChatComponent } from '../chat/chat.component';
import { FriendsComponent } from '../friends/friends.component';
import { TempComponent } from '../temp/temp.component';
import { GraficaComponent } from '../grafica/grafica.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "/home",
    pathMatch: "full"
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  }, 
  {
    path: 'signin',
    component: SigninComponent,
  },
  {
    path: "dashboard",
    component: DashboardComponent,
  },
  {
    path: "principal",
    component: PrincipalComponent,
  }, 
  {
    path: "chat",
    component: ChatComponent,
  },  
  {
    path: "chat/:amigo",
    component: ChatComponent,
  }, 
  {
    path: "friends",
    component: FriendsComponent,
  },
  {
    path: "temp",
    component: TempComponent
  },
  {
    path: "grafica",
    component: GraficaComponent
  }
];



@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }