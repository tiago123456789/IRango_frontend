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
        return this._tryCatch(async () => {
            const response = await axios.get(`${this._url}${this._endpoint}`);
            return response.data;
        });
    }

    /**
     * @description Busca todos os restaurantes próximos a lat é lng especificado.
     * @returns {*}
     */
    findAllUpcoming(lat, lng) {
        return this._tryCatch(async () => {
            const response = await axios.get(`${this._url}${this._endpoint}/distancia?lat=${lat}&lng=${lng}`);
            return response.data;
        });
    }

    /**
     * @description Cria um novo restaurante.
     * @param content
     * @returns {*}
     */
    create(content) {
        return this._tryCatch(async () => await axios.post(`${this._url}${this._endpoint}`, content));
    }

    /**
     * @description Deleta um restaurante
     * @returns {Promise.<void>}
     */
    async deletar(id) {
          await axios.delete(`${this._url}${this._endpoint}/${id}`);
    }

    /**
     * @description Faz try catch das funções assíncronas.
     * @param callback
     * @returns {*}
     */
    _tryCatch(callback) {
        try {
            return callback();
        } catch(e) {
            throw new Error(e);
        }
    }
}