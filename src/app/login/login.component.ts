import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { HttpClient } from '@angular/common/http';
import { Md5 } from 'ts-md5/dist/md5'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private userService: UserService, private http: HttpClient) { }
  ngOnInit() {

  }

  usuario: string;
  password: string;
  nombre: string;
  url = "assets/back.png";
  cardImageBase64: string;
  json;

  onClick() {
    console.log(this.usuario);
    console.log(this.password);
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
}