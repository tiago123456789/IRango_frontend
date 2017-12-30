import axios from "axios";
import configuracoes from "./../config/Configuracao";

export default class Restaurante {

    constructor() {
        this._endpoint= "restaurantes";
        this._url = configuracoes.URL_API;
    }

    /**
     * @description Busca todos os restaurantes.
     * @returns {Promise.<void>}
     */
    async findAll() {
        try {
            const response = await axios.get(`${this._url}${this._endpoint}`);
            return response.data;
        } catch(e) {
            throw new Error(e);
        }
    }

    /**
     * @description Busca todos os restaurantes próximos a lat é lng especificado.
     * @returns {*}
     */
    findAllUpcoming(lat, lng) {
        return this.tryCatch(async () => {
            const response = await axios.get(`${this._url}${this._endpoint}/distancia?lat=${lat}&lng=${lng}`);
            return response.data;
        });
    }


    tryCatch(callback) {
        try {
            return callback();
        } catch(e) {
            throw new Error(e);
        }
    }

    /**
     * @description Deleta um restaurante
     * @returns {Promise.<void>}
     */
    async deletar(id) {
            console.log(id);
          await axios.delete(`${this._url}${this._endpoint}/${id}`);
    }
}