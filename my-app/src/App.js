import React, {Component} from 'react'
import Item from'./Item'
import './index.css'

class App extends Component {
  constructor() {
    super()

    this.state = {
      Items: []
    }
  }

  componentDidMount() {
    fetch("https://localhost:44394/api/Item")
      .then(response => response.json())
      .then(data => {
        this.setState ({
          Items: data
        })
      })
  }

  render() {
    const shopItems = this.state.Items.map(item => <Item key = {item.Id} item = {item} />)
    return (
      <div className="item-list">
        {shopItems}
      </div>
    )
  }
}

export default App;
