import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Header from './Header'
import Home from './Home';
import Order from './Order';
import {BrowserRouter as Router, Switch, Link, Route} from 'react-router-dom';

const axios = require('axios').default

export default class App extends Component {
    state = { user: { id: null, admin:false }, pizzas: {}, order: [] }

    componentDidMount(){
        this.getUser()
        axios.get(`/api/pizzas`).then((resp) => this.setState({pizzas: resp.data}))
    }

    getUser = async () => {
        let token = document.getElementById('app').dataset.token;
        if(token){
            axios.get(`/api/user?api_token=${token}`).then((resp) => this.setState({user: resp.data}))
        }
    }

    addToCart = (id) => {
        const item = this.state.order.reduce((acc, el) => {
            if(!el || el.id != id) return acc;
            return {id: id, quantity: acc.quantity + el.quantity}
        }, {id: id, quantity:1})
        let order = this.state.order.map((pizza) =>{ return pizza && pizza.id != item.id ? pizza : null})
        order.push(item)
        this.setState({order: order})
    }

    removeFromCart = (id) => {
        const order = this.state.order.map((item) => {
            if(!item || (item.id == id && item.quantity == 1)) return;
            if(item.id == id) item.quantity--;
            return item;
        })
        this.setState({order: order})
    }

    getFromCart = (id) => {
        let item = this.state.order.filter((pizza) => (pizza && pizza.id == id));
        return item;
    }

    constructor(props){
        super(props);
        this.addToCart = this.addToCart.bind(this)
    }

    render() {
        const {id, admin} = this.state.user
        return (
            <Router>
                <Header user={id} admin={admin} cart={this.state.order} />

                <Switch>
                   <Route path='/' exact render={() => <Home pizzas={this.state.pizzas.data} add={this.addToCart} />} /> 
                   <Route path='/cart' exact render={() => <Order order={this.state.order} add={this.addToCart} remove={this.removeFromCart} getPizza={this.getFromCart} />} /> 
                </Switch>
                
            </Router>
        );
    }
}

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
