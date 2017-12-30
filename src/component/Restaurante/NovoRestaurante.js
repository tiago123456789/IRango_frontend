import React, {Component} from "react";
import Mapa from "./../GoogleMaps";
import { Marker } from "react-google-maps";

export default class NovoRestaurante extends Component {


    getPosicao() {
        console.log("Change position")
    }

    render() {
        return (
            <div>
                <h1>Novo Restaurante</h1>
                <form>
                    <input type="hidden" name="lat" id="lat"/>
                    <input type="hidden" name="lng" id="lng"/>

                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Nome Restaurante"/>
                    </div>

                    <Mapa
                        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBb1PiYCFMEM83jLuemPPB8aJG-StirN9U"
                        loadingElement={<div style={{ height: `100%` }} />}
                        containerElement={<div style={{ height: `500px` }} />}
                        mapElement={<div style={{ height: `100%` }} />}
                        location={{lat: -15.75446, lng: -49.335137}}
                    >
                        <Marker position={{lat: -15.75446, lng: -49.335137}}
                                draggable={true} />
                    </Mapa>


                    <div className="form-group">
                        <input type="submit" className="btn btn-primary" value="Save"/>
                    </div>
                </form>
            </div>
        )
    }
}