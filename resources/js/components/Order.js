import React, { Component } from 'react';
import {Link} from 'react-router-dom';
axios = require('axios').default;

export default class Cart extends Component{
    constructor(props){
        super(props)
        this.state = {pizzas: []}
    }

    componentDidMount(){
        this.props.order.map((pizza) => {
            if(!pizza) return;
            axios.get(`/api/pizzas/${pizza.id}`).then((resp) => {
                pizza.info = resp.data;
                pizza.style = {backgroundImage: `url(${resp.data.photo})`}
                this.setState((prevState) => ({pizzas: [pizza, ...prevState.pizzas] }))
            })
        })
    }

    render(){
        return (
            <section className="ftco-section">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-7 heading-section text-center ftco-animate fadeInUp ftco-animated"> 
                            <h2 className="mb-4">My Order</h2>
                            <p className="flip">
                                <span className="deg1"></span>
                                <span className="deg2"></span>
                                <span className="deg3"></span>
                            </p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            {this.state.pizzas.map((pizza, index) => 
                                <div key={pizza.id} className="pricing-entry d-flex ftco-animate fadeInUp ftco-animated">
                                    <div className="img" style={pizza.style}></div>
                                    <div className="desc pl-3">
                                        <div className="d-flex text align-items-center">
                                            <h3><span>{pizza.quantity} x {pizza.info.name}</span></h3>
                                            <span className="price">${pizza.info.price}</span>
                                        </div>
                                        <div className="d-block order">
                                            Quantity: {pizza.quantity}
                                            <div className="float-right">
                                            <Link to='#' className="text-primary" onClick={this.props.add.bind(this, pizza.id)}>+</Link>
                                            <Link to='#' className="text-danger" onClick={this.props.remove.bind(this, pizza.id)}>x</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}


