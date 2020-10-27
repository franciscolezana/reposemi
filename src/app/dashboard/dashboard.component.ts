import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router, private userService: UserService, private http: HttpClient) { }
  usuario = localStorage.getItem("usuario");
  foto = localStorage.getItem("foto");
  nombre = localStorage.getItem("nombre");
  nombre_temp = this.nombre;
  foto_temp = this.foto;;
  password: string;

  LogOut() {
    localStorage.removeItem("usuario");
    localStorage.removeItem("foto");
    this.router.navigate(["home"]);
  }

  ngOnInit() {
  }

  url = "assets/back.png";
  cardImageBase64: string;

  onClick() {

  }

  inicio() {
    this.router.navigate(["principal"]);
  }

  actualizar() {

    if (this.password != null) {
      let resp = this.http.post("http://34.239.245.60:3000/login",
        {
          "usuario": this.usuario,
          "password": this.password
        }).toPromise().then((data: any) => {
          //console.log(data);
          console.log(data.estado)
          if (data.estado == 1) {
            if (this.cardImageBase64 == null) {
              let resp = this.http.put("http://34.239.245.60:3000/actualizarUsuario/" + this.usuario,
                {
                  "nombre": this.nombre_temp,
                  "foto": ""
                }).toPromise().then((data: any) => {
                  let resp2 = this.http.post("http://34.239.245.60:3000/login",
                    {
                      "usuario": this.usuario,
                      "password": this.password
                    }).toPromise().then((data: any) => {
                      console.log(data);
                      if (data.estado == 1) {
                        console.log(data.foto);
                        localStorage.setItem('usuario', this.usuario);
                        localStorage.setItem('nombre', data.nombre);
                        if (data.foto == null) {
                          localStorage.setItem('foto', "assets/back.png");
                        } else {
                          localStorage.setItem('foto', data.foto);
                        } this.router.navigate(["principal"]);
                      };
                    })
                })
            } else {
              let resp = this.http.put("http://34.239.245.60:3000/actualizarUsuario/" + this.usuario,
                {
                  "nombre": this.nombre_temp,
                  "foto": this.cardImageBase64
                }).toPromise().then((data: any) => {

                  let resp = this.http.post("http://34.239.245.60:3000/login",
                    {
                      "usuario": this.usuario,
                      "password": this.password
                    }).toPromise().then((data: any) => {
                      console.log(data);
                      if (data.estado == 1) {
                        console.log(data.foto);
                        localStorage.setItem('usuario', this.usuario);
                        localStorage.setItem('nombre', data.nombre);
                        if (data.foto == null) {
                          localStorage.setItem('foto', "assets/back.png");
                        } else {
                          localStorage.setItem('foto', data.foto);
                        } this.router.navigate(["principal"]);
                      };
                    })

                })
            }

          }
        })
    }
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
          this.foto_temp = event.target.result;
          // this.previewImagePath = imgBase64Path;
        }
      };
    };
  }

}
