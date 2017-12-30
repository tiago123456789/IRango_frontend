import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
} from "react-google-maps";
import React from "react";

const Mapa = withScriptjs(withGoogleMap(props => (
    <GoogleMap defaultZoom={15}
               defaultCenter={{ lat: props.location.lat, lng: props.location.lng }}
               onDraggableChanged={() => console.log("change position!!!")} >
        {   props.restaurantes &&
            props.restaurantes.map((restaurante, indice) => (<Marker key={indice} position={restaurante}/>))
        }
        {props.children}
    </GoogleMap>
)));

export default Mapa;