import './App.css';
import React from 'react';

class PageNotFoundComponent extends React.Component{
    render(){
        const parms = window.location;
        return (
            <div className="carousel-wrapper">
                <h1>404 - Page Not Found</h1>
                <p>url: {parms.href}</p>
                <p>query Parameters: {parms.search}</p>
                <p>host: {parms.host}</p>
                <p>pathname: {parms.pathname}</p>
                <h3>Something went Wrong. Please try again later.</h3>
            </div>
        );
    }
}

export default PageNotFoundComponent;