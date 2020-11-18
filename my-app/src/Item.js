import React from 'react'
import './index.css'

function Item(props) {
    return (
        <div className="shop-item">
            <h2>{props.item.Name}</h2>
            <br />
            <div className="item-p">
                <span>{props.item.Price.toLocaleString
                ("en-US", { style: "currency", currency: "GBP"})} - {props.item.Tagline}</span>
                <input 
                    type="checkbox" 
                    checked={props.item.completed} 
                    onChange={() => props.handleChangeCheckbox(props.item.Id)}
                />
                <label 
                    for="quantity"
                    className={props.item.displayQuantity ? "show" : "hide"}
                >Quantity: </label>
                <input 
                    type="number" 
                    id="quantity" 
                    value={props.item.quantity}
                    className={props.item.displayQuantity ? "show" : "hide"}
                    name="quantity" 
                    min="1" 
                    max="99"
                    onChange={(event) => props.handleChangeNumber(props.item.Id, event)}>
                </input>
            </div>
        </div>
    )
}

export default Item