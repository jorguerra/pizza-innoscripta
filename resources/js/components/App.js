import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Header from './Header'
import Home from './Home';
const axios = require('axios').default

export default class App extends Component {
    state = { user: { id: null, admin:false }, pizzas: {} }

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

    render() {
        const {id, admin} = this.state.user
        return (
            <div>
                <Header user={id} admin={admin} />

                <Home pizzas={this.state.pizzas.data} />
            </div>
        );
    }
}

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
