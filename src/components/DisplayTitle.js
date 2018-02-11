import React from 'react';

var DisplayTitle = ( { title, text, image } ) => {

    return (
        <div className="display-title">
            <h2> { title } </h2>
            <img src={ image } alt={ title } />
            <div></div>
            <p> { text } </p>
        </div>
    )
}

export default DisplayTitle;