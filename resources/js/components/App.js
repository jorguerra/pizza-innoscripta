import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Header from './Header'
const axios = require('axios').default

export default class App extends Component {
    constructor(props){
        super(props);
        this.state = { user: { id: null, admin:false } }
    }

    componentDidMount(){
        this.getUser()
    }

    getUser = async () => {
        let token = document.getElementById('app').dataset.token;
        if(token){
            axios.get(`/api/user?api_token=${token}`).then((resp) => { this.setState({user: resp.data}) })
        }
    }


    render() {
        return (
            <div>
                <Header user={this.state.user.id} admin={this.state.user.admin} />
            </div>
        );
    }
}

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
