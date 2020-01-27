import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import React, { Component } from 'react';
import { Card, CardBody, CustomInput, Label, FormGroup, Input, Form } from 'reactstrap';

var CustomCron =
/*#__PURE__*/
function (_Component) {
  _inherits(CustomCron, _Component);

  function CustomCron(props) {
    var _this;

    _classCallCheck(this, CustomCron);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CustomCron).call(this, props));
    _this.state = {};
    _this.onAtHourChange = _this.onAtHourChange.bind(_assertThisInitialized(_this));
    _this.onAtMinuteChange = _this.onAtMinuteChange.bind(_assertThisInitialized(_this));
    _this.onCheck = _this.onCheck.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(CustomCron, [{
    key: "onAtHourChange",
    value: function onAtHourChange(e) {
      var val = this.state.value;
      val[0] = '0';
      val[2] = "".concat(e.target.value);
      this.props.onChange(val);
    }
  }, {
    key: "onAtMinuteChange",
    value: function onAtMinuteChange(e) {
      var val = this.state.value;
      val[0] = '0';
      val[1] = "".concat(e.target.value);
      this.props.onChange(val);
    }
  }, {
    key: "onCheck",
    value: function onCheck(e) {
      var val = this.state.value;
      val[0] = '0';

      if (e.target.checked) {
        val[2] = "".concat(val[2]).split('/').length > 1 ? '0' : val[2].toString();
        val[3] = '?';
        val[4] = '*';

        if (val[5] === '*' || val[5] === '?' || val[5] === 'MON-FRI') {
          val[5] = e.target.value;
        } else {
          val[5] = val[5] + '!' + e.target.value;
        }
      } else {
        val[5] = val[5].split('!');

        if (val[5].length > 1) {
          val[5].splice(val[5].indexOf(e.target.value), 1);
          val[5] = val[5].toString().replace(/,/g, '!');
        } else {
          val[5] = '*';
        }
      }

      this.props.onChange(val);
    }
  }, {
    key: "render",
    value: function render() {
      this.state.value = this.props.value; //

      return React.createElement(Card, null, React.createElement(CardBody, null, React.createElement("div", {
        className: "well well-small row"
      }, React.createElement("div", {
        className: "span6 col-sm-6"
      }, React.createElement("div", {
        className: "text_align_left"
      }, React.createElement(CustomInput, {
        id: "MON",
        type: "switch",
        label: "Monday",
        value: "MON",
        onClick: this.onCheck,
        defaultChecked: this.state.value[5].search('MON') !== -1 ? true : false
      }), React.createElement(CustomInput, {
        id: "WED",
        type: "switch",
        label: "Wednesday",
        value: "WED",
        onClick: this.onCheck,
        defaultChecked: this.state.value[5].search('WED') !== -1 ? true : false
      }), React.createElement(CustomInput, {
        id: "FRI",
        type: "switch",
        label: "Friday",
        value: "FRI",
        onClick: this.onCheck,
        defaultChecked: this.state.value[5].search('FRI') !== -1 ? true : false
      }), React.createElement(CustomInput, {
        id: "SUN",
        type: "switch",
        label: "Sunday",
        value: "SUN",
        onClick: this.onCheck,
        defaultChecked: this.state.value[5].search('SUN') !== -1 ? true : false
      }))), React.createElement("div", {
        className: "span6 col-sm-6"
      }, React.createElement("div", {
        className: "text_align_left"
      }, React.createElement(CustomInput, {
        id: "TUE",
        type: "switch",
        label: "Tuesday",
        value: "TUE",
        onClick: this.onCheck,
        defaultChecked: this.state.value[5].search('TUE') !== -1 ? true : false
      }), React.createElement(CustomInput, {
        id: "THU",
        type: "switch",
        label: "Thursday",
        value: "THU",
        onClick: this.onCheck,
        defaultChecked: this.state.value[5].search('THU') !== -1 ? true : false
      }), React.createElement(CustomInput, {
        id: "SAT",
        type: "switch",
        label: "Saturday",
        value: "SAT",
        onClick: this.onCheck,
        defaultChecked: this.state.value[5].search('SAT') !== -1 ? true : false
      })), React.createElement("br", null), React.createElement("br", null))), React.createElement(Form, {
        inline: true
      }, React.createElement(FormGroup, {
        className: "mr-sm-4 "
      }, React.createElement(Label, {
        className: "mr-sm-2"
      }, "Begin at"), React.createElement(Input, {
        type: "select",
        name: "hours",
        onChange: this.onAtHourChange,
        value: this.state.value[2]
      }, this.getHours())), React.createElement(FormGroup, {
        className: "mr-sm-4 "
      }, React.createElement(Input, {
        type: "select",
        name: "minutes",
        onChange: this.onAtMinuteChange,
        value: this.state.value[1]
      }, this.getMinutes())))));
    }
  }, {
    key: "getHours",
    value: function getHours() {
      var hours = [];
      var leap = parseInt(this.props.hours) || 1;

      for (var i = 0; i < 24; i = i + leap) {
        hours.push(React.createElement("option", {
          key: i,
          id: i,
          value: i < 10 ? "0".concat(i) : i
        }, i < 10 ? "0".concat(i) : i));
      }

      return hours;
    }
  }, {
    key: "getMinutes",
    value: function getMinutes() {
      var minutes = [];
      var leap = parseInt(this.props.minutes) || 1;

      for (var i = 0; i < 60; i = i + leap) {
        minutes.push(React.createElement("option", {
          key: i,
          id: i,
          value: i < 10 ? "0".concat(i) : i
        }, i < 10 ? "0".concat(i) : i));
      }

      return minutes;
    }
  }]);

  return CustomCron;
}(Component);

export { CustomCron as default };