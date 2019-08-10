"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var hyperapp_1 = require("hyperapp");
var computer = {
    "+": function (a, b) { return a + b; },
    "-": function (a, b) { return a - b; },
    "×": function (a, b) { return a * b; },
    "÷": function (a, b) { return a / b; }
};
var initialState = {
    fn: "",
    carry: 0,
    value: 0,
    hasCarry: false
};
var Clear = function () { return initialState; };
var NewDigit = function (state, number) { return (__assign({}, state, { hasCarry: false, value: (state.hasCarry ? 0 : state.value) * 10 + number })); };
var NewFunction = function (state, fn) { return (__assign({}, state, { fn: fn, hasCarry: true, carry: state.value, value: state.hasCarry || !state.fn
        ? state.value
        : computer[state.fn](state.carry, state.value) })); };
var Equal = function (state) { return (__assign({}, state, { hasCarry: true, carry: state.hasCarry ? state.carry : state.value, value: state.fn
        ? computer[state.fn](state.hasCarry ? state.value : state.carry, state.hasCarry ? state.carry : state.value)
        : state.value })); };
var Calculator = function (state) {
    return hyperapp_1.h("main", {}, [
        Display(state.value),
        Keypad([
            Functions({ keys: Object.keys(computer) }),
            Digits({ keys: [7, 8, 9, 4, 5, 6, 1, 2, 3, 0] }),
            AC,
            EQ
        ])
    ]);
};
var Display = function (value) { return hyperapp_1.h("div", { class: "display" }, value); };
var Keypad = function (children) { return hyperapp_1.h("div", { class: "keys" }, children); };
var Functions = function (props) {
    return props.keys.map(function (fn) {
        return hyperapp_1.h("button", { class: "function", onClick: [NewFunction, fn] }, fn);
    });
};
var Digits = function (props) {
    return props.keys.map(function (digit) {
        return hyperapp_1.h("button", { class: { zero: digit === 0 }, onClick: [NewDigit, digit] }, digit);
    });
};
var AC = hyperapp_1.h("button", { onClick: Clear }, "AC");
var EQ = hyperapp_1.h("button", { onClick: Equal, class: "equal" }, "=");
hyperapp_1.app({
    init: initialState,
    view: Calculator,
    node: document.getElementById("app")
});
//# sourceMappingURL=app.js.map