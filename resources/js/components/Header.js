import React, { Component } from 'react';
const axios = require('axios').default;

export default class Header extends Component {

    logout(){
        axios.post('/logout').then(() => {
            document.location.href = '/';
        })
    }

    render() {

        return (
            <nav className="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light" id="ftco-navbar">
                <div className="container">
                    <a className="navbar-brand" href="/"><span className="flaticon-pizza-1 mr-1"></span>Pizza<br/><small>Delicous</small></a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="oi oi-menu"></span> Menu
                    </button>
                    <div className="collapse navbar-collapse" id="ftco-nav">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item active"><a href="/" className="nav-link">Home</a></li>

                            <li className="nav-item">
                                <a href={this.props.user ? '#' : '/login'} className="nav-link"
                                    onClick={this.props.user ? this.logout : null}>{this.props.user ? 'Logout' : 'Login'}</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

