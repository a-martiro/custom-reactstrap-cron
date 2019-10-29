import React, { Component } from 'react';
import {
  Card, CardBody, Label, FormGroup, Form
} from 'reactstrap';

export default class CustomCron extends Component {
    constructor(props) {
        super(props);
        this.state = {
          
        };
    }

    onChange(e) {
        if((e.target.value > 0 && e.target.value < 60) || e.target.value == '') {
            let val = ['0','*','*','*','*','?','*']
            
            if(e.target.value == '') {
                val[1] = '';
            } else {
                val[1] = `0/${e.target.value}`;
            }
            this.props.onChange(val)
        } 
    }
    
    render() {
        this.state.value = this.props.value
        return (
          <Card>
            <CardBody>
              <Form inline>
                <FormGroup>
                  <Label>
                    Cada &nbsp;
                    <input className="form-control" type="Number" onChange={this.onChange.bind(this)} value={this.state.value[1].split('/')[1]} min={1} max={60} />
                    &nbsp; Minuto(s)
                  </Label>
                </FormGroup>
              </Form>
            </CardBody>
          </Card>
        )
    }
}
