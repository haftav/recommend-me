import React, { Component } from 'react';
import 'font-awesome/css/font-awesome.min.css';

class Search extends Component {
    
    render() {
        return (
            <div className="search">
                <input placeholder="Name" onChange={(e) => this.props.handleSearchChange(e.target.value)}/>
                <button onClick={() => this.props.handleClick(this.props.name)}><i className="fa fa-search"></i></button> 
            </div>
        )
    }
}

export default Search;