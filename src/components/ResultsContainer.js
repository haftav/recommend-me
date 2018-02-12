import React, { Component } from 'react';
import Result from './Result.js';
import { CSSTransition, TransitionGroup } from 'react-transition-group'

class ResultsContainer extends Component {
    constructor() {
        super();

        this.state = {
            resultList: [],
            imageList: []
        }
    }

    componentWillMount() {
        this.setState({ resultList: this.props.results })
    }

    render() {
        const images = this.props.results.map((el, idx) => {
                            return this.props.findImage(el.Name).then(image => {
                                return image  
                            })
                    })

        Promise.all(images).then(data => {
            this.setState({ imageList: data })
        })

        console.log(this.state.imageList);
        return (
                <div className="results-container">
                    <h3>SIMILAR RESULTS</h3>
                    <div className="results-display">
                    {
                        this.props.results.map((el, idx) => {
                            return (
                                <Result key={idx} 
                                        name={ el.Name } 
                                        type={ el.Type }
                                        image={this.state.imageList[idx]}
                                        onClick={this.props.onClick}/>
                            )
                        })
                    }

                    </div>

                </div>
        )
    }
}

export default ResultsContainer;