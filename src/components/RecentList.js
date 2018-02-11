import React, { Component} from 'react';
import axios from 'axios';
import { link } from 'fs';

class RecentList extends Component {
    constructor() {
        super();

        this.state = {
            list: []
        }
    }

    componentWillReceiveProps(newProps) {
        console.log(newProps);
        let newList = this.state.list;
        if ((newProps.name !== this.props.name && !newList.includes(newProps.name))  &&
            newProps.name !== "") {
            if (newList.length >= 10) {
                newList.pop();
            }
            newList.unshift(newProps.name);
            this.setState({ list: newList })
        }
    } 

    render() {
        var recents = this.state.list.map((el, idx) => {
            return (
                <li key={idx} onClick={() => this.props.handleClick(el)}>{ el }</li>
            ) 
        })
        console.log('recents: ' + recents);
        return (
            <div className="recent-list">
                <h2>Recent Searches</h2>
                {/* <ul>
                    <li>The Room</li>
                    <li>Star Wars</li>
                    <li>Harry Potter</li>
                    <li>Lord of the Rings</li>
                    <li>It</li>
                </ul> */}
                <ul>
                    <div>
                        { recents }
                    </div>

                </ul>
            </div>
        )
    }
}

export default RecentList;