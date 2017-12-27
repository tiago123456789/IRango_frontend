import React, { Component } from 'react';
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
} from "react-google-maps";
import axios from "axios";
import logo from './logo.svg';
import './App.css';

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
        if (!this.state.isGettingPosition) {
            return <p>Getting position current...</p>
        } else {
            return (
                <div className="App">
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo" />
                        <h1 className="App-title">Projeto iRango  {this.state.counter}</h1>
                        <button onClick={() => this.getRestaurantesProximos(this.state.location.lat, this.state.location.lng)}>Atualizar Restaurantes</button>
                    </header>
                    <section className="content">
                        <Mapa
                            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBwPZx8_pg7flVJoWvxIf8lq0Z4oLOuwPY"
                            loadingElement={<div style={{ height: `100%` }} />}
                            containerElement={<div style={{ height: `400px` }} />}
                            mapElement={<div style={{ height: `100%` }} />}
                            latitude={this.state.location.lat}
                            longitude={this.state.location.lng}
                            restaurantes={this.state.restaurantes}
                        >
                        </Mapa>
                    </section>
                 </div>
            );
        }
    }
}

export default App;
