import React from "react";

export default (props) => (
    <button className={`btn btn-sm ${props.btnClass}`} onClick={props.action} >
        <i className={`fa fa-${props.icon}`}></i>
        { props.text }
    </button>
);