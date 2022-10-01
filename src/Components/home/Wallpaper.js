import React from 'react';
import axios from 'axios';
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import {Button} from '@material-ui/core';
import '../../Styles/wallpaper.css';
import { withRouter } from 'react-router-dom';
import Modal from 'react-modal';
import { GoogleLogin } from 'react-google-login';

Modal.setAppElement('#root');

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '450px',
  }
}

const responseGoogle = (response) => {
  console.log(response);
}

const theme = createTheme({
  typography: {
    button: {
      fontSize: 13,
      fontWeight: 600,
    },    
  },
  palette: {
    primary: {
      main: '#FFFFFF'
    }
  }
});
    

class WallPaper extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      restaurants: [],
      suggestions: [],
      searchText: '',
      login: false,
      signup: false
    }
  }

  openLoginModal = () => {
    this.setState({
      login: true
    })
  }

  closeLoginModal = () => {
    this.setState({
      login: false
    })
  }

  openSignupModal = () => {
    this.setState({
      signup: true
    })
  }

  closeSignupModal = () => {
    this.setState({
      signup: false
    })
  }

  handlelocChange = (event) => {
    const locName = event.target.value;
    axios(
      {
          method: 'GET',
          url:`https://6310844d826b98071a4364d5.mockapi.io/restaurants?city=${locName}`,
          headers: {'Content-Type': 'application/json'}
      }
  ).then(response => this.setState({ restaurants: response.data})).catch()
  } 
  handleSearch = (event) => {
    const { restaurants } = this.state;
    const searchText = event.target.value;
    let filteredList;
    if (searchText === "") {
      filteredList = [];
    } else {
      filteredList = restaurants.filter((item) => {
        return item.name.toLowerCase().includes(searchText.toLowerCase());
      })
    }
    this.setState({ suggestions: filteredList, searchText: searchText });
  }

  handleRestaurantClick = (restaurantId) => {
    this.props.history.push(`/details?restaurant=${restaurantId.id}`);
  }

  renderSuggestions = () => {
    const { suggestions, searchText } = this.state;
    if (suggestions.length === 0 && searchText) {
      return (
        <ul className="unorderedList">
          <li>No Match found</li>
        </ul>
      )
    }
    return (
      <ul className="unorderedList">
        {suggestions.map((item, index) => {
          return <li key={index} className="listOfRes" onClick={() => this.handleRestaurantClick(item)}><img src={`${item.image}`} alt="" className="resIcon"/>{` ${item.name}, ${item.city}`}</li>
        })}
      </ul>
    )
  }

  render(){
    const { locationValue } = this.props;
    const { login, signup } = this.state;
    return (<div className='App'>
      <div className='MainPic'>
        <React.Fragment>
          <MuiThemeProvider theme={theme}>
            <div className='d-flex justify-content-end'>
              <Button variant="text" color='primary' className='mt-4' onClick={this.openLoginModal}>Log In</Button>
              <Button variant="outlined" color='primary' className='mt-4 me-4' onClick={this.openSignupModal}>Create an account</Button>
            </div>
          </MuiThemeProvider>
          <Modal isOpen={login} style={customStyles}>
            <h2>
              Login
              <button className="btn btn-outline-danger float-end" onClick={this.closeLoginModal}>X</button>
            </h2>
            <form className="form">
              <input type="text" className="form-control" placeholder="Email"/>
              <input type="password" className="form-control" placeholder="Password"/>
              <div className="text-center">
                <input type="button" className="btn btn-primary" value="Login"/>
              </div>
              <div className='mt-3 d-flex justify-content-center'>Or</div>
              <div className='mt-2 d-flex justify-content-center'>
                <GoogleLogin
                  clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
                  buttonText="Login with Google"
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  cookiePolicy={'single_host_origin'}
                />
              </div>
            </form>
          </Modal>
          <Modal isOpen={signup} style={customStyles}>
            <h2>
              Sign up
              <button className="btn btn-outline-danger float-end" onClick={this.closeSignupModal}>X</button>
            </h2>
            <form className="form">
              <input type="text" className="form-control" placeholder="Email"/>
              <input type="password" className="form-control" placeholder="Password"/>
              <input type="text" className="form-control" placeholder="First Name"/>
              <input type="text" className="form-control" placeholder="Last Name"/>
              <div className="text-center">
                <input type="button" className="btn btn-primary" value="Signup" />
              </div>
            </form>
          </Modal>
        </React.Fragment>
        <div className='d-flex justify-content-center align-item-center'>
          <div className='logo'>Continental</div>
        </div>
        <div className='heading'>Find the best restaurants, cafés, and bars</div>
        <div className='locationSelector d-flex justify-content-center flex-wrap'>
          <select className='locationDropdown' onChange={this.handlelocChange}>
            <option value='0'>Select your location</option>
            {locationValue && locationValue.map((item) => {
              return <option value={item.location_id}>{`${item.name}, ${item.city}`}</option>
            })}
          </select>
          <div id='notebooks'>
            <input id='query' type='search' placeholder=' Search for restaurants...' onChange={this.handleSearch}/>
            <i className="fa-solid fa-magnifying-glass"></i>
            {this.renderSuggestions()}
          </div>
        </div>
      </div>
    </div>)
   }
}

export default withRouter(WallPaper);
