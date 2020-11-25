import React from 'react'
import './index.css'
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom'

import MainPage from './MainPage'
import Checkout from './Checkout'

const App = () => {
    return (
        <Router>
            <div>
                <Route exact path="/" component={MainPage} />
                <Route path="/checkout" component={Checkout} />
            </div>
        </Router>
    )   
}

export default App