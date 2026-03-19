class SecretariaDTO {
    constructor({ idSecretaria, nombre, email, telefono, idFacultad, facultad }) {
        this.idSecretaria = idSecretaria;
        this.nombre = nombre;
        this.email = email;
        this.telefono = telefono;
        this.idFacultad = idFacultad;
        if (facultad) {
            this.facultad = {
                idFacultad: facultad.idFacultad,
                nombre: facultad.nombre
            };
        }
    }

    static validar(data) {
        const errors = [];
        if (!data.nombre) errors.push('El nombre es obligatorio');
        if (!data.email) errors.push('El email es obligatorio');
        if (!data.idFacultad) errors.push('La facultad es obligatoria');
        return errors;
    }
}

module.exports = SecretariaDTO;