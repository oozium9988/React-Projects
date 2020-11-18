import React, {Component} from 'react'
import Item from'./Item'
import './index.css'

class App extends Component {
  constructor() {
    super()

    this.state = {
      Items: []
    }

    this.handleChangeCheckbox = this.handleChangeCheckbox.bind(this)
    this.handleChangeNumber = this.handleChangeNumber.bind(this)
  }

  componentDidMount() {
    fetch("https://onlineshoprestapi20201118203846.azurewebsites.net/api/Item")
      .then(response => response.json())
      .then(data => {
        for (var i = 0; i < data.length; i++) {
          data[i].completed = false
          data[i].quantity = 1
          data[i].displayQuantity = false
        }
        this.setState ({
          Items: data
        })
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
        {shopItems}
      </div>
    )
  }
}

export default App;
