import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit {

  constructor(private router: Router, private userService: UserService, private http: HttpClient) { }
  usuario = localStorage.getItem("usuario");
  foto = localStorage.getItem("foto");
  nombre = localStorage.getItem("nombre");
  url2 = "assets/back.png";
  url = "assets/default.jpg";
  cardImageBase64: string;
  personas = [];
  publicaciones = [];
  texto: string;
  conFoto: boolean = false;

  LogOut() {
    localStorage.removeItem("usuario");
    localStorage.removeItem("foto");
    localStorage.removeItem("nombre");
    this.router.navigate(["home"]);
  }

  ngOnInit() {
    this.cargarAmigos();
    this.cargarPublicaciones();
  }

  cargarPublicaciones() {
    let resp = this.http.get("http://34.239.245.60:3000/getPublicaciones")
      .toPromise().then((data: any) => {
        //console.log(data);
        this.publicaciones = data;
      })

  }

  cargarAmigos() {
    let resp = this.http.post("http://34.239.245.60:3000/getAmigos",
      {
        "usuario": this.usuario
      }).toPromise().then((data: any) => {
        //console.log(data);
        this.personas = data;
      })

  }

  onClick() {
    console.log("Click");
  }

  publicar() {
    console.log(this.usuario);
    console.log(this.texto);
    console.log(this.cardImageBase64)
    if (this.texto != null || this.conFoto) {
      if (this.texto == null) {
        let resp = this.http.post("http://34.239.245.60:3000/publicar",
          {
            "usuario": this.usuario,
            "texto": "",
            "foto": this.cardImageBase64
          }).toPromise().then((data: any) => {
            this.router.navigate(["temp"]);
          })
      } else if (!this.conFoto) {
        let resp = this.http.post("http://34.239.245.60:3000/publicar",
          {
            "usuario": this.usuario,
            "texto": this.texto,
            "foto": ""
          }).toPromise().then((data: any) => {
            this.router.navigate(["temp"]);
          })
      } else {
        let resp = this.http.post("http://34.239.245.60:3000/publicar",
          {
            "usuario": this.usuario,
            "texto": this.texto,
            "foto": this.cardImageBase64
          }).toPromise().then((data: any) => {
            this.router.navigate(["temp"]);
          })
      }
    }
  }
  traducir(mensaje: string, index: number) {
    console.log(index);
    let resp = this.http.post("http://34.239.245.60:3000/traducirPost",
      {
        "post": mensaje
      }).toPromise().then((data: any) => {
        console.log(data);
        this.publicaciones[index].texto = data.post;
      })
  }




  onFileSelected(event: { target: { files: Blob[]; }; }) {
    if (event.target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        const image = new Image();
        image.src = event.target.result;
        image.onload = rs => {
          const imgBase64Path = event.target.result;
          if (imgBase64Path[11] == 'j') {
            this.cardImageBase64 = imgBase64Path.substring(23);
          } else {
            this.cardImageBase64 = imgBase64Path.substring(22);
          }
          //console.log(this.cardImageBase64);
          this.url = event.target.result;
          // this.previewImagePath = imgBase64Path;
          this.conFoto = true;
        }
      };
    };
  }

}
