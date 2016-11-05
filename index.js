#!/usr/bin/env node

'use strict';

const blessed = require('blessed');
const EventEmitter = require('events');

var console = {};
console.log = function(){};

const emitter = new EventEmitter();
const screen = blessed.screen({
    smartCSR: true,
    terminal: 'xterm-256color',
    fullUnicode: true
});

screen.title = 'Home widgets';
screen.key(['escape', 'q', 'C-c'], (ch, key) => process.exit(0));

[
    require('./components/timebox.js')(emitter),
    require('./components/weather.js')(emitter),
    require('./components/timetable.js')(emitter),
].forEach(component => screen.append(component));

screen.render();
emitter.on('update', () => screen.render());
