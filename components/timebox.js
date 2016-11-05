'use strict';

const blessed = require('blessed');
const moment = require('moment');

//  Every second.
const UPDATEFREQ = 1000;

const timebox = emitter => {
    const box = blessed.box({
        top: 0,
        right: 0,
        width: '30%',
        height: '10%',
        tags: true,
        border: {
            type: 'line'
        },
        style: {
            fg: 'white',
            bg: 'magenta',
            border: {
                fg: '#f0f0f0'
            }
        }
    });

    setInterval(() => {
        const time = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");
        box.setContent(`{center}${time}{/center}`);
        emitter.emit('update');
    }, UPDATEFREQ)
    return box;
};

module.exports = timebox;
