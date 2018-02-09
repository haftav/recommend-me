import React, { Component } from 'react';
import Result from './Result.js';

class ResultsContainer extends Component {
    constructor() {
        super();

        this.state = {
            resultList: []
        }
    }

    componentWillMount() {
        this.setState({ resultList: this.props.results })
    }

    render() {
        const results = this.props.results.map((el, idx) => {
            return (
                <Result key={idx} 
                        name={ el.Name } 
                        type={ el.Type } 
                        onClick={this.props.onClick}/>
            )
        });
        return (
            <div>
                { results }
            </div>
        )
    }
}

export default ResultsContainer;