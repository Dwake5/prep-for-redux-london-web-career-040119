import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import logo from './logo.svg';
import './App.css';

import { createStore } from 'redux'

// store is just an object with some methods
// getState - this is a reader method, returns whatever the state is that the redux store knows about

// dispatch

const initialState = {
  isRaining: false,
  mike: "Cheng",
  count: 17
}

const reducer = (state = initialState, action) => {

  switch(action.type) {
    case "INCREMENT":
      return {...state, count: state.count + 1}
    case "DECREMENT":
      return {...state, count: state.count - 1}
    case "INCREMENT_BIG":
      return {...state, count: state.count + 5}
    case "INCREMENT_BIGGER":
      return {...state, count: state.count + 10}
    default:
      return state
  }
}




// subscribe gets called each time we send a message to the store after the reducer is called
const store = createStore(reducer)



store.subscribe(() => {
  console.log('the new state is', store.getState());
})


class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Counter />
      </div>
    );
  }
}

class Header extends Component {
  componentDidMount() {
    store.subscribe(() => this.setState({}))
  }

  renderDescription = () => {
    const remainder = store.getState().count % 5;
    const upToNext = 5 - remainder;
    return `The current count is less than ${store.getState().count + upToNext}`;
  };

  render() {
    return (
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Welcome to React</h1>
        <h3>{this.renderDescription()}</h3>
      </header>
    );
  }
}

class Counter extends Component {

  componentDidMount() {
    store.subscribe(() => this.setState({}))
  }

  increment = () => {
    store.dispatch({type: "INCREMENT"})
    // this.setState(prevState => ({ count: prevState.count + 1 }));
  };

  decrement = () => {
    store.dispatch({type: "DECREMENT"})
    // this.setState(prevState => ({ count: prevState.count - 1 }));
  };

  incrementBig = () => {
    store.dispatch({type: "INCREMENT_BIG"})
    // this.setState(prevState => ({ count: prevState.count + 5 }));
  };

  incrementBigger = () => {
    store.dispatch({type: "INCREMENT_BIGGER"})
    // this.setState(prevState => ({ count: prevState.count + 10 }));
  };

  render() {
    return (
      <div className="Counter">
        <h1>{store.getState().count}</h1>
        <button onClick={this.decrement}> - </button>
        <button onClick={this.increment}> + </button>
        <button onClick={this.incrementBig}> + 5 </button>
        <button onClick={this.incrementBigger}> + 10 </button>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
