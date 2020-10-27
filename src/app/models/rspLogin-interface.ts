export interface estructuraRespLogin{
    respuesta: boolean,
    data: {
      id: number,
      codigo: string,
      nombre: string,
      password: string,
      correo: string,
      telefono: string,
      url_foto: string,
      genero: string,
      fecha_nacimiento: string,
      fecha_registro: string,
      direccion: string,
      tipo_usuario_id: number,
      estado: number,
      usuario_verificado: number,
    }
}

export interface estructuraNombre{
  nombre: string,
}

export interface estructuraContenido{
  contenido: string,
}

export interface estructuraDatos{
  data: {
    id: number,
    nombre: string,
    contenido: string,
  }
}