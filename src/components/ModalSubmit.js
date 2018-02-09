import React from 'react';

var ModalSubmit = ( { handleTextChange, handleNameChange, name } ) => {
    return (
        <div>
            <h2> { name } </h2>
            <input placeholder="text" onChange={(e) => handleTextChange(e.target.value) }/> 
            <h4>Name</h4>
            <input placeholder="name" onChange={(e) => handleNameChange(e.target.value) }/>
            <h2><button>Submit</button></h2>
        </div>        
    )
}

export default ModalSubmit;