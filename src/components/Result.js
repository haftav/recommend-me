import React from 'react';

var Result = ( { name, type, image, onClick } ) => {

    return (
        <div className="result" href='#' onClick={() => onClick(name)} value={ name }>
            <img src={ image } alt={ name } className="result-image"/>
            <h3> { name } </h3>
            {/* <p> { type } </p> */}
        </div>
    )
}

export default Result;