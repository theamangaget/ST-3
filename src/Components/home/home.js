import React from 'react';
import axios from 'axios';
import WallPaper from './Wallpaper';
import QuickSearch from './QuickSearch';

class Home extends React.Component{
  constructor(props){
    super(props);
    this.state = {
        location: [],
        mealType: []
    }
  }

  componentDidMount(){
    axios(
        {
            method: 'GET',
            url:'https://6310844d826b98071a4364d5.mockapi.io/citylist',
            headers: {'Content-Type': 'application/json'}
        }
    ).then(response => this.setState({ location: response.data})).catch()
    axios(
        {
            method: 'GET',
            url:'https://6310844d826b98071a4364d5.mockapi.io/meals',
            headers: {'Content-Type': 'application/json'}
        }
    ).then(response => this.setState({ mealType: response.data})).catch()
  }

  render(){
    const {location, mealType} = this.state;
    return (<div className='App'>
        <WallPaper locationValue = {location}/>
        <QuickSearch quickSearch = {mealType}/>
    </div>)
   }
}

export default Home;
