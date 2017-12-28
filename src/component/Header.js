import React from "react";
import { Link } from "react-router-dom";

export default () => (
    <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
        <ul class="navbar-nav">
            <li class="nav-item active">
                <Link class="nav-link" to="/">IRango</Link>
            </li>
            <li class="nav-item">
                <Link class="nav-link" to="/restaurantes">Restaurantes</Link>
            </li>
        </ul>
    </nav>
)

