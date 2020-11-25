import React from 'react'
import './index.css'

function CheckoutItem(props) {
    return (
        <p>{props.item.Name} &times; {props.item.quantity} - {props.item.Price.toLocaleString
            ("en-US", { style: "currency", currency: "GBP"})}</p>
    )
}

export default CheckoutItem