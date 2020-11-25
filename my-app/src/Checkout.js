import React, {Component} from 'react'
import './index.css'
import { Link } from 'react-router-dom'
import CheckoutItem from './CheckoutItem'

class Checkout extends Component {
    constructor() {
        super()

        this.state = {
            clicked: false,
            totalPrice: 0
        }

        this.handleClick = this.handleClick.bind(this)
    }

    componentDidMount() {
        const basket = JSON.parse(localStorage.getItem('basket'))
        let prc = 0
        for (var i = 0; i < basket.length; i++) {
            prc += basket[i].Price
        }

        this.setState({
            totalPrice: prc
        })
    }

    handleClick() {
        const empty=[]
        localStorage.setItem('basket', JSON.stringify(empty))

        this.setState({
            clicked: true
        })                 
    }

    render() {
        const basket = JSON.parse(localStorage.getItem('basket'))

        const checkoutItems = basket.map(item =>
            <CheckoutItem
              key = {item.id}
              item = {item}
            />
        )

        return (
            <div className="item-list">
                <div className={this.state.clicked ? "checkout-hide" : ""}>
                    {checkoutItems}
                    <h3>Total Price: {this.state.totalPrice.toLocaleString
                    ("en-US", { style: "currency", currency: "GBP"})}</h3>
                    <button onClick={() => this.handleClick()}>Confirm Purchase</button>
                </div>
                <div className={this.state.clicked ? "" : "checkout-hide"}>
                    <p>Congratulations, you just spent {this.state.totalPrice.toLocaleString
                    ("en-US", { style: "currency", currency: "GBP"})} on random things!</p>
                </div>
                <br />
                <Link to="/">
                    <button>Go back to shopping page</button>
                </Link>
            </div>
        )
    }
}

export default Checkout