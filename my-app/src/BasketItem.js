import React from 'react'

function BasketItem(props) {
    return (
        <div>
            <p>
                {props.item.Name} &times; {props.item.quantity} - {props.item.Price.toLocaleString
                ("en-US", { style: "currency", currency: "GBP"})}
                <input 
                    type="checkbox" 
                    checked={props.item.checked} 
                    onChange={() => props.handleChangeCheckboxBasket(props.item.id)}
                />
                <label 
                    htmlFor="quantity"
                    className={props.item.displayQuantity ? "show" : "hide"}
                >Quantity: </label>
                <input 
                    type="number" 
                    id="quantity" 
                    value={props.item.removeQuantity}
                    className={props.item.displayQuantity ? "show" : "hide"}
                    name="quantity" 
                    min="0" 
                    max={props.item.quantity}
                    onChange={(event) => props.handleChangeNumberBasket(props.item.id, event)}
                ></input>
                <button
                    id="button"
                    className={props.item.displayQuantity ? "show" : "hide"}
                    name="button"
                    onClick={() => props.handleClickButtonBasket(props.item.id)}
                >Remove from basket</button>
                
            </p>    
        </div>
    )
}

export default BasketItem