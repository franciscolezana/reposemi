import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient,  private route: ActivatedRoute) { }
  usuario = localStorage.getItem("usuario");
  foto = localStorage.getItem("foto");
  nombre = localStorage.getItem("nombre");
  url2 = "assets/back.png";
  url = "assets/default.jpg";
  mensaje: string;
  pais: string;
  tipo: string;
  fechainicio: string;
  fechafinal: string;
  tipocasos: string;
  chatlog: string = "";
  estado: number = 1;
  chatbot: number = 1;
  json = [];
  amigo = String(this.route.snapshot.params['amigo']);
  mensajes = [];

  ngOnInit() {
    if (this.amigo === 'undefined') {
      this.chatlog = "Chatbot: Hola, ¿como puedo ayudarte?\n"
      this.chatbot == 1;
    } else {
      this.chatbot = 0;
      let resp = this.http.post("http://34.239.245.60:3000/getMensajes",
      {
        "emisor": this.usuario,
        "destinatario": this.amigo
      }).toPromise().then((data: any) => {
        data.forEach(element => {
          this.chatlog += element.usuario + ": " + element.mensaje + "\n";
        });
      })
    }
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

  chat() {
    if (this.chatbot == 1) {
      this.chatconBot();
    } else {
      this.chatConAmigo();
    }
  }


  chatconBot() {
    this.chatlog += this.nombre + ": " + this.mensaje + "\n";
    switch (this.estado) {
      case 1:
        if (this.mensaje.toLowerCase() == "casos" || this.mensaje.toLowerCase() == "grafica de casos") {
          this.chatlog += "Chatbot: ¿País? \n"
          this.tipo = this.mensaje.toLowerCase();
          this.estado = 2;
        } else {
          this.chatlog += "Chatbot: Lo siento, no puedo ayudarte, prueba con algo más\n"
        }
        break;
      case 2:
        if (this.tipo == 'casos') {
          this.chatlog += "Chatbot: ¿Fecha? \n"
        } else {
          this.chatlog += "Chatbot: ¿Fecha Inicio? \n"
        }
        this.pais = this.mensaje;
        this.estado = 3;
        break;
      case 3:
        if (this.tipo == 'casos') {
          this.chatlog += "Chatbot: ¿Que tipo de casos? \n"
          this.fechainicio = this.mensaje;
          this.estado = 4;
        } else {
          this.chatlog += "Chatbot: ¿Fecha Final? \n"
          this.fechainicio = this.mensaje;
          this.estado = 5;
        }
        break;
      case 4:
        this.tipocasos = this.mensaje.toLowerCase();
        this.getCasos();
        this.estado = 1;
        break;
      case 5:
        this.fechafinal = this.mensaje;
        this.chatlog += this.getGrafica() + "\n"
        this.estado = 1;
        break;
    }
    this.mensaje = "";
  }

  chatConAmigo() {
    let resp = this.http.post("http://34.239.245.60:3000/enviarMensaje",
    {
      "emisor": this.usuario,
      "destinatario": this.amigo,
      "mensaje": this.mensaje
    }).toPromise().then((data: any) => {
      this.chatlog += this.usuario + ": " + this.mensaje + "\n";
      this.mensaje = "";
    })

  }


  getCasos() {
    let mensaje = "";
    let confirmados;
    let muertos
    let recuperados;
    let resp = this.http.post("http://34.239.245.60:3000/obtenerCasos",
      {
        "pais": this.pais,
        "fecha": this.fechainicio
      }).toPromise().then((data: any) => {
        console.log(data.confirmed);
        confirmados = data.confirmed;
        muertos = data.deaths;
        recuperados = data.recovered;
        switch (this.tipocasos) {
          case "todos":
            mensaje += "Chatbot: Confirmados: " + confirmados + "\n";
            mensaje += "Chatbot: Recuperados: " + recuperados + "\n";
            mensaje += "Chatbot: Muertes: " + muertos + "\n";
            break;
          case "confirmados":
            mensaje += "Chatbot: Confirmados: " + confirmados + "\n";
            break;
          case "recuperados":
            mensaje += "Chatbot: Recuperados: " + recuperados + "\n";
            break;
          case "muertes":
            mensaje += "Chatbot: Muertes: " + muertos + "\n";
            break;
          default:
            mensaje += "Chatbot: No puedo ayudarte con ese dato\n";
            break;
        }
        this.chatlog += mensaje + "\n"
        this.chatlog += "Chatbot: ¿Algo más que pueda ayudarte?\n"
      })
  }

  getGrafica() {

  }


  wait(ms: any) {
    var start = new Date().getTime();
    var end = start;
    while (end < start + ms) {
      end = new Date().getTime();
    }
  }
}















