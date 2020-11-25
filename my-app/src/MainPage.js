import React, {Component} from 'react'
import Item from'./Item'
import BasketItem from './BasketItem'
import './index.css'
import { Link } from 'react-router-dom'
//import _ from 'lodash'

class MainPage extends Component {
  constructor() {
    super()

    this.state = {
      Items: [],
      basket: [],
      search: ""
    }

    this.handleChangeCheckbox = this.handleChangeCheckbox.bind(this)
    this.handleChangeNumber = this.handleChangeNumber.bind(this)
    this.handleChangeCheckboxBasket = this.handleChangeCheckboxBasket.bind(this)
    this.handleChangeNumberBasket = this.handleChangeNumberBasket.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleClickButton = this.handleClickButton.bind(this)
    this.handleClickButtonBasket = this.handleClickButtonBasket.bind(this)
    this.handleClickClearBasket = this.handleClickClearBasket.bind(this)
    this.handleSearchButton = this.handleSearchButton.bind(this)
    this.handleSearchText = this.handleSearchText.bind(this)
  }

  componentDidMount() {
    fetch("https://onlineshoprestapi20201118203846.azurewebsites.net/api/Item")
      .then(response => response.json())
      .then(data => {
        for (var i = 0; i < data.length; i++) {
          data[i].checked = false
          data[i].quantity = 0
          data[i].displayQuantity = false
          data[i].displayItem = true
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
          item.checked = !item.checked
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

  handleChangeCheckboxBasket(id) {
    this.setState(prevState => {
      const updatedBasket = prevState.basket.map(item => {
        if (item.id === id) {
          item.checked = !item.checked
          item.displayQuantity = !item.displayQuantity
        }
        return item
      })
      return {
        basket: updatedBasket
      }
    })
  }

  handleChangeNumberBasket(id, event) {
    this.setState(prevState => {
      const updatedBasket = prevState.basket.map(item => {
        if (item.id === id) {
          item.removeQuantity = event.target.value
        }
        return item
      })
      return {
        basket: updatedBasket
      }
    })
  }

  handleClick() {
    this.setState(prevState => {
      let updatedBasket = JSON.parse(JSON.stringify(prevState.basket))
      const prevItems = prevState.Items
      for (var i = 0; i < prevItems.length; i++) {
        const it = prevItems[i];
        if (it.checked && it.quantity > 0) {
          var index = updatedBasket.findIndex(bItem => bItem.Name === it.Name)
          if (index !== -1) {
            updatedBasket[index].quantity += (+it.quantity)
            updatedBasket[index].Price += it.Price*(+it.quantity)
          } else {
            let obj = {
              id: it.Id, 
              Name: it.Name, 
              quantity: (+it.quantity), 
              Price: (+it.Price)*(+it.quantity),
              checked: false,
              displayQuantity: false,
              removeQuantity: +0
            }
            updatedBasket.push(obj)
          }
        }
      }

      const updatedItems = prevState.Items.map(item => {
        item.quantity = 0
        item.checked = false
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

  handleClickButton(id) {
    this.setState(prevState => {
      let updatedBasket = JSON.parse(JSON.stringify(prevState.basket))
      const prevItems = prevState.Items
      for (var i = 0; i < prevItems.length; i++) {
        const it = prevItems[i]
        if (it.checked && it.quantity > 0 && it.Id === id) {
          var index = updatedBasket.findIndex(bItem => bItem.Name === it.Name)
          if (index !== -1) {
            updatedBasket[index].quantity += (+it.quantity)
            updatedBasket[index].Price += it.Price*(+it.quantity)
          } else {
            let obj = {
              id: it.Id, 
              Name: it.Name, 
              quantity: (+it.quantity), 
              Price: (+it.Price)*(+it.quantity),
              checked: false,
              displayQuantity: false,
              removeQuantity: +0
            }
            updatedBasket.push(obj)
          }
        }
      }

      const updatedItems = prevState.Items.map(item => {
        if (item.Id === id) {
          item.quantity = 0
          item.checked = false
          item.displayQuantity = false
        }
        
        return item
      })

      localStorage.setItem('basket', JSON.stringify(updatedBasket))

      return {
        Items: updatedItems,
        basket: updatedBasket
      }
    })
  }

  handleClickButtonBasket(id) {
    this.setState(prevState => {
      const prevItems = prevState.Items
      const updatedBasket = prevState.basket.map(item => {
        if (item.id === id) {
          const itemPrice = prevItems.find(Item => Item.Id === id).Price
          item.quantity -= item.removeQuantity
          item.Price -= itemPrice*item.removeQuantity
        }

        return item
      })

      for (var i = 0; i < updatedBasket.length; i++) {
        if (updatedBasket[i].quantity === 0) {
          updatedBasket.splice(i, 1)
        }
      }

      localStorage.setItem('basket', JSON.stringify(updatedBasket))

      return {
        basket: updatedBasket
      }
    }) 
  }

  handleClickClearBasket() {
    const updatedBasket = []
    localStorage.setItem('basket', JSON.stringify(updatedBasket))

    this.setState({
      basket: []
    }) 
  }

  handleSearchButton() {
    this.setState(prevState => {
      const updatedItems = prevState.Items.map(item => {
        const searchLowerCase = prevState.search.toLowerCase().replace(/\s+/g, '');
        const itemNameLowerCase = item.Name.toLowerCase().replace(/\s+/g, '');
        const bool = searchLowerCase.includes(itemNameLowerCase) || itemNameLowerCase.includes(searchLowerCase) || prevState.search === ""    
        bool ? item.displayItem = true : item.displayItem = false

        return item
      })

      return {
        Items: updatedItems
      }
    })
  }


  handleSearchText(event) {
    this.setState({
      search: event.target.value
    })
  }

  render() {
    const shopItems = this.state.Items.map(item => 
    <Item 
      key = {item.Id} 
      item = {item}
      handleChangeCheckbox = {this.handleChangeCheckbox}
      handleChangeNumber = {this.handleChangeNumber}
      handleClickButton = {this.handleClickButton}  
    />)
    
    const basketItems = Array.isArray(this.state.basket) ? this.state.basket.map(item =>
    <BasketItem
      key = {item.id}
      item = {item}
      handleChangeNumberBasket = {this.handleChangeNumberBasket}
      handleClickButtonBasket = {this.handleClickButtonBasket}
      handleChangeCheckboxBasket = {this.handleChangeCheckboxBasket}
    />) : ''

    const basketString = this.state.basket === undefined || this.state.basket.length === 0 ?
      '' : 'Basket'

    return (
      <div className="item-list">
        <h3 className="basket-header">{basketString}</h3>
        {basketItems}
        <br />
        <span><button 
          id="Clear Basket" 
          onClick={() => this.handleClickClearBasket()}
          className={Array.isArray(this.state.basket) && this.state.basket.length > 0 ? "show-clearbasket" : "hide"}
        >Clear basket</button>
        <button 
          id="AddSelectedToBasket" 
          onClick={() => this.handleClick()}
        >Add all selected to basket</button></span>
        <Link to="/checkout">
          <button className={Array.isArray(this.state.basket) && this.state.basket.length > 0 ? "" : "checkout-link-hide"}>
            Go to checkout
          </button>
        </Link>
        <br/>
        <span className="search">
          <input 
            type="text"
            placeholder="search..."
            onChange={(event) => this.handleSearchText(event)}
            onKeyDown={(event) => {if(event.key === 'Enter') {
              this.handleSearchButton()
            }}}
          />
          <input
            type="submit"
            className="fa-input"
            value="&#xf002;"
            onClick={() => this.handleSearchButton()}
          />
        </span>
        {shopItems}
      </div>
    )
  }
}

export default MainPage;
