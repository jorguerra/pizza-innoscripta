import React from 'react';
const axios = require('axios').default

export default class ManagePizza extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            pizzas: [],
        }
        this.token = document.getElementById('home').dataset.token
    }
    componentDidMount(){
        axios.get(`/api/pizzas?apit_token=${this.token}`).then((resp) => this.setState({pizzas: resp.data.data}))
    }
    addPizza(e){
        e.preventDefault();
        const query = `api_token=${this.token}&` + $('#pizza-form').serialize();
        let pizzas = this.state.pizzas;
         axios.post(`/api/pizzas?${query}`).then((pizza) => {
            pizzas.push(pizza.data);
        })
        e.target.reset();
        this.setState({pizzas: pizzas})

    }
    
    render(){
        const {pizzas} = this.state
        return (
            <section className="ftco-section contact-section">
                <div className="container mt-5">
                    <div className="row block-9">
                        <div className="col-md-12 ftco-animate fadeInUp ftco-animated">
                            <form action="" onSubmit={this.addPizza.bind(this)}  className="contact-form" id="pizza-form"><div className="row">
                                <div className="form-group col-md-3 ">
                                    <input type="text" name="pizza[name]" className="form-control" placeholder="Name" />
                                </div>
                                <div className="form-group col-md-7 ">
                                    <input required type="text" name="pizza[description]" className="form-control" placeholder="Description" />
                                </div>
                                <div className="form-group col-md-1 ">
                                    <input required type="number" min="5" step="0.01" name="pizza[price]" className="form-control" placeholder="Price" />
                                </div>
                                <div className=" col-md-1 ">
                                    <input style={{bottom: '19px', position: 'absolute'}} type="submit" value="Add new" className="btn btn-primary btn-sm" />
                                </div>
                            </div></form>
                        </div>
                    </div>
                    <div className="row" style={{borderBottom: '1px solid white'}}>
                        <div className="col-md-1"><strong>Id</strong></div>
                        <div className="col-md-2"><strong>Name</strong></div>
                        <div className="col-md-7"><strong>Description</strong></div>
                        <div className="col-md-1"><strong>Price</strong></div>
                    </div>
                    {pizzas.map((pizza, index) =>
                        <div key={index} className="row">
                            <div className="col-md-1">{pizza.id}</div>
                            <div className="col-md-2">{pizza.name}</div>
                            <div className="col-md-7">{pizza.description}</div>
                            <div className="col-md-1">${pizza.price}</div>
                            <div className="col-md-1"></div>
                        </div>
                    )}
                </div>
            </section>  
        )
    }
}