import React, { Component } from 'react';
import {
  Card, CardBody,
  Label, FormGroup, Input, Form, CustomInput
} from 'reactstrap';

export default class CustomCron extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
        this.onHourChange = this.onHourChange.bind(this);
        this.onAtHourChange = this.onAtHourChange.bind(this);
        this.onAtMinuteChange = this.onAtMinuteChange.bind(this);
    }

    componentWillMount() {
        this.state.value = this.props.value;
        if(this.state.value[2].search('0/') === 0 || this.state.value[2] === '*') {
            this.state.every = true;
        }
    }

    onHourChange(e) {
        if(this.state.every && ((e.target.value > 0 && e.target.value < 24) || e.target.value == '')) {
            let val = ['0','0','*','*','*','?','*'];
            if(e.target.value == '') {
                val[2] = '';
            } else {
                val[2] = `0/${e.target.value}`;
            }
            this.props.onChange(val)
        } 
    }

    onAtHourChange(e) {
        let val = ['0',this.state.value[1],'*','*','*','?','*']
        val[2] = `${e.target.value}/1`;
        this.props.onChange(val)
    }

    onAtMinuteChange(e) {
        let val = ['0','*',this.state.value[2],'*','*','?','*']
        val[1] = `${e.target.value}`;
        this.props.onChange(val)
    }


    render() {
        this.state.value = this.props.value
        return (
          <Card>
            <CardBody>
              <Form inline>
                <FormGroup check>
                  <Label check>
                    <CustomInput id="c/h" type="radio"
                      value="1"
                      onClick={(e) => {
                        this.setState({every:true}); 
                        this.props.onChange(['0','0','0/1','*','*','?','*'])
                      }} 
                      checked={this.state.every ? true:false}
                      name="HourlyRadio" />{' '}
                    Cada &nbsp;
                    <input className="form-control" 
                      disabled={this.state.every ? false: true} 
                      type="Number" 
                      onChange={this.onHourChange}
                      value={this.state.value[2].split('/')[1] ? this.state.value[2].split('/')[1] : ''}/>
                    &nbsp; Hora(s)
                  </Label>
                </FormGroup>
              </Form>
              <hr />
              <Form inline>
                <FormGroup className="mr-sm-4 " check>
                  <Label check className="mr-sm-2">
                    <CustomInput id="hours" type="radio"
                      onClick={(e) => {this.setState({every:false}); this.props.onChange()}} checked={this.state.every ? false : true}
                      name="HourlyRadio" />{' '}
                      Hora de inicio
                    </Label>
                  <Input type="select" name="hours" disabled={this.state.every ? true: false} onChange={this.onAtHourChange} value={this.state.value[2].split('/')[0] ? this.state.value[2].split('/')[0] : '00'}>
                      { this.getHours() }                    
                  </Input>
                </FormGroup>
                <FormGroup className="mr-sm-4 ">
                  <Input type="select" name="minutes" disabled={this.state.every ? true: false} onChange={this.onAtMinuteChange} value={this.state.value[1]} >
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
            hours.push(<option value={i < 10 ? `0${i}` : i}>{i < 10 ? `0${i}` : i}</option>)
        }
        return hours;
    }

    getMinutes() {
        let minutes = [];
        let leap = parseInt(this.props.minutes) || 1;
        for(let i = 0 ; i<60 ; i = i + leap) {
            minutes.push(<option value={i < 10 ? `0${i}` : i}>{i < 10 ? `0${i}` : i}</option>)
        }
        return minutes;
    }

}

