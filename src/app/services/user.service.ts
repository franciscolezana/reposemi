import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { map } from "rxjs/operators"; 
import { estructuraRespLogin } from '../models/rspLogin-interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  })

  getAllPhotos(usuario: string) {
    const url = "https://o58kgphgo0.execute-api.us-east-1.amazonaws.com/dev/serverless";
    return this.http
    .post(
      url, 
      {
        "usuario":usuario
      },
      { headers: this.headers }
    )
    .pipe(map(data => data));
  }

  getDiscos(id: number) {
    const url = "http://localhost:3200/users/prueba";
    return this.http
      .post(
        url,
        {
          "id": id
        },
        { headers: this.headers }
      )
      .pipe(map(data => data));
  }

  getNodos(id: number) {
    const url = "http://localhost:3200/users/nodos";
    return this.http
      .post(
        url,
        {
          "id": id
        },
        { headers: this.headers }
      )
      .pipe(map(data => data));
  }


  getNodeContent(id: number) {
    const url = "http://localhost:3200/users/fileContent";
    return this.http
      .post(
        url,
        {
          "id": id
        },
        { headers: this.headers }
      )
      .pipe(map(data => data));
  }


  getDatos() {
    const url = "http://localhost:3200/users/datos";
    return this.http
      .post(
        url,
        {
          "id": 1
        },
        { headers: this.headers }
      )
      .pipe(map(data => data));
  }

  setDatos(mision: string, vision: string, aboutUs: string) {
    const url = "http://localhost:3200/users/setDatos"
    return this.http
      .put(
        url,
        {
          "mision": mision,
          "vision": vision,
          "aboutUs": aboutUs
        },
        { headers: this.headers }
      )
      .pipe(map(data => data));
  }

  getNodeName(id: number) {
    const url = "http://localhost:3200/users/fileName";
    return this.http
      .post(
        url,
        {
          "id": id
        },
        { headers: this.headers }
      )
      .pipe(map(data => data));
  }

  renameNode(id: number, nombre: string) {
    const url = "http://localhost:3200/users/renameNode";
    return this.http
      .post(
        url,
        {
          "name": nombre,
          "id": id
        },
        { headers: this.headers }
      )
      .pipe(map(data => data));
  }

  addNode(tipo: number, idPadre: number, nombre: string) {
    const url = "http://localhost:3200/users/incertNode";
    return this.http
      .post(
        url,
        {
          "tipo": tipo,
          "idPadre": idPadre,
          "nombre": nombre
        },
        { headers: this.headers }
      )
      .pipe(map(data => data));
  }

  inicioSesion(username: string, passw: string) {
    const url = "http://localhost:3200/users/login";
    return this.http
      .post(
        url,
        {
          "username": username,
          "password": passw
        },
        { headers: this.headers }
      )
      .pipe(map(data => data));
  }

  registrarUsuario(codigo: string, nombre: string, password: string, correo: string, telefono: string, foto: string, genero: string, nacimiento: string, direccion: string) {
    const url = "http://localhost:3200/users/signin1"
    return this.http
      .post(
        url,
        {
          "codigo": codigo,
          "nombre": nombre,
          "password": password,
          "correo": correo,
          "telefono": telefono,
          "foto": foto,
          "genero": genero,
          "nacimiento": nacimiento,
          "direccion": direccion
        }
      )
      .pipe(map(data => data))
  }


  registrarUsuarioSyncronice(codigo: string, nombre: string, password: string, correo: string, telefono: string, foto: string, genero: string, nacimiento: string, direccion: string) {
    const url = "http://localhost:3200/users/signin2"
    return this.http
      .post(
        url,
        {
          "codigo": codigo,
          "nombre": nombre,
          "password": password,
          "correo": correo,
          "telefono": telefono,
          "foto": foto,
          "genero": genero,
          "nacimiento": nacimiento,
          "direccion": direccion
        }
      )
      .pipe(map(data => data))
  }

  Syncronice(): Observable<any> {
    return this.http.get(`./assets/syncronice_users.json`);
  }

  actualizarTexto(contenido: string, id: number) {
    const url = "http://localhost:3200/users/updateText"
    return this.http
      .put(
        url,
        {
          "contenido": contenido,
          "id": id
        }
      )
      .pipe(map(data => data))
  }

  actualizarUsuario(codigo: string, nombre: string, password: string, correo: string, telefono: string, foto: string, genero: string, nacimiento: string, direccion: string, id: number) {
    const url = "http://localhost:3200/users/updateuser"
    return this.http
      .put(
        url,
        {
          "codigo": codigo,
          "nombre": nombre,
          "password": password,
          "correo": correo,
          "telefono": telefono,
          "foto": foto,
          "genero": genero,
          "nacimiento": nacimiento,
          "direccion": direccion,
          "id": id
        }
      )
      .pipe(map(data => data))
  }

  setUsuario(user: estructuraRespLogin) {
    let infoString = JSON.stringify(user);
    localStorage.setItem('CurrentUser', infoString);
    infoString = localStorage.getItem('CurrentUser');
  }
}

