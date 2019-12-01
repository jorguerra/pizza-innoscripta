import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Header from './Header'
import Home from './Home';
import Order from './Order';
import OrderForm from './OrderForm'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

const axios = require('axios').default

export default class App extends Component {
    state = { user: { id: null, admin:false }, pizzas: {}, order: [] }

    componentDidMount(){
        this.getUser()
        axios.get(`/api/pizzas`).then((resp) => this.setState({pizzas: resp.data}))
        if(window.localStorage.getItem('quantity')){
            let order = [];
            for(let i = 0; i < window.localStorage.getItem('quantity'); i++){
                try{
                   order.push(JSON.parse(window.localStorage.getItem(`item${i}`))) 
                }catch(e){}
            }
            this.setState({order: order})
            window.localStorage.clear(); 
        }
    }

    getUser = async () => {
        let token = document.getElementById('home').dataset.token;
        if(token){
            axios.get(`/api/user?api_token=${token}`).then((resp) => {
                resp.data.token = token;
                this.setState({user: resp.data});
            })
        }
    }

    addToCart = (id) => {
        let item = this.state.order.reduce((acc, el) => {
            if(!el || el.id != id) return acc;
            return {id: id, quantity: acc.quantity + el.quantity}
        }, {id: id, quantity:1});
        if(!item.info){
            item.info = this.getInfoPizza(id)
        }
        let order = this.state.order.map((pizza) =>{ 
            if (pizza && pizza.id != item.id ){
                pizza.info = this.getInfoPizza(pizza.id);
                return pizza;
            }
            return null
        }).filter((obj) => obj != null);
        order.push(item);
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
        const item = this.state.order.filter((pizza) => (pizza && pizza.id == id));
        return item.length ? item[0] : null;
    }

    getInfoPizza = (id) => {
        const pizza = this.state.pizzas.data.filter((p) => p.id == id);
        return pizza.length ? pizza[0] : null
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
                   <Route path='/cart' exact render={() => <Order order={this.state.order} get={this.getFromCart} user={this.state.user.id} add={this.addToCart} remove={this.removeFromCart}  />} /> 
                   <Route path="/order" render={() => <OrderForm order={this.state.order} get={this.getFromCart} user={this.state.user} />} />
                </Switch>
                
            </Router>
        );
    }
}

if (document.getElementById('home')) {
    ReactDOM.render(<App />, document.getElementById('home'));
}
