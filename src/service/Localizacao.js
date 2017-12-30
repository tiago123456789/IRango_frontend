export default class Localizacao {

    /**
     * @description Obtêm a posição atual do usuário.
     * @returns {Promise}
     */
    getPosicaoAtual() {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition((position) => resolve(position));
        });
    }
}