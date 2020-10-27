import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { SigninComponent } from './signin/signin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PrincipalComponent } from './principal/principal.component';
import { ChatComponent } from './chat/chat.component';
import { AddfriendComponent } from './addfriend/addfriend.component';
import { FriendsComponent } from './friends/friends.component';
import { ChartsModule } from 'projects/angular-bootstrap-md/src/public_api';
import { TempComponent } from './temp/temp.component';
import { GraficaComponent } from './grafica/grafica.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SigninComponent,
    DashboardComponent,
    PrincipalComponent,
    ChatComponent,
    AddfriendComponent,
    FriendsComponent,
    TempComponent,
    GraficaComponent
  ],
  imports: [
    BrowserModule,
    MDBBootstrapModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }