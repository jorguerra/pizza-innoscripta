import React, { Component } from 'react';
import {Link} from 'react-router-dom';
const axios = require('axios').default;

export default class Header extends Component {

    logout(){
        axios.post('/logout').then(() => {
            document.location.href = '/';
        })
    }

    render() {
        const num_cart = this.props.cart.reduce((acc, pizza) => {
            if (!pizza) return acc;
            return acc + pizza.quantity
        }
        ,0);
        let txt_cart = 'No pizzas yet';
        if(num_cart)
            txt_cart = `${num_cart} pizza` + (num_cart > 1 ? 's':'')
        
        return (
            <nav className="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light" id="ftco-navbar">
                <div className="container">
                    <Link className="navbar-brand" to="/"><span className="flaticon-pizza-1 mr-1"></span>Pizza<br/><small>Delicous</small></Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="oi oi-menu"></span> Menu
                    </button>
                    <div className="collapse navbar-collapse" id="ftco-nav">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item active"><Link to="/" className="nav-link">Home</Link></li>
                            <li className="nav-item">
                                <Link to="/cart" className="nav-link">Cart <small>({txt_cart})</small></Link></li>
                            <li className="nav-item">
                                <a href={this.props.user ? null : '/login'} className="nav-link"
                                    onClick={this.props.user ? this.logout : null}>{this.props.user ? 'Logout' : 'Login'}</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

