import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient) { }
  usuario = localStorage.getItem("usuario");
  foto = localStorage.getItem("foto");
  nombre = localStorage.getItem("nombre");
  url2 = "assets/back.png";
  url = "assets/default.jpg";
  personas = [];
  solicitudes = [];

  ngOnInit() {
    this.cargarPersonas();
    this.cargarSolicitudes();
  }
  cargarSolicitudes() {
    
    let resp = this.http.post("http://34.239.245.60:3000/getSolicitudes",
    {
      "usuario": this.usuario
    }).toPromise().then((data: any) => {
      //console.log(data);
      this.solicitudes = data;
    })  
  }



  cargarPersonas() {
    let resp = this.http.post("http://34.239.245.60:3000/getUsuarios",
    {
      "usuario": this.usuario
    }).toPromise().then((data: any) => {
      //console.log(data);
      this.personas = data;
    })  
  }

  agregar(persona: string){
    let resp = this.http.post("http://34.239.245.60:3000/enviarSolicitud",
    {
      "emisor": this.usuario,
      "destinatario": persona
    }).toPromise().then((data: any) => {
      
    })  
  }

  aceptar(persona: string){
    let resp = this.http.post("http://34.239.245.60:3000/responderSolicitud",
    {
      "emisor": this.usuario,
      "destinatario": persona,
      "respuesta": "si"
    }).toPromise().then((data: any) => {
      this.router.navigate(["principal"]);
    })  
  }


  LogOut() {
    localStorage.removeItem("usuario");
    localStorage.removeItem("foto");
    localStorage.removeItem("nombre");
    this.router.navigate(["home"]);
  }

  inicio() {
    this.router.navigate(["principal"]);
  }
}
