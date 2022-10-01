import React from 'react';
import '../../Styles/quicksearch.css';
import { withRouter } from 'react-router-dom';

class QuickSearch extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    const { quickSearch } = this.props;
    return (<div className='App'>
      <div className="container">
        <div className="quicksearch">Quick Searches</div>
        <div className="subheading">Discover Restaurants by type of meal</div>
        <div className='row'>
          {quickSearch && quickSearch.map((item) => {
            return <div className="col-sm-12 col-md-6 col-lg-4 d-flex justify-content-center">
              <div className="onebox">
                <div className='innerboxpic'><img className='thumbnail' src={item.image} alt='' /></div>
                <div className='secondbox'>
                  <div className='thumbnailheading'>{item.name}</div>
                  <div className='thumbnaildescription'>{item.content}</div>
                </div>
              </div>
            </div>
          })}
        </div>
      </div>
    </div>)
   }
}

export default withRouter(QuickSearch);
