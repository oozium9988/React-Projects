import React from 'react'
import './index.css'

function Item(props) {
    return (
        <div className="shop-item">
            <h2>{props.item.Name}</h2>
            <p>{props.item.Price.toLocaleString
            ("en-US", { style: "currency", currency: "GBP"})} - {props.item.Tagline}
            <input type = "checkbox" /></p>
        </div>
    )
}

export default Item