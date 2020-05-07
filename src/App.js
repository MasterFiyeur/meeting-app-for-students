import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Titre test="oui" />
          <Titre test="oui" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}




class Titre extends React.Component {
  constructor(props) {
      super(props);
    }

  test() {
    if (this.props.test == "oui") { return <div> <h1>titre</h1> </div>}
  }

  render() {
    return (
    <div className="titre">
      {this.test()}
    </div>
   );
  }

}


export default App;