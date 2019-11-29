import React, { Component } from 'react';
import ReactDOM from 'react-dom';
const axios = require('axios').default;

export default class Header extends Component {
    constructor(props){
        super(props);
        this.state = {
            link_sesion: props.user ? 'javascript:void(0)' : '/login',
            text_sesion: props.user ? 'Logout' : 'Login',
            onclick_sesion: props.user ? this.logout : null,
        }
    }
    render() {
        function logout(){
            axios.post('/logout');
        }
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
                            <li className="nav-item"><a href="#" className="nav-link">Menu</a></li>
                            <li className="nav-item"><a href="#" className="nav-link">Services</a></li>
                            <li className="nav-item"><a href="#" className="nav-link">Blog</a></li>
                            <li className="nav-item"><a href="#" className="nav-link">About</a></li>
                            <li className="nav-item"><a href="#" className="nav-link">Contact</a></li>
                            <li className="nav-item"><a href={this.state.link_sesion} className="nav-link" onClick={this.state.onclick_sesion}>{this.state.text_sesion}</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

if (document.getElementById('example')) {
    ReactDOM.render(<Example />, document.getElementById('example'));
}
