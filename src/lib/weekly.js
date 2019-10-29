import React, { Component } from 'react';
import {
  Card, CardBody, CustomInput,
  Label, FormGroup, Input, Form
} from 'reactstrap';

export default class CustomCron extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.onAtHourChange = this.onAtHourChange.bind(this);
        this.onAtMinuteChange = this.onAtMinuteChange.bind(this);
        this.onCheck = this.onCheck.bind(this);
    }
    

    onAtHourChange(e) {
        let val = this.state.value;
        val[0] = '0';
        val[2] = `${e.target.value}`;
        this.props.onChange(val)
    }
    onAtMinuteChange(e) {
        let val = this.state.value;
        val[0] = '0';
        val[1] = `${e.target.value}`;
        this.props.onChange(val)
    }

    onCheck(e) {
        let val = this.state.value;
        val[0] = '0';
        if(e.target.checked) {
            val[2] = (`${val[2]}`.split('/').length > 1) ? '0' : val[2].toString(); 
            val[3] = '?';
            val[4] = '*';
            if(val[5] === '*' || val[5] === '?' || val[5] === 'MON-FRI') {
                val[5] = e.target.value;
            } else {
                val[5] = val[5] + '!'+ e.target.value;
            }
        } else {
            val[5] = val[5].split('!');
            if(val[5].length > 1) {
                val[5].splice(val[5].indexOf(e.target.value), 1)
                val[5] = val[5].toString().replace(/,/g,'!')  
            }else  {
                val[5] = '*';
            }           
        }
       
        this.props.onChange(val)
    }
    render() {
        this.state.value = this.props.value;
        //
        return (
          <Card>
            <CardBody>
            <div className="well well-small row">
                <div className="span6 col-sm-6">
                    <div className="text_align_left">
                        <CustomInput id="MON" type="switch" label="Lunes" value="MON" onClick={this.onCheck} defaultChecked={(this.state.value[5].search('MON') !== -1 ) ? true : false} />
                        <CustomInput id="WED" type="switch" label="Miércoles" value="WED" onClick={this.onCheck} defaultChecked={this.state.value[5].search('WED') !== -1 ? true : false}  />
                        <CustomInput id="FRI" type="switch" label="Viernes" value="FRI" onClick={this.onCheck} defaultChecked={(this.state.value[5].search('FRI') !== -1 ) ? true : false}/>
                        <CustomInput id="SUN" type="switch" label="Domingo" value="SUN" onClick={this.onCheck} defaultChecked={this.state.value[5].search('SUN') !== -1 ? true : false}/>
                    </div>
                </div>
                <div className="span6 col-sm-6">
                    <div className="text_align_left">
                        <CustomInput id="TUE" type="switch" label="Martes" value="TUE" onClick={this.onCheck} defaultChecked={this.state.value[5].search('TUE') !== -1 ? true : false}/>
                        <CustomInput id="THU" type="switch" label="Jueves" value="THU" onClick={this.onCheck} defaultChecked={this.state.value[5].search('THU') !== -1 ? true : false}/>
                        <CustomInput id="SAT" type="switch" label="Sábado" value="SAT" onClick={this.onCheck} defaultChecked={this.state.value[5].search('SAT') !== -1 ? true : false}/>
                    </div><br /><br />
                </div>
            </div>
            <Form inline>
              <FormGroup className="mr-sm-4 ">
                <Label className="mr-sm-2">Hora de inicio</Label>
                <Input type="select" name="hours" onChange={this.onAtHourChange} value={this.state.value[2]}>
                    { this.getHours() }                    
                </Input>
              </FormGroup>
              <FormGroup className="mr-sm-4 ">
                <Input type="select" name="minutes" onChange={this.onAtMinuteChange} value={this.state.value[1]}>
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

