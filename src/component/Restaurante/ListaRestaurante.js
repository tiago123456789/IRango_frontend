import React, { Component } from "react";
import RestauranteService from "./../../service/Restaurante";
import ButtonIcon from "./../template/ButtonIcon";
import { Link } from "react-router-dom";
import NoExistContent from "./NoExistContent";

export default class ListaRestaurante extends Component {

    constructor(props) {
        super(props);
        this.restauranteService = new RestauranteService();
        this.state = {
          restaurantes: []
        };
    }

    /**
     * @description Busca todos os restaurantes registrados.
     * @returns {Promise.<void>}
     */
    async getRestaurantes() {
        const restaurantes = await this.restauranteService.findAll();
        this.setState({ restaurantes: restaurantes });
    }

    /**
     * @description Executa algo depois do componente for renderizado.
     * @returns {Promise.<void>}
     */
    async componentDidMount() {
        this.getRestaurantes();
    }

    /**
     * @description Deleta um restaurante.
     * @param id
     * @returns {Promise.<void>}
     */
    async deletar(id) {
        await this.restauranteService.deletar(id);
        this.getRestaurantes();
    }

    /**
     * @description Faz listagem de restaurantes.
     * @returns {*}
     */
    montarListaRestaurantes() {
        const restaurantes = this.state.restaurantes;
        if (restaurantes.length == 0) {
            return <NoExistContent />;
        } else {
            return restaurantes.map((restaurante, indice) => {
                return (
                    <tr key={indice}>
                        <td>{restaurante._id}</td>
                        <td>{restaurante.name}</td>
                        <td>
                            <div className="btn-group">
                                <ButtonIcon btnClass="btn-danger"
                                            icon="trash"
                                            action={() => this.deletar(restaurante._id)}/>

                                <Link className="btn btn-sm btn-primary"
                                      to={`/restaurantes/${restaurante.loc.coordinates[1]}/${restaurante.loc.coordinates[0]}`} >
                                    <i className="fa fa-map-o"></i>
                                </Link>
                            </div>
                        </td>
                    </tr>
                )
            })
        }
    }

    render() {
        return (
            <div className="container">
                <h1>Restaurantes</h1>

                <Link to="/restaurantes/novo" className="btn btn-primary">
                    <i className="fa fa-plus"></i> &nbsp;
                    Novo Restaurante
                </Link>

                <div className="table-responsive">
                    <table className="table table-bordered table-striped text-center">
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
            </div>
        )
    }
}

