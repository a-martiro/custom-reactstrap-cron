import React, { Component } from 'react';
import {
  Card, CardBody,
  Label, FormGroup, Input, Form, CustomInput
} from 'reactstrap';

export default class CustomCron extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hour:0,
            minute:0
        };

        this.onDayChange = this.onDayChange.bind(this);
        this.onAtHourChange = this.onAtHourChange.bind(this);
        this.onAtMinuteChange = this.onAtMinuteChange.bind(this);
    }

    componentWillMount() {
        this.state.value = this.props.value;
        if(this.state.value[3] === '?') {
            this.state.every = false;
        } else {
            this.state.every = true;
        }
    }

    onDayChange(e) {
        if((e.target.value > 0 && e.target.value < 32 ) || e.target.value == '') {
            let val = ['0',this.state.value[1] === '*' ? '0' : this.state.value[1], this.state.value[2] === '*' ? '0': this.state.value[2],'*','*','?','*'];
            if(e.target.value == '') {
                val[3] = '';
            } else {
                val[3] = `1/${e.target.value}`;
            } 
            this.props.onChange(val)
        }
        
    }

    onAtHourChange(e) {
        let val = this.state.value;
        val[2] = `${e.target.value}`;
        this.props.onChange(val)
    }

    onAtMinuteChange(e) {
        let val = this.state.value;
        val[1] = `${e.target.value}`;
        this.props.onChange(val)
    }

    render() {
        this.state.value = this.props.value;
        return (
          <Card>
            <CardBody>
              <Form inline>
                <FormGroup check>
                  <Label check>
                    <CustomInput id="c/d" type="radio"
                      value="1"
                      onClick={(e) => {this.setState({every:true}) ; this.props.onChange()}}
                      name="DailyRadio" checked={this.state.every ? true : false} />{' '}
                    Cada &nbsp;
                    <input className="form-control" disabled={this.state.every ? false: true} type="Number" onChange={this.onDayChange} value={this.state.value[3].split('/')[1] ? this.state.value[3].split('/')[1] :''} />
                    &nbsp; Día(s)
                  </Label>
                </FormGroup>
              </Form>
              <hr />
              <Form inline>
                <FormGroup check>
                  <Label check>
                    <CustomInput 
                      id="all-day" 
                      type="radio"
                      value="2"
                      name="DailyRadio" 
                      onClick={(e) => {this.setState({every:false}); this.props.onChange(['0',this.state.value[1], this.state.value[2],'?','*', 'MON-FRI','*'])}}
                      checked={this.state.every ? false : true} />{' '}
                    Todos los días de la semana
                  </Label>
                </FormGroup>
              </Form>
              <hr />
              <Form inline>
                <FormGroup className="mr-sm-4 ">
                  <Label for="exampleEmail" className="mr-sm-2">Hora de inicio</Label>
                  <Input type="select" name="hours"  onChange={this.onAtHourChange} value={this.state.value[2]}>
                      { this.getHours() }                    
                  </Input>
                </FormGroup>
                <FormGroup className="mr-sm-4 ">
                  <Input type="select" id="DailyMinutes" name="minutes"  onChange={this.onAtMinuteChange} value={this.state.value[1]}>
                    { this.getMinutes() }               
                  </Input>
                </FormGroup>
              </Form>
            </CardBody>
          </Card>
        )
    }

    getHours() {
        let hours = [];
        let leap = parseInt(this.props.hours) || 1;
        for(let i = 0 ; i<24 ; i = i + leap) {
            hours.push(<option id={i} value={i < 10 ? `0${i}` : i}>{i < 10 ? `0${i}` : i}</option>)
        }
        return hours;
    }

    getMinutes() {
        let minutes = [];
        let leap = parseInt(this.props.minutes) || 1;
        for(let i = 0 ; i<60 ; i = i + leap) {
            minutes.push(<option id={i} value={i < 10 ? `0${i}` : i}>{i < 10 ? `0${i}` : i}</option>)
        }
        return minutes;
    }
}