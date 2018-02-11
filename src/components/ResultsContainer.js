import React, { Component } from 'react';
import Result from './Result.js';
import { CSSTransition, TransitionGroup } from 'react-transition-group'

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
                    })
        return (
                <div className="results-container">
                    <h3>SIMILAR RESULTS</h3>
                    <div className="results-display">
                        { results }
                    </div>

                </div>
        )
    }
}

export default ResultsContainer;