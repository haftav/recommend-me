import React from 'react';

var Result = ( { name, type } ) => {

    return (
        <div>
            <h3> { name } </h3>
            <p> { type } </p>
        </div>
    )
}

export default Result;