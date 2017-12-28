import React, { Component } from 'react';
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
} from "react-google-maps";
import axios from "axios";
import Header from "./component/Header";
import { Route, Switch } from "react-router-dom";
import ListaRestaurante from "./component/Restaurante/ListaRestaurante";
import MapaRestaurante from "./component/Restaurante/MapaRestaurante";

const Mapa = withScriptjs(withGoogleMap(props =>
    <GoogleMap
        defaultZoom={16}
        defaultCenter={{ lat: props.latitude, lng: props.longitude }} >
        {   props.restaurantes.length > 0 &&
        props.restaurantes.map((restaurante, indice) => {
            return <Marker key={indice} position={restaurante}/>
        })
        }
    </GoogleMap>
));


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isGettingPosition: false,
            location: {},
            restaurantes: []
        };
    }

    /**
     * @description Get restaurantes proximos a localização definida.
     */
    async getRestaurantes(latitude = this.state.location.lat, longitude = this.state.location.lng) {
        const response = await axios.get(`http://localhost:3000/restaurantes/distancia?lat=${latitude}&lng=${longitude}`)
        this.alterState("restaurantes", response.data);
    }

    /**
     * @description Alter state de determine info in state.
     * @param chave
     * @param content
     */
    alterState(chave, content) {
        this.setState({ [chave]: content });
    }

    /**
     * @description Get position current of client access application.
     */
    getPositionCurrent() {
        navigator.geolocation.getCurrentPosition(async (position) => {
            this.alterState("isGettingPosition", true);
            this.alterState("location", { lat: position.coords.latitude, lng: position.coords.longitude});
            this.getRestaurantes();
        })
    }

    /**
     * @description Método do ciclo de vida do react. Executado após renderizar o componente.
     */
    componentDidMount() {
        this.getPositionCurrent();
    }

    render() {
        const { children } = this.props;
        return (
            <div>
                <Header />
                <div className="container">
                    <Switch>
                                <Route path="/restaurantes" component={ListaRestaurante} />
                        <Route path="/restaurantes/:lat/:lng" component={MapaRestaurante}></Route>
                    </Switch>
                </div>
            </div>
        );
    }
}

export default App;
