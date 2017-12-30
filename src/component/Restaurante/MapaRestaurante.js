import React, { Component } from "react";
import RestauranteService from "../../service/Restaurante";
import LocalizacaoService from "../../service/Localizacao";
import Mapa from "./../GoogleMaps";
import Loading from "../template/Loading";

export default class MapaRestaurante extends Component {

    constructor(props) {
        super(props);
        this.restauranteService = new RestauranteService();
        this.localizacaoService = new LocalizacaoService();
        this.state = {
            isGettingPosition: false,
            location: {},
            restaurantes: []
        }
    }

    /**
     * @description Altera o dado de um conteúdo no state.
     * @param chave
     * @param content
     */
    alterarDadoState(chave, content) {
        this.setState({ [chave]: content });
    }

    /**
     * @description Busca todos os restaurantes próximos a lat é lng especificado.
     * @param lat
     * @param lng
     * @returns {Promise.<void>}
     */
    async getRestaurantesProximos(lat, lng) {
        const restaurantes = await this.restauranteService.findAllUpcoming(lat, lng);
        this.alterarDadoState("restaurantes", restaurantes);
    }

    /**
     * @description Obtêm a posição atual.
     */
    async getPosicaoAtual() {
        const { lat, lng } = this.props.match.params;

        if (lat && lng) {
            this.alterarDadoState("location", { lat: parseFloat(lat), lng: parseFloat(lng) });
            this.getRestaurantesProximos(lat, lng);
        } else if (navigator.geolocation) {
            const position = await this.localizacaoService.getPosicaoAtual();
            this.alterarDadoState("location", {lat: position.coords.latitude, lng: position.coords.longitude});
            this.getRestaurantesProximos(position.coords.latitude, position.coords.longitude);
        }

        this.alterarDadoState("isGettingPosition", true);
    }

    /**
     * @description Executa algo após componente ser renderizado.
     */
    componentDidMount() {
        this.getPosicaoAtual();
    }

    render() {
        if (this.state.isGettingPosition == false) {
            return <Loading/>
        } else {
            return (
                <div>
                    <Mapa
                        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBb1PiYCFMEM83jLuemPPB8aJG-StirN9U"
                        loadingElement={<div style={{ height: `100%` }} />}
                        containerElement={<div style={{ height: `500px` }} />}
                        mapElement={<div style={{ height: `100%` }} />}
                        restaurantes={this.state.restaurantes}
                        location={this.state.location}/>
                </div>
            )
        }
    }

}
