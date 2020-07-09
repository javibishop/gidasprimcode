export class Institucion {

    constructor(
        public id: string,
        public nombre: string,
        public provinciaId: string,
        public partidoId: string,
        public localidadId: string,
        public tipo: number,
        public telefono: string,
        public activo: boolean,
        public direccion: string
        )
        {}
}

