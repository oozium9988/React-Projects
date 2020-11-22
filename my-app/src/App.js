import React, {Component} from 'react'
import Item from'./Item'
import './index.css'
//import _ from 'lodash'

class App extends Component {
  constructor() {
    super()

    this.state = {
      Items: [],
      basket: {}
    }

    this.handleChangeCheckbox = this.handleChangeCheckbox.bind(this)
    this.handleChangeNumber = this.handleChangeNumber.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    fetch("https://onlineshoprestapi20201118203846.azurewebsites.net/api/Item")
      .then(response => response.json())
      .then(data => {
        for (var i = 0; i < data.length; i++) {
          data[i].completed = false
          data[i].quantity = 0
          data[i].displayQuantity = false
        }
        const basketStorage = JSON.parse(localStorage.getItem('basket'))

        this.setState ({
          Items: data,
        })

        if (basketStorage !== null) {
          this.setState({
            basket: basketStorage
          })
        }
      })
  }

  handleChangeCheckbox(id) {
    this.setState(prevState => {
      const updatedItems = prevState.Items.map(item => {
        if (item.Id === id) {
          item.completed = !item.completed
          item.displayQuantity = !item.displayQuantity
        }
        return item
      })
      return {
        Items: updatedItems
      }
    })
  }

  handleChangeNumber(id, event) {
    this.setState(prevState => {
      const updatedItems = prevState.Items.map(item => {
        if (item.Id === id) {
          item.quantity = event.target.value
        }
        return item
      })
      return {
        Items: updatedItems
      }
    })
  }

  handleClick() {
    this.setState(prevState => {
      let updatedBasket = Object.assign({}, prevState.basket);
      const prevItems = prevState.Items;
      for (var i = 0; i < prevState.Items.length; i++) {
        const it = prevItems[i];
        if (it.completed && it.quantity > 0) {
          if (updatedBasket.hasOwnProperty(it.Name)) {
            updatedBasket[it.Name][0] += (+it.quantity)
            updatedBasket[it.Name][1] += it.Price*(+it.quantity)
          } else {
            updatedBasket[it.Name] = [(+it.quantity), it.Price*(+it.quantity)]
          }
        }
      }

      const updatedItems = prevState.Items.map(item => {
        item.quantity = 0
        item.completed = false
        item.displayQuantity = false
        return item
      })

      localStorage.setItem('basket', JSON.stringify(updatedBasket))

      return {
        basket: updatedBasket,
        Items: updatedItems 
      }
    })
  }

  render() {
    const shopItems = this.state.Items.map(item => 
    <Item 
      key = {item.Id} 
      item = {item}
      handleChangeCheckbox = {this.handleChangeCheckbox}
      handleChangeNumber = {this.handleChangeNumber}
    />)
    return (
      <div className="item-list">
        <button id="AddToBasket" onClick={() => this.handleClick()}>Add To Basket</button>
        {shopItems}
      </div>
    )
  }
}

export default App;
