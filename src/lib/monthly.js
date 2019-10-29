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
        this.onLastDayChange = this.onLastDayChange.bind(this);
        this.onAtHourChange = this.onAtHourChange.bind(this);
        this.onAtMinuteChange = this.onAtMinuteChange.bind(this);
    }
    
    componentWillMount() {
        this.state.value = this.props.value;
        if(this.state.value[3] === 'L'){
            this.state.every = "2";
        }else if(this.state.value[3] === 'LW') {
            this.state.every = "3";
        }else if(this.state.value[3].startsWith('L')) {
            this.state.every = "4";
        } else {
            this.state.every = "1";
        }
    }

    onDayChange(e) {
        if(((parseInt(e.target.value) > 0 && parseInt(e.target.value) <= 31)) || e.target.value == "") {
            let val = ['0',this.state.value[1] === '*' ? '0' : this.state.value[1], this.state.value[2] === '*' ? '0': this.state.value[2],this.state.value[3],'1/1', '?','*'];
            val[3] = `${e.target.value}`;
            this.props.onChange(val)
        }
    }
    
    onLastDayChange(e) {
        if(((parseInt(e.target.value) >> 0 && parseInt(e.target.value) <= 31)) || e.target.value == "") {
            let val = ['0',this.state.value[1] === '*' ? '0' : this.state.value[1], this.state.value[2] === '*' ? '0': this.state.value[2],this.state.value[3],'1/1', '?','*'];
            if(e.target.value == '') {
                    val[3] = ''
            } else {
                    val[3] = `L-${e.target.value}`;
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
        //
        return (
          <Card>
            <CardBody>
              <Form inline>
                <FormGroup check>
                  <Label check>
                    <CustomInput type="radio"
                      onChange={(e) => {
                        this.setState({every:e.target.value}); 
                        this.props.onChange(['0',this.state.value[1] === '*' ? '0' : this.state.value[1], this.state.value[2] === '*' ? '0': this.state.value[2],'1','1/1', '?','*'])
                      }} 
                      value="1"
                       name="MonthlyRadio" 
                       checked={this.state.every === "1" ? true : false} />{' '}
                    Día &nbsp;
                    <input className="form-control" type="Number" readOnly={this.state.every !== "1"} value={this.state.value[3]} onChange={this.onDayChange} />
                    &nbsp; de cada mes
                  </Label>
                </FormGroup>
              </Form>
              <hr />
              <Form inline>
                <FormGroup check>
                  <Label check>
                    <CustomInput type="radio"
                      onChange={(e) => {
                        this.setState({every:e.target.value}); 
                        this.props.onChange(['0',this.state.value[1] === '*' ? '0' : this.state.value[1], this.state.value[2] === '*' ? '0': this.state.value[2],'L','*', '?','*'])
                      }} 
                      type="radio" 
                      value="2" 
                      name="DailyRadio" 
                      checked={this.state.every === "2" ? true : false} />{' '}
                    Último día de cada mes.
                  </Label>
                </FormGroup>
              </Form>
              <hr />
              <Form inline>
                <FormGroup check>
                  <Label check>
                    <CustomInput type="radio"
                      onChange={(e) => {this.setState({every:e.target.value}); this.props.onChange(['0',this.state.value[1] === '*' ? '0' : this.state.value[1], this.state.value[2] === '*' ? '0': this.state.value[2] ,'LW','*', '?','*'])}} type="radio" value="3" name="DailyRadio" checked={this.state.every === "3" ? true : false} />{' '}
                    El último día de la semana de cada mes.
                  </Label>
                </FormGroup>
              </Form>
              <hr />
              <Form inline>
                <FormGroup check>
                  <Label check>
                    <CustomInput type="radio"
                      onChange={(e) => {this.setState({every:e.target.value});  this.props.onChange(['0',this.state.value[1] === '*' ? '0' : this.state.value[1], this.state.value[2] === '*' ? '0': this.state.value[2],`L-${1}`,'*', '?','*']) }} value="4" name="MonthlyRadio" checked={this.state.every === "4" ? true : false} />{' '}
                    &nbsp;
                    <input className="form-control" type="Number" readOnly={this.state.every !== "4"} value={this.state.value[3].split('-')[1]} onChange={this.onLastDayChange} />
                    &nbsp; Día(s) antes de fin de mes
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

