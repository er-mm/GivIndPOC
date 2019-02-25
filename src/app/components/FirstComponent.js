import React from "react";
import { render } from "react-dom";
//import fs from 'file-system';
//const aa = require('file-system');


export class FirstComponent extends React.Component{

	constructor(props) {
        super();
        this.state = {
			allData:[]
        };
       
	  }
	  componentDidMount(){
    	//this.setState({ isLoading: true });
        this.fetchData();
	}
	
	fetchData(){
    	
    	fetch('http://starlord.hackerearth.com/insta')
  	  .then(data => data.json())
  	  .then(function(data) {
  		  console.log('888888888888888888',data);
  	    //console.log('55555555555555',JSON.stringify(myJson));
  	    this.setState({ allData: data});
  	  }.bind(this));
    	
    }
	render() {
		const renderTodos = this.state.allData.map((data, index) => {
			// console.log('data : ',data);
			  return (
					
						<div className="col-sm-2" key={index}>
                            <img src={data.Image} alt="Italian Trulli"/>
                        </div>
				);
			});
		return(
			<div className="container">
                <div className="row">
                        
                       {renderTodos}                        
                </div>
            </div>

		);
	} 
}