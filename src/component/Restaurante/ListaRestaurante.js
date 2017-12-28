import React, { Component } from "react";
import RestauranteService from "./../../service/Restaurante";
import { Link } from "react-router-dom";

export default class ListaRestaurante extends Component {

    constructor(props) {
        super(props);
        this.restauranteService = new RestauranteService();
        this.state = {
          restaurantes: []
        };
    }

    async getRestaurantes() {
        const restaurantes = await this.restauranteService.findAll();
        this.setState({ restaurantes: restaurantes });
    }

    async componentDidMount() {
        this.getRestaurantes();
    }

    async deletar(id) {
        await this.restauranteService.deletar(id);
        this.getRestaurantes();
    }

    montarListaRestaurantes() {
        const restaurantes = this.state.restaurantes;
        return restaurantes.map((restaurante, indice) => {
            return (
                <tr key={indice}>
                    <td>{restaurante._id}</td>
                    <td>{restaurante.name}</td>
                    <td>
                        <button
                                onClick={() => this.deletar(restaurante._id)} className="btn btn-sm btn-danger">
                            <i className="fa fa-trash"></i>
                        </button>
                        <Link className="btn btn-sm btn-primary"
                              to={`/restaurantes/${restaurante.loc.coordinates[1]}/${restaurante.loc.coordinates[0]}`} >
                            <i className="fa fa-map-o"></i>
                        </Link>
                    </td>
                </tr>
            )
        })
    }

    render() {
        return (
            <div className="container">
                <h1>Restaurantes</h1>
                <table className="table table-bordered table-striped">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Nome</th>
                        <th>Ações</th>
                    </tr>
                    </thead>
                    <tbody>
                        { this.montarListaRestaurantes() }
                    </tbody>
                </table>
            </div>
        )
    }
}

