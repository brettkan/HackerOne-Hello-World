import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="app">
                <header className="app-header">
                    <img src={logo} className="app-logo" alt="logo" />
                    <h1 className="App-title">Hello World</h1>
                </header>
                <p className="app-intro">
                    Add some code here
                </p>
            </div>
        );
    }
}

export default App;