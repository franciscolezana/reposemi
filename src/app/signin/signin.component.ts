import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { estructuraRespLogin } from '../models/rspLogin-interface';
import { HttpClient } from '@angular/common/http';
import { Md5 } from 'ts-md5';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  constructor(private router: Router, private userService: UserService, private http: HttpClient) { }

  ngOnInit() {
  }

  nombre: string;
  usuario: string;
  password: string;
  password2: string;
  url = "assets/back.png";
  cardImageBase64: string;
  conFoto: boolean = false;
  json;

  registrarse() {
    if (this.passwordIsCorrect()) {
      if (this.conFoto) {
        //Registro con Foto
        let resp = this.http.post("http://34.239.245.60:3000/registroConFoto",
          {
            "usuario": this.usuario,
            "password": this.password,
            "nombre": this.nombre,
            "foto": this.cardImageBase64
          }).toPromise().then((data: any) => {
            console.log(data);
            this.json = data;
            this.ingresar();
          })
      } else {
        //Registro sin Foto
        let resp = this.http.post("http://34.239.245.60:3000/registroUsuario",
          {
            "usuario": this.usuario,
            "password": this.password,
            "nombre": this.nombre
          }).toPromise().then((data: any) => {
            console.log(data);
            this.json = data;
            this.ingresar();
          })
      }
    } else {
      this.password = "";
      this.password2 = "";
    }
  }

  passwordIsCorrect() {
    if (this.password == this.password2) {
      return true;
    }
    return false;
  }

  ingresar() {
    let resp = this.http.post("http://34.239.245.60:3000/login",
      {
        "usuario": this.usuario,
        "password": this.password
      }).toPromise().then((data: any) => {
        console.log(data);
        this.json = data;
        if (this.json.estado == 1) {
          localStorage.setItem('usuario', this.usuario);
          localStorage.setItem('nombre', this.json.nombre);
          if (this.json.foto == null) {
            localStorage.setItem('foto', "assets/back.png");
          } else {
            localStorage.setItem('foto', this.json.foto);
          } this.router.navigate(["principal"]);
        };
      })
  }


  encriptar(cadena: string): any {
    const md5 = new Md5();
    var messageEncrypted = md5.appendStr(cadena).end();
    return messageEncrypted;
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
          this.url = event.target.result;
          this.conFoto = true;
        }
      };
    };
  }

}
