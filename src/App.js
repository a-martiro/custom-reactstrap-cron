import React, { Component } from 'react'
import CustomCron from './lib'
class App extends Component {

  constructor(props) {
      super(props);
      this.state = {
       
      };
  }

  render() {
    return (<div>
      <CustomCron
        onChange={(e)=> {this.setState({value:e}); console.log(e)}}
        hours={2}
        minutes={15}
        value={this.state.value}
        showResultText={true}
        showResultCron={false}
        />                  
    </div>)
  }
}

export default App;
