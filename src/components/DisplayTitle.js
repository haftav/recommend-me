import React from 'react';
 // ES6

var DisplayTitle = ( { title, text, image, shouldDisplay } ) => {

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