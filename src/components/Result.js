import React from 'react';

var Result = ( { name, type, image, onClick } ) => {

    return (
        <div className="result" href='#' value={ name }>
            <img src={ image } alt={ name } onClick={() => onClick(name)} className="result-image"/>
            <h3> { name } </h3>
            {/* <p> { type } </p> */}
        </div>
    )
}

export default Result;