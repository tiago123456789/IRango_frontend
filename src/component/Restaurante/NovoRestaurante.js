import React, {Component} from "react";
import Mapa from "./../GoogleMaps";
import { Marker } from "react-google-maps";
import LocalizacaoService from "./../../service/Localizacao";
import RestauranteService from "./../../service/Restaurante";

import Loading from "../template/Loading";

export default class NovoRestaurante extends Component {

    constructor(props) {
        super(props);
        this.localizacaoService  = new LocalizacaoService();
        this.restauranteService = new RestauranteService();
        this.state = {
            name: undefined,
            lat: 0,
            lng: 0,
            isGettingPosition: false
        };
        this.onNovoPosicao = this.onNovoPosicao.bind(this);
        this.alterarDadoState = this.alterarDadoState.bind(this);
        this.create = this.create.bind(this);
    }

    /**
     * @description Altera dados do state do componente.
     * @param key
     * @param content
     */
    alterarDadoState(key, content) {
        this.setState({ [key]: content });
    }


    /**
     * @description Executado depois de renderizar o componente.
     * @returns {Promise.<void>}
     */
    async componentDidMount() {
        const posicao = await this.localizacaoService.getPosicaoAtual();
        const { latitude, longitude } = posicao.coords;
        this.alterarDadoState("lat", latitude);
        this.alterarDadoState("lng", longitude);
        this.alterarDadoState("isGettingPosition", true);
    }

    /**
     * @description Altera posição(latitude é longitude).
     */
    onNovoPosicao(event) {
        const latitude = event.latLng.lat();
        const longitude = event.latLng.lng();
        this.alterarDadoState("lat", latitude);
        this.alterarDadoState("lng", longitude);
    }

    /**
     * @description Define um valor padrão para valores no state do componente.
     */
    definirValorPadraoState() {
        this.alterarDadoState("name", "");
        this.alterarDadoState("lat", 0);
        this.alterarDadoState("lng", 0);
    }

    /**
     * @description Cria um novo restaurante.
     * @param event
     * @returns {Promise.<void>}
     */
    async create(event) {
        event.preventDefault();
        const novoRestaurante = {
            name: this.state.name,
            lat: this.state.lat,
            lng: this.state.lng
        };
        await this.restauranteService.create(novoRestaurante);
        this.definirValorPadraoState();
        this.props.history.push("/");
    }

    render() {
        if (this.state.isGettingPosition == false) {
            return <Loading/>
        } else {

            return (
                <div>
                    <h1>Novo Restaurante</h1>
                    <form onSubmit={this.create}>

                        <div className="form-group">
                            <input type="text"
                                   value={this.state.name}
                                   onChange={(e) => this.alterarDadoState("name", e.target.value)}
                                   className="form-control" placeholder="Nome Restaurante"/>
                        </div>

                        <Mapa
                            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBb1PiYCFMEM83jLuemPPB8aJG-StirN9U"
                            loadingElement={<div style={{ height: `100%` }} />}
                            containerElement={<div style={{ height: `500px` }} />}
                            mapElement={<div style={{ height: `100%` }} />}
                            location={{lat: this.state.lat, lng: this.state.lng }} >

                            <Marker position={{lat: parseFloat(this.state.lat), lng: parseFloat(this.state.lng) }}
                                    draggable={true}
                                    onDragEnd={this.onNovoPosicao} />
                        </Mapa>

                        <div className="form-group">
                            <input type="submit" className="btn btn-primary" value="Save"/>
                        </div>

                    </form>
                </div>
            )
        }
    }
}