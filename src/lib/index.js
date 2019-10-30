import React, { Component } from 'react';
import cronstrue from 'cronstrue/i18n';
import Once from './once';
import Minutes from './minutes';
import Daily from './daily';
import Hourly from './hourly';
import Weekly from './weekly';
import Monthly from './monthly';
import Yearly from './yearly';
import { Card, CardBody, Nav, NavItem, NavLink, Jumbotron, Alert } from 'reactstrap';

const defaultTabs = ['Una vez', 'Minutos', 'Cada hora', 'Diario', 'Semanal', 'Mensual'] //,'Yearly'
const date = new Date();
const defaultTabsVal = {
    'Una vez': [ //Now
        '0', 
        '0', 
        (date.getHours() < 23 ? date.getHours() + 1 : 23).toString(),
        date.getDate().toString(),
        (date.getMonth() + 1).toString(),
        '?',
        date.getFullYear().toString()
    ],
    'Minutos': ['0','0/1','*','*','*','?','*'],
    'Cada hora': ['0','0','0/1','*','*','?','*'],
    'Diario': ['0','0','00','1/1','*','?','*'],
    'Semanal': ['0','0','00','?','*','*','*'],
    'Mensual':['0','0','00','1','1/1','?','*']
};
let tabs = [];
export default class CustomCron extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        tabs = props.tabs || defaultTabs;
    }

    componentWillMount() {
        if(!this.props.value || this.props.value.split(' ').length !== 7 ) {
            this.state.value = defaultTabsVal[tabs[0]];
            this.state.selectedTab = tabs[0];
            this.parentChange(this.state.value)
        } else  {
            this.state.value = this.props.value.replace(/,/g, '!').split(' ');
        }
        let val = this.state.value;
        if((val[6] !== '*')) {
            this.state.selectedTab = defaultTabs[0];
        } else if((val[1].search('/') !== -1) && (val[2] == '*') && (val[3] == '1/1')) {
            this.state.selectedTab = defaultTabs[1];
        } else if((val[2].search('/') !== -1)) {
            this.state.selectedTab = defaultTabs[2];
        } else if((val[3].search('/') !== -1) || (val[5] == 'MON-FRI')) {
            this.state.selectedTab = defaultTabs[3];
        } else if (val[3] === '?') {
            this.state.selectedTab = defaultTabs[4];
        } else if (val[3].startsWith('L') || val[5] === '1/1') {
            this.state.selectedTab = defaultTabs[5];
        } else {
            this.state.selectedTab = tabs[0];
        }
       
    }

    defaultValue(tab) {
       return defaultTabsVal[tab];
    }

    tabChanged(tab) {
        this.setState({selectedTab:tab, value:this.defaultValue(tab)}); 
        this.parentChange(this.defaultValue(tab))
    }

    getHeaders() {
      return tabs.map(d => {  
        return (
          <NavItem key={`navItem-${d}`}>
            <NavLink key={`navLink-${d}`}
              onClick={this.tabChanged.bind(this,d)} 
              active={this.state.selectedTab === d}>{d}</NavLink>
          </NavItem>
        )
      })
    }

    onValueChange(val) {     
        if(val && val.length) {
            this.setState({value:val})
        } else { 
            this.setState({value:['0','0','00','*','*','?','*']})
            val = ['0','0','00','*','*','?','*'];
        }
       this.parentChange(val)
    }

    parentChange(val) {
        let newVal = ''
        newVal = val.toString().replace(/,/g,' ')
        newVal = newVal.replace(/!/g, ',')
        console.log(newVal);
        this.props.onChange(newVal) 
    }

    getVal() {
        let val = cronstrue.toString(this.state.value.toString().replace(/,/g,' ').replace(/!/g, ','), { locale: "es" })
        if(val.search('undefined') === -1) {
            return val;
        }
        return '-'
    }

    getComponent(tab) {
        switch(tab) {
            case defaultTabs[0] : 
                return <Once key={`nav-${tab}`} value={this.state.value} hours={this.props.hours} minutes={this.props.minutes} onChange={this.onValueChange.bind(this)}/>
            case defaultTabs[1] : 
                return <Minutes key={`nav-${tab}`} value={this.state.value} onChange={this.onValueChange.bind(this)}/>
            case defaultTabs[2] : 
                return <Hourly key={`nav-${tab}`} value={this.state.value} hours={this.props.hours} minutes={this.props.minutes} onChange={this.onValueChange.bind(this)}/>
            case defaultTabs[3] : 
                return <Daily key={`nav-${tab}`} value={this.state.value} hours={this.props.hours} minutes={this.props.minutes} onChange={this.onValueChange.bind(this)}/>
            case defaultTabs[4] : 
                return <Weekly key={`nav-${tab}`} value={this.state.value} hours={this.props.hours} minutes={this.props.minutes} onChange={this.onValueChange.bind(this)}/>
            case defaultTabs[5] : 
                return <Monthly key={`nav-${tab}`} value={this.state.value} hours={this.props.hours} minutes={this.props.minutes} onChange={this.onValueChange.bind(this)}/>
            case defaultTabs[6] : 
                return <Yearly key={`nav-${tab}`} value={this.state.value} hours={this.props.hours} minutes={this.props.minutes} onChange={this.onValueChange.bind(this)}/>
            default: 
                return
        }
    }

    resultText() {
      if (this.props.showResultText || this.props.showResultCron) {
        return (
          <div>
            <hr className="my-4" />
            <Alert color="success">
              { this.props.showResultText && <p>{this.getVal()}</p> }
              <hr />
  
              { this.props.showResultCron && 
                <p className="mb-0">
                  { this.state.value.toString().replace(/,/g,' ').replace(/!/g, ',') }
                </p> }
            </Alert>
          </div>
        )
      }
    }

    render() {
      return (
          <div>
            { this.props.style && <style>{this.props.style}</style> }
            <Jumbotron key="jumbo">
                <Nav tabs key="tabs">
                    { this.getHeaders() }
                </Nav>
                <Card key="cont">
                  <CardBody key="contBody">
                    { this.getComponent(this.state.selectedTab) }
                    { this.resultText() }
                  </CardBody>
                </Card>
            </Jumbotron>
          </div>
      )
    }
}

