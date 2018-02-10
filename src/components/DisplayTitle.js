import React, { Component } from 'react';

var DisplayTitle = ( { title, text } ) => {

    return (
        <div className="display-title">
            <h2> { title } </h2>
            {/* <img src={ image } alt="" /> */}
            <p> { text } </p>

        </div>
    )
}

export default DisplayTitle;