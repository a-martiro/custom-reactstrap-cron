import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import React, { Component } from 'react';
import { Card, CardBody, Label, FormGroup, Input, Form, CustomInput } from 'reactstrap';

var CustomCron =
/*#__PURE__*/
function (_Component) {
  _inherits(CustomCron, _Component);

  function CustomCron(props) {
    var _this;

    _classCallCheck(this, CustomCron);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CustomCron).call(this, props));
    _this.state = {
      hour: 0,
      minute: 0
    };
    _this.onDayChange = _this.onDayChange.bind(_assertThisInitialized(_this));
    _this.onLastDayChange = _this.onLastDayChange.bind(_assertThisInitialized(_this));
    _this.onAtHourChange = _this.onAtHourChange.bind(_assertThisInitialized(_this));
    _this.onAtMinuteChange = _this.onAtMinuteChange.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(CustomCron, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      this.state.value = this.props.value;

      if (this.state.value[3] === 'L') {
        this.state.every = "2";
      } else if (this.state.value[3] === 'LW') {
        this.state.every = "3";
      } else if (this.state.value[3].startsWith('L')) {
        this.state.every = "4";
      } else {
        this.state.every = "1";
      }
    }
  }, {
    key: "onDayChange",
    value: function onDayChange(e) {
      if (parseInt(e.target.value) > 0 && parseInt(e.target.value) <= 31 || e.target.value == "") {
        var val = ['0', this.state.value[1] === '*' ? '0' : this.state.value[1], this.state.value[2] === '*' ? '0' : this.state.value[2], this.state.value[3], '1/1', '?', '*'];
        val[3] = "".concat(e.target.value);
        this.props.onChange(val);
      }
    }
  }, {
    key: "onLastDayChange",
    value: function onLastDayChange(e) {
      if (parseInt(e.target.value) >> 0 && parseInt(e.target.value) <= 31 || e.target.value == "") {
        var val = ['0', this.state.value[1] === '*' ? '0' : this.state.value[1], this.state.value[2] === '*' ? '0' : this.state.value[2], this.state.value[3], '1/1', '?', '*'];

        if (e.target.value == '') {
          val[3] = '';
        } else {
          val[3] = "L-".concat(e.target.value);
        }

        this.props.onChange(val);
      }
    }
  }, {
    key: "onAtHourChange",
    value: function onAtHourChange(e) {
      var val = this.state.value;
      val[2] = "".concat(e.target.value);
      this.props.onChange(val);
    }
  }, {
    key: "onAtMinuteChange",
    value: function onAtMinuteChange(e) {
      var val = this.state.value;
      val[1] = "".concat(e.target.value);
      this.props.onChange(val);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this,
          _React$createElement;

      this.state.value = this.props.value; //

      return React.createElement(Card, null, React.createElement(CardBody, null, React.createElement(Form, {
        inline: true
      }, React.createElement(FormGroup, {
        check: true
      }, React.createElement(Label, {
        check: true
      }, React.createElement(CustomInput, {
        id: "d/1",
        type: "radio",
        onChange: function onChange(e) {
          _this2.setState({
            every: e.target.value
          });

          _this2.props.onChange(['0', _this2.state.value[1] === '*' ? '0' : _this2.state.value[1], _this2.state.value[2] === '*' ? '0' : _this2.state.value[2], '1', '1/1', '?', '*']);
        },
        value: "1",
        name: "MonthlyRadio",
        checked: this.state.every === "1" ? true : false
      }), ' ', "D\xEDa \xA0", React.createElement("input", {
        className: "form-control",
        type: "Number",
        readOnly: this.state.every !== "1",
        value: this.state.value[3],
        onChange: this.onDayChange
      }), "\xA0 de cada mes"))), React.createElement("hr", null), React.createElement(Form, {
        inline: true
      }, React.createElement(FormGroup, {
        check: true
      }, React.createElement(Label, {
        check: true
      }, React.createElement(CustomInput, {
        id: "d/2",
        type: "radio",
        onChange: function onChange(e) {
          _this2.setState({
            every: e.target.value
          });

          _this2.props.onChange(['0', _this2.state.value[1] === '*' ? '0' : _this2.state.value[1], _this2.state.value[2] === '*' ? '0' : _this2.state.value[2], 'L', '*', '?', '*']);
        },
        value: "2",
        name: "DailyRadio",
        checked: this.state.every === "2" ? true : false
      }), ' ', "\xDAltimo d\xEDa de cada mes."))), React.createElement("hr", null), React.createElement(Form, {
        inline: true
      }, React.createElement(FormGroup, {
        check: true
      }, React.createElement(Label, {
        check: true
      }, React.createElement(CustomInput, (_React$createElement = {
        id: "d/3",
        type: "radio",
        onChange: function onChange(e) {
          _this2.setState({
            every: e.target.value
          });

          _this2.props.onChange(['0', _this2.state.value[1] === '*' ? '0' : _this2.state.value[1], _this2.state.value[2] === '*' ? '0' : _this2.state.value[2], 'LW', '*', '?', '*']);
        }
      }, _defineProperty(_React$createElement, "type", "radio"), _defineProperty(_React$createElement, "value", "3"), _defineProperty(_React$createElement, "name", "DailyRadio"), _defineProperty(_React$createElement, "checked", this.state.every === "3" ? true : false), _React$createElement)), ' ', "El \xFAltimo d\xEDa de la semana de cada mes."))), React.createElement("hr", null), React.createElement(Form, {
        inline: true
      }, React.createElement(FormGroup, {
        check: true
      }, React.createElement(Label, {
        check: true
      }, React.createElement(CustomInput, {
        id: "d/4",
        type: "radio",
        onChange: function onChange(e) {
          _this2.setState({
            every: e.target.value
          });

          _this2.props.onChange(['0', _this2.state.value[1] === '*' ? '0' : _this2.state.value[1], _this2.state.value[2] === '*' ? '0' : _this2.state.value[2], "L-".concat(1), '*', '?', '*']);
        },
        value: "4",
        name: "MonthlyRadio",
        checked: this.state.every === "4" ? true : false
      }), ' ', "\xA0", React.createElement("input", {
        className: "form-control",
        type: "Number",
        readOnly: this.state.every !== "4",
        value: this.state.value[3].split('-')[1],
        onChange: this.onLastDayChange
      }), "\xA0 D\xEDa(s) antes de fin de mes"))), React.createElement("hr", null), React.createElement(Form, {
        inline: true
      }, React.createElement(FormGroup, {
        className: "mr-sm-4 "
      }, React.createElement(Label, {
        for: "exampleEmail",
        className: "mr-sm-2"
      }, "Hora de inicio"), React.createElement(Input, {
        type: "select",
        name: "hours",
        onChange: this.onAtHourChange,
        value: this.state.value[2]
      }, this.getHours())), React.createElement(FormGroup, {
        className: "mr-sm-4 "
      }, React.createElement(Input, {
        type: "select",
        id: "DailyMinutes",
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