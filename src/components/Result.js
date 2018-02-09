import React from 'react';

var Result = ( { name, type, onClick } ) => {

    return (
        <a href='#' onClick={onClick} value={ name }>
            <h3> { name } </h3>
            <p> { type } </p>
        </a>
    )
}

export default Result;