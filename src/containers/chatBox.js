import React, { Component } from 'react';
import { connect } from 'react-redux';

class ChatBox extends Component {
  constructor(props, context){
    super(props, context);

  }

  render() {
	return (<div className="input__container">
          <label className="input__row__wrapper">Upload file
            <input ref={(node)=>{this.fileUpload = node}} onChange={(e)=>{
                this.props.upload(e, this.fileUpload)
            }} type="file"/>
          </label>
          <div className="input__row__wrapper"><textarea rows="3"></textarea></div>
          <div className="input__row__wrapper">
              <button ref={(node)=>{this.submitNode = node}}
                      onClick={(e)=>{
                          this.props.submit(e, this.submitNode)
                      }}>Submit</button></div>
        </div>)
	}

};

var convertStateToProps = function (state) {
    return {

    }
};

var dispatcher = function (dispatch) {
    return {
        submit: (e, input)=>{
            e.stopPropagation();
            e.preventDefault();
            dispatch(push(input.value));
            input.value = "";
        },
        upload: (e, input)=>{
            e.stopPropagation();
            e.preventDefault();
            var reader = new FileReader();

            if(input.files && input.files[0]) {
                reader.onload = function (e) {

                    console.log(e.target.result)
                };//end onload()
                reader.readAsText(input.files[0]);
            }
            //
            // dispatch(push(input.value));
            // input.value = "";
        }
    }
}

export default connect(convertStateToProps, dispatcher)(ChatBox);