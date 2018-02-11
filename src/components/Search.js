import React, { Component } from 'react';

class Search extends Component {
    
    render() {
        return (
            <div>

                <input placeholder="Name" onChange={(e) => this.props.handleSearchChange(e.target.value)}/>
                <button onClick={() => this.props.handleClick(this.props.name)}> {this.props.buttonText} </button> 
            </div>
        )
    }
}

export default Search;