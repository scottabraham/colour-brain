import React, { Component } from 'react';
import { CirclePicker, MaterialPicker, SketchPicker} from 'react-color';

const brain = require('brain.js')
const network = new brain.NeuralNetwork();


const learningData = [
  {input: {r: 1, g: 1, b: 1}, output: {light: 1}},
  {input: {r: 0, g: 0, b: 0}, output: {dark: 1}},
  {input: {r: 0.5254901960784314, g: 0.29411764705882354, b: 0.29411764705882354}, output: {dark: 1}},
  {input: {r: 0.9098039215686274, g: 0.9686274509803922, b: 0.4117647058823529}, output: {light: 1}},
  {input: {r: 0.9411764705882353, g: 0.09019607843137255, b: 0.09019607843137255}, output: {dark: 1}},
  {input: {r: 0.9411764705882353, g: 0.09019607843137255, b: 0.09019607843137255}, output: {dark: 1}},
  {input: {r: 0.8352941176470589, g: 0.9921568627450981, b: 0.8509803921568627}, output: {light: 1}},
  {input: {r: 0.7450980392156863, g: 0.5176470588235295, b: 0.5176470588235295}, output: {dark: 1}},
  {input: {r: 1, g: 0.6784313725490196, b: 0.6784313725490196}, output: {light: 1}},
  {input: {r: 0.6941176470588235, g: 0.6941176470588235, b: 0.5176470588235295}, output: {dark: 1}}, 
  {input: {r: 0.803921568627451, g: 0.8627450980392157, b: 0.2235294117647059}, output: {light: 1}},
  {input: {r: 1, g: 0.596078431372549, b: 0}, output: {dark: 1}},
  {input: {r: 0, g: 1, b: 1}, output: {light: 1}}
]

network.train(learningData);

//const result = network.run();
////console.log(result)

class App extends Component {

  constructor(props){
    super(props)
    this.handleOnChange  = this.handleOnChange.bind(this)
    this.state = {
      color: "#CACACA",
      textColor: "dark"
    }
  }

  handleOnChange(color){

    const testColor = {r: color.rgb.r / 255, g: color.rgb.g / 255, b: color.rgb.b / 255};
    const brainResult = brain.likely(testColor, network);
    console.log("Brain thinks background is ", brainResult)

    this.setState({
      ...this.state,
      color:color, 
      textColor: brainResult
    })

    console.log(testColor)
    
  }
 
  render() { 
    return (
      <div>
        <div id='colorpicker'>
          <SketchPicker onChange={this.handleOnChange} color={this.state.color || "#CACACA"} />
        </div>
        <div style={{border: '1px solid grey', marginTop:'10px', width: '100%', height: '25%', padding: '20px', backgroundColor: this.state.color.hex}}>
            <h1 style={{color:this.state.textColor==="dark" ? "white" : "black"}} >Hello World!!</h1>
        </div>
      </div>
    );
  }
}

export default App;
