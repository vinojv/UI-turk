import React, {Component} from 'react';
import {connect} from 'react-redux';
import push from  "../actions/push_message.action";
import AceEditor from 'react-ace';
import brace from 'brace';
import 'brace/mode/javascript';
import 'brace/theme/monokai'
import classNames from 'classnames';
import styles from '../styles/chatBox.css';

const Conversation = ({})=> (
    <div className={styles.conversation}>
        <div className={classNames(styles.msgWrapper, "clearfix")}>
            <div className={styles.profilePic}></div>
            <div className={styles.msg}>
                Lorem ipsum dolor sit amet, excepturi fugit harum magni maiores minima natus nobis quasi
            </div>
            <span className={styles.time}>02:00 AM</span>
        </div>
    </div>
);


class ChatBox extends Component {
    constructor(props, context) {
        super(props, context);
        console.log(AceEditor.edit)
    }

    render() {
        var self = this;
        return (<div className={classNames("", styles.wrapper)}>
            <div className={styles.conversationWrapper}>
                <h2 className={styles.conversationTitle}>TURK BOT</h2>
                <Conversation/>
            </div>
            <div className={styles.editorContainer}>
                <label className={styles.upload}>Upload file
                    <input ref={(node)=> {
                        this.fileUpload = node
                    }} onChange={(e)=> {
                        this.props.upload(e, this.fileUpload, this.editor)
                    }} type="file"/>
                </label>
                <AceEditor
                    ref={(node)=> {
                        this.editor = node
                    }}
                    onChange={(value)=> {
                        this.textArea = value
                    }}
                    onPaste={(value)=> {
                        this.textArea = value
                    }}
                    value={this.textArea}
                    mode="javascript"
                    theme="monakai"
                    height="100%"
                    max-height="10em"
                    width="100%"
                    mix-height="3em"
                    name="aceeditor"
                    setOptions={{
                        enableBasicAutocompletion: true,
                        enableLiveAutocompletion: true,
                        enableEmmet: true,
                        tabSize: 4,
                        fontSize: 14,
                        showGutter: true
                    }}
                    editorProps={{$blockScrolling: true}}
                />
                {/*<textarea ref={(node)=>{this.textArea = node}} ></textarea>*/}

                <button className={styles.submit} ref={(node)=> {
                    this.submitNode = node
                }}
                        onClick={(e)=> {
                            this.props.submit(e, this.textArea)
                        }}>Submit
                </button>
            </div>
        </div>)
    }

}
;

var convertStateToProps = function (state) {
    return {}
};

var dispatcher = function (dispatch) {
    return {
        submit: (e, textarea)=> {
            e.stopPropagation();
            e.preventDefault();
            dispatch(push(textarea));
            console.log(textarea);
            ace.edit("aceeditor").setValue("", -1);
        },
        upload: (e, input)=> {
            e.stopPropagation();
            e.preventDefault();
            var reader = new FileReader();

            if (input.files && input.files[0]) {
                reader.onload = function (e) {
                    console.log(e.target.result);
                    ace.edit("aceeditor").setValue(e.target.result, 1);
                };
                reader.readAsText(input.files[0]);
            }
        }
    }
}

export default connect(convertStateToProps, dispatcher)(ChatBox);