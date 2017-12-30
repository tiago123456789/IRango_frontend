import React, {Component} from 'react';
import Header from "./component/template/Header";
import {Route, Switch} from "react-router-dom";
import ListaRestaurante from "./component/Restaurante/ListaRestaurante";
import NovoRestaurante from "./component/Restaurante/NovoRestaurante";
import MapaRestaurante from "./component/Restaurante/MapaRestaurante";

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
