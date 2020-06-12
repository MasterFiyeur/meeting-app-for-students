import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles({
  root: {
    width: 300,
  },
});


class RangeSlider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      intervalles : this.props.intervalle
    }
  }
  handleChange(event, newValue){
    this.setState({
      intervalles : newValue
    })
  };
  render(){
    
    
  return (
    <div style={{width:"25%", marginLeft:"2em"}}>
      <Typography id="range-slider" gutterBottom>
        Tranche d'âge
      </Typography>
      <Slider
        min={17}
        max={37}
        value={this.state.intervalles}
        onChange={(event,newValue) => this.handleChange(event,newValue)}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
      />
    {/*<div>{"min : "+value[0]+";max : "+value[1]}</div>*/}
    </div>
  );
  }
}
export default RangeSlider;