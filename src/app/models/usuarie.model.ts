
export class Usuarie {

    constructor(
        public id: string,
        public nombre: string,
        public apellido: string,
        public activo: boolean,
        public userName: string,
        public password: string,
        public especialidadId: number,
        public token: string
        )
        {}
}

