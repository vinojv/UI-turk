class App extends Component {
  constructor(props, context){
    super(props, context);

  }

  render(){

    return (
      <div>
        <div className="Container">
          
        </div>
        <div className="input__container">
          <label className="input__row__wrapper">Upload file
            <input type="file"/>
          </label>
          <div className="input__row__wrapper"><textarea rows="3"></textarea></div>
          <div className="input__row__wrapper"><button>Submit</button></div>
        </div>
      </div>
      )
  }

};

export default App;