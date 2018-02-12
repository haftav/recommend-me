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
                            // return this.props.findImage(el.Name).then(image => {
                                return (
                                    <Result key={idx} 
                                            name={ el.Name } 
                                            type={ el.Type }
                                            // image={ image }
                                            onClick={this.props.onClick}/>
                                )      
                            // })
                    })

        // Promise.all(results).then(res => {
        //     console.log(JSON.stringify(res));
        // })
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