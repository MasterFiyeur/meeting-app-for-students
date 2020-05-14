import React, { Component } from 'react';

class Login extends Component{
    constructor(props) {
        super(props);

        this.state = {
          content: ""
        };
      }
     
      sendLogin(event) {
        alert("Textarea Content: " + this.state.content);
        event.preventDefault();
      }
     
      inputChange(event) {
        var value = event.target.value;
     
        this.setState({
          content: value
        });
      }

    render(){
        return(
            <div>
                <form onSubmit={event => this.sendLogin(event)}>
                    <label>Content</label>
                    <br />
                    <input 
                        type="text"
                        value={this.state.content}
                        onChange={event => this.inputChange(event)} 
                    />
                    <br />
                    <input type="submit" value="Submit" />
                    <p>{this.state.content}</p>
                </form>
            </div>
        );
    }
}

export default Login;