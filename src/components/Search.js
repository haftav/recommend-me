import React, { Component } from 'react';
import 'font-awesome/css/font-awesome.min.css';

class Search extends Component {
    
    render() {
        return (
            <div className="search">
                <span className="icon"><i className="fa fa-search"></i></span>
                <input
                        type="search" 
                        placeholder="Search..."
                        value={this.props.name}
                        onChange={(e) => this.props.handleSearchChange(e.target.value)}
                        onKeyPress={(e) => this.props.handleKeyPress(e, this.props.name)}/>
                {/* <button onClick={() => this.props.handleClick(this.props.name)}><i className="fa fa-search"></i></button>  */}
            </div>
        )
    }
}

export default Search;

