import React from 'react'
import './index.css'

function Item(props) {
    return (
        <div className={props.item.displayItem ? "shop-item-show" : "shop-item-hide"}>
            <h2>{props.item.Name}</h2>
            <br />
            <div className="item-p">
                <span>{props.item.Price.toLocaleString
                ("en-US", { style: "currency", currency: "GBP"})} - {props.item.Tagline}</span>
                <input 
                    type="checkbox" 
                    checked={props.item.checked} 
                    onChange={() => props.handleChangeCheckbox(props.item.Id)}
                />
                <label 
                    htmlFor="quantity"
                    className={props.item.displayQuantity ? "show" : "hide"}
                >Quantity: </label>
                <input 
                    type="number" 
                    id="quantity" 
                    value={props.item.quantity}
                    className={props.item.displayQuantity ? "show" : "hide"}
                    name="quantity" 
                    min="0" 
                    max="99"
                    onChange={(event) => props.handleChangeNumber(props.item.Id, event)}
                ></input>
                <button
                    id="button"
                    className={props.item.displayQuantity ? "show" : "hide"}
                    name="button"
                    onClick={() => props.handleClickButton(props.item.Id)}
                >Add to basket</button>
            </div>
        </div>
    )
}

export default Item