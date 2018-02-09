import React, { Component } from 'react';

class Search extends Component {
    
    render() {
        return (
            <div>
                <select onChange={(e) => this.props.handleType(e.target.value)}>
                <option value="all">Any</option>
                <option value="music">Music</option>
                <option value="movies">Movies</option>
                <option value="shows">Shows</option>
                <option value="books">Books</option>
                <option value="authors">Authors</option>
                <option value="games">Games</option>
                </select>
                <input placeholder="Name" onChange={(e) => this.props.handleSearchChange(e.target.value)}/>
                <button onClick={this.props.handleClick}> {this.props.buttonText} </button> 
            </div>
        )
    }
}

export default Search;