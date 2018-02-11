import React from 'react';

var Result = ( { name, type, onClick } ) => {

    return (
        <a className="result" href='#' onClick={() => onClick(name)} value={ name }>
            {/* <img src={ image } alt={ name } /> */}
            <h3> { name } </h3>
            {/* <p> { type } </p> */}
        </a>
    )
}

export default Result;