import './App.css';
import React from 'react';
import Home from './Components/home/home';

class App extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
    <div className='App'>
      <Home/>
    </div>)
   }
}

export default App;
