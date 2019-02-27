import React from "react";
import { render } from "react-dom";
//import * as styles from '../../public/main.scss';
//import fs from 'file-system';
//const aa = require('file-system');


export class FirstComponent extends React.Component{

	constructor(props) {
        super();
        this.state = {
			allData:[],
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
		let x = document.getElementById('like'+index).querySelectorAll('.heart2')[0].style.fill;
		if(x == "" || x == "white"){
			document.getElementById('like'+index).querySelectorAll('.heart2')[0].style.fill = "red";
			document.getElementById(index).style.display='block';
			setTimeout(()=>{
				document.getElementById(index).style.display='none';
			},1000);
			//document.getElementById('like'+index).textContent = 'dislike';
			allNewData.allData[index].likes = likeCount['likes'] + 1;
			this.setState(allNewData);
	}else{
		document.getElementById('like'+index).querySelectorAll('.heart2')[0].style.fill = "white";
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
		let lenOfData = this.state.allData.length-1;
		let val = this.state.allData[lenOfData];
	let reader = new FileReader();
		reader.onloadend = () => {
			let imagePreviewUrl = reader.result;
			let obj = {
				Image : imagePreviewUrl,
				likes : 0
			};
			function check(lenOfData,obj,data,callback){
				for(let i=0; i<=lenOfData ; i++){
					if(data[i].Image == obj.Image)
					return callback('true');
					
				}
			}
			var abc = check(lenOfData,obj,this.state.allData, function (isValid){
				return isValid;
			});
			if(abc == 'true'){
				alert('Same pic Cannot be added');
			}else{
		  this.setState({
			allData: [...this.state.allData,obj]
			});
		}
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
			let com = this.state.comments;
			del.splice(index, 1);
			com.splice(index, 1);
		  this.setState({allData: del, comments:com});
	  }

	render() {
		console.log('ssssssssssssssssssssss : ',this.state.allData);
		const renderTodos = this.state.allData.map((data, index) => {
			  return (
					<div className="card col-sm-3 marginAll" key={'img_'+index}>
						<div className="imgPreview" >
                            <img src={data.Image} onDoubleClick={this.clickHandle.bind(this,index)} alt={'Image'}/>
														<svg id={index} className="heart" viewBox="0 0 32 29.6">
  <path d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2
	c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"/>
</svg> 
														<button id={'del'+index} onClick={this.deleteImage.bind(this,index)} className="close"><span aria-hidden="true">&times;</span></button>
										</div>
										
							<div>
								<span>{data.likes}</span>
								<button id={'like'+index} onClick={this.clickHandle.bind(this,index)} className="btn btn-xs btn-link">
								<svg id={'h_'+index} className="heart2" viewBox="0 0 32 29.6">
  <path d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2
	c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"/>
</svg> 
								</button>
								<button id={'comm'+index} onClick={this.showComment.bind(this,index)} className="btn btn-xs btn-link">Comment</button>
								
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
					<input className='fileInput'
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