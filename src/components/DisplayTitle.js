import React from 'react';

var DisplayTitle = ( { title, text } ) => {

    return (
        <div className="display-title">
            <h2> { title } </h2>
            {/* <img src={ image } alt="" /> */}
            <p> { text } </p>
            <h3>Similar Results</h3>
        </div>
    )
}

export default DisplayTitle;