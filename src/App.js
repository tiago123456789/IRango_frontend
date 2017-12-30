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
import NovoRestaurante from "./component/Restaurante/NovoRestaurante";
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

    render() {
        const { children } = this.props;
        return (
            <div>
                <Header />
                <br/>
                <div className="container">
                    <Switch>
                        <Route exact path="/restaurantes" component={ListaRestaurante} />
                        <Route exact path="/restaurantes/novo" component={NovoRestaurante} />
                        <Route path="/restaurantes/:lat/:lng" component={MapaRestaurante}></Route>
                        <Route path="/" component={MapaRestaurante}></Route>
                        <Route path="*" component={MapaRestaurante}></Route>
                    </Switch>
                </div>
            </div>
        );
    }
}

export default App;
