# custom-reactstrap-cron

Componente Reactstrap personalizable simple para generar expresión cron adaptado al español

## Getting Started

El paquete ayuda a construir la expresión cron del planificador personalizado de Linux.
Asegúrese de incluir bootstrap en su proyecto

```
data = '* * * * * * *'
```
```
npm install custom-reactstrap-cron
```
```
yarn add custom-reactstrap-cron
```


```
import React, { Component } from 'react'
import CustomCron from 'custom-reactstrap-cron'
import 'custom-reactstrap-cron/dist/cron-builder.css'


class App extends Component {

  constructor(props) {
      super(props);
      this.state = {
       
      };
      this.cronStyle = `
        .cron_builder {
          width: 90%;
        }

        .cron_builder_bordering {
          text-align: left;
        }

        .nav-tabs {
          border-bottom: 1px solid #ddd;
        }

        .tab-content>.active {
          display: block;
        }

        .row {
          margin-right: -15px;
          margin-left: -15px;
        }
      `
  }

  render() {
    return (<div>
      <CustomCron
        onChange={(e)=> {this.setState({value:e}); console.log(e)}}
        value={this.state.value}
        tabs={['Daily','Weekly', 'Monthly']}
        hours={2}
        minutes={15}
        style={this.cronStyle}
        showResultText={true}
        showResultCron={true}
        />
                            
    </div>)
  }
}

export default App;

```
## props

| Prop | Description | Default
| --- | --- | -- |
| value | cron expression  |  |
| onChange |  |  |
| tabs | set tabs list | ['Once', 'Minutes','Hourly','Daily','Weekly', 'Monthly'] |
| style | change style use existing classes: cron_builder, cron_builder_bordering, nav, nav-tabs, row, well, tab-content, active, col-md-6, col-sm-6 |  |
| hours | set hours leaps | 1 |
| minutes | set minutes leaps | 1 |
| showResultText | show in readable text format | false |
| showResultCron | show cron expression | false | 

