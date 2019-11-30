import React, {Component} from 'react';

class Pizza extends Component{
    render(){
        const {photo, name, description, price} = this.props
        return (
            <div className="col-lg-4 d-flex ftco-animate fadeInUp ftco-animated">
                <div className="services-wrap d-flex">
                    <a href="#" className="img" style={{backgroundImage: 'url('+photo+')'}}>&nbsp;</a>
                    <div className="text p-4">
                        <h3>{name}</h3>
                        <p>{description}</p>
                        <p className="price"><span>${price}</span> 
                            <a href="#" className="ml-2 btn btn-white btn-outline-white">Order</a>
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}

export default class Home extends Component{
    render(){
        const pizzas= this.props.pizzas || [];
        return (
            <section className="ftco-section">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-7 heading-section ftco-animate text-center fadeInUp ftco-animated">
                            <h2 className="mb-4">HOT PIZZA MEALS AT INNOSCRIPTA</h2>
                            <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
                        </div>
                    </div>
                </div>
                <div className="container-wrap">
                    <div className="row no-gutters d-flex">
                    {pizzas.map((pizza) => 
                        <Pizza key={pizza.id} photo={pizza.photo} name={pizza.name} description={pizza.description} price={pizza.price} />
                    )}
                    </div>
                </div>
            </section>
            
        )
    }
}