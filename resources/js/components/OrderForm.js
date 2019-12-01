import React from 'react';

export default class Form extends React.Component {
    render(){
        return (
            <section className="ftco-section contact-section">
                <div className="container mt-5">
                    <div className="row block-9">
                        <div className="col-md-4 contact-info ftco-animate fadeInUp ftco-animated">
                            <div className="row">
                                <div className="col-md-12 mb-4"><h2 className="h4">Your current order</h2></div>
                            </div>
                            {this.props.order.map((pizza) =>{
                                const order = pizza ? this.props.get.bind(this, pizza.id)() : null;
                                return (
                                    order ? 
                                    <div key={pizza.id} className="col-md-12 mb-3">
                                        <p><span>{order.quantity} {order.info.name}</span></p>
                                    </div> 
                                    : ''
                                )
                            })}    
                        </div>
                        <div className="col-md-1"></div>
                        <div className="col-md-6 ftco-animate fadeInUp ftco-animated">
                            <form action="#" className="contact-form">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <input type="text" name="street_line1" className="form-control" placeholder="Street line 1" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <input type="text" name="street_line2" className="form-control" placeholder="Street line 2" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <input type="text" name="zip_code" className="form-control" placeholder="Zip code" />
                                </div>
                                <div className="form-group">
                                    <input type="text" name="mobile_phone" className="form-control" placeholder="Mobile phone" />
                                </div>
                                <div className="form-group">
                                    <input type="submit" value="Send Message" className="btn btn-primary py-3 px-5" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>            
        )
    }
}