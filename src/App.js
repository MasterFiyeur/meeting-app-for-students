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
          <NameForm />
          <EssayForm />
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

class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
class EssayForm extends React.Component {
  constructor(props) {
    super(props);
 
    this.state = {
      content: ""
    };
  }
 
  handleSubmitForm(event) {
    alert("Textarea Content: " + this.state.content);
    event.preventDefault();
  }
 
  handleChange(event) {
    var value = event.target.value;
 
    this.setState({
      content: value
    });
  }
 
  render() {
    return (
      <form onSubmit={event => this.handleSubmitForm(event)}>
        <label>Content</label>
        <br />
        <textarea cols="45" rows="5"
          value={this.state.content}
          onChange={event => this.handleChange(event)} />
        <br />
        <input type="submit" value="Submit" />
        <p>{this.state.content}</p>
      </form>
    );
  }
}
export default App;