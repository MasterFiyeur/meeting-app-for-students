import React from 'react';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

class RangeSlider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      intervalles : this.props.intervalle
    }
  }

  handleChange(event, newValue){
    this.props.onSliderAgeChange(newValue);
    this.setState({
      intervalles : newValue
    })
  };
  render(){
    
    
  return (
    <div style={{width:"25%", marginLeft:"2em"}}>
      <Typography id="range-slider" gutterBottom>
        Tranche d'âge : {this.state.intervalles[0]+"-"+this.state.intervalles[1]+" ans"}
      </Typography>
      <Slider
        min={17}
        max={37}
        value={this.state.intervalles}
        onChange={(event,newValue) => this.handleChange(event,newValue)}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
      />
    </div>
  );
  }
}
export default RangeSlider;