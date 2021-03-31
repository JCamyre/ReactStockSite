import React, { Component } from 'react';

export default class Stock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stock: 'None',
        };
        // Get ticker after clicking stock link from search_results page. localhost:8000/stock/TSM. this.ticker = TSM
        this.ticker = this.props.match.params.roomCode;

    }

    getStockDetails() {
        fetch('/api/get-stock' + '?ticker=' + this.ticker)
            .then((response) => response.json())
            .then((data) => {
                this.setState({
                    stock: data.stock,
                })
            });
        }
}