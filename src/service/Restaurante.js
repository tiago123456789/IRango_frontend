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
        let response = null;
        try {
            response = await axios.get(`${this._url}${this._endpoint}`);
        } catch(e) {
            response = e;
        }

        return response.data;
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