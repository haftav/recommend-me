import React from 'react';

var Rec = ( { name, text, title } ) => {

    return (
        <div>
            <h1>{ title }</h1>
            <h4>{ text }</h4>
            <h6>{ name }</h6>
        </div>
    )
}
export default Rec;


// Name
// Text
// Title
// Time (do later)