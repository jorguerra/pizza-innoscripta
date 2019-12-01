import React, { Component } from 'react';
import {Link} from 'react-router-dom';
axios = require('axios').default;

class Item extends Component {
    state = {}
    constructor(props){
        super(props)
        this.state = {
            add: props.add.bind(this, props.pizza.id),
            remove: props.remove.bind(this, props.pizza.id),
        }
    }
    
    render(){
        const pizza = this.props.pizza;
        return (
            <div className="pricing-entry d-flex">
                <div className="img" style={pizza.style}></div>
                <div className="desc pl-3">
                    <div className="d-flex text align-items-center">
                        <h3><span>{pizza.quantity} x {pizza.info.name}</span></h3>
                        <span className="price">${pizza.info.price}</span>
                    </div>
                    <div className="d-block order">
                        Quantity: {pizza.quantity}
                        <div className="float-right">
                        <Link to='#' className="text-primary" onClick={this.state.add}>+</Link>
                        &nbsp;&nbsp;&nbsp;
                        <Link to='#' className="text-danger" onClick={this.state.remove}>-</Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default class Cart extends Component{
    state = {pizzas: [], qty: []}

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
                    <div className="row justify-content-center" style={{marginBottom: '3em'}}>
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
                        {this.state.pizzas.map((pizza, index) =>
                            <div key={index} className="col-md-6">
                                <Item pizza={pizza}
                                    remove={this.props.remove.bind(this, pizza.id)}
                                    add={this.props.add.bind(this, pizza.id)} 
                                />
                            </div>
                        )}
                    </div>
                </div>
            </section>
        )
    }
}


