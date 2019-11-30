import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Header from './Header'
import Home from './Home';
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
            if(el.id == id)
                return {id: id, quantity: acc.quantity + el.quantity}
            return acc;
        }, {id: id, quantity:1})
        let order = this.state.order.map((pizza) =>{ return pizza.id != item.id ? pizza : null})
        order.push(item)
        this.setState({order: order})
    }

    constructor(props){
        super(props);
        this.addToCart = this.addToCart.bind(this)
    }

    render() {
        const {id, admin} = this.state.user
        return (
            <div>
                <Header user={id} admin={admin} />

                <Home pizzas={this.state.pizzas.data} add={this.addToCart} />
            </div>
        );
    }
}

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
