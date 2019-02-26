import React from "react";
import { render } from "react-dom";
//import * as styles from '../../../src/public/main.css';
//import fs from 'file-system';
//const aa = require('file-system');


export class FirstComponent extends React.Component{

	constructor(props) {
        super();
        this.state = {
			allData:[],
			like:'like',
			comments : [],
			files:{}
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
	/*let allDataCopy = JSON.parse(JSON.stringify(this.state.allData))
   
   allDataCopy[index].likes = likeCount['likes'] + 1;
   this.setState({
      allData:allDataCopy 
    }) ;*/
	clickHandle(index,e){
		let likeCount = this.state.allData[index];
		let allNewData = Object.assign({}, this.state);
		if(document.getElementById(index).textContent == 'like'){
			document.getElementById(index).textContent = 'dislike';
			allNewData.allData[index].likes = likeCount['likes'] + 1;
			this.setState(allNewData);
	}else{
		document.getElementById(index).textContent = 'like';
		allNewData.allData[index].likes = likeCount['likes'] - 1;
			this.setState(allNewData);
		}
	}

	showComment(index,e){
		if(document.getElementById('div'+index).style.display == 'none'){
		document.getElementById('div'+index).style.display = "block";
		document.getElementById('text'+index).value = '';
	}else
		document.getElementById('div'+index).style.display = 'none';
	}

	// handleComment(index,e){
	// 	let newComment = e.target.value;
		
	// }
	submitComm(index,e){
		document.getElementById('div'+index).style.display = 'none';
		document.getElementById('upComm'+index).style.display = 'block';
		let comm = document.getElementById('text'+index).value;
		let aa = <div>{comm}</div>;
		if(this.state.comments[index] == undefined){
			this.state.comments[index] = [aa];}
		else{
			this.state.comments[index] = [...this.state.comments[index],aa];
		}
		this.setState({comments:this.state.comments});
	}
	  
	_handleSubmit(e) {
		e.preventDefault();
		// TODO: do something with -> this.state.file
	  ;
	let reader = new FileReader();
		reader.onloadend = () => {
			let imagePreviewUrl = reader.result;
			let obj = {
				Image : imagePreviewUrl,
				likes : 0
			};
		  this.setState({
			allData: [...this.state.allData,obj]
			});
		}
	
		reader.readAsDataURL(this.state.files)
		console.log('handle uploading-', this.state.files);
	  }
	
	  _handleImageChange(e) {
		e.preventDefault();
	  
		 this.setState({files:e.target.files[0]}); 
		
	  }

	  deleteImage(index,e){
		  let del = this.state.allData;
		  del.splice(index, 1);
		  this.setState({allData: del});
	  }

	render() {
		console.log('ssssssssssssssssssssss : ',this.state.allData);
		const renderTodos = this.state.allData.map((data, index) => {
			// console.log('data : ',data);
			  return (
					
						<div className="col-sm-2" key={index}>
                            <img src={data.Image} alt="Italian Trulli" width='100px' height='70px'/>
							<div>
								<span>{data.likes}</span>
								<button id={index} onClick={this.clickHandle.bind(this,index)}>{this.state.like}</button>
								<button id={'comm'+index} onClick={this.showComment.bind(this,index)}>comment</button>
								<button id={'del'+index} onClick={this.deleteImage.bind(this,index)}>Delete</button>
								<div id={'upComm'+index} style={{display :'none'}}>
									{this.state.comments[index]}
								</div>
								
								<div id={'div'+index} style={{display :'none'}}>
									<textarea  id={'text'+index} rows="2" cols="20" name="comment" />
									<button id={'submit'+index} onClick={this.submitComm.bind(this,index)}>submit</button>
								</div>
								
							</div>
                        </div>
				);
			});
		return(
			<div className="container">
				<div className="container">
				Add File : 
			<form onSubmit={this._handleSubmit.bind(this)}>
					<input className="fileInput" 
					type="file" 
					onChange={this._handleImageChange.bind(this)} />
					<button className="submitButton" 
					type="submit" 
					onClick={this._handleSubmit.bind(this)}>Upload Image</button>
				</form>
				</div><br/><br/>
                <div className="row">
                        
                       {renderTodos}                        
                </div>
            </div>

		);
	} 
}