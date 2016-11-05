'use strict';

const contrib = require('blessed-contrib');
const moment = require('moment');
const yahoo = require('weather-yahoo');

//  Every 5 min
const UPDATEFREQ = 5 * 60 * 1000;

const weather = emitter => {
    const update = (emitter, lcd) => {
        const toCelsius = f => Math.floor((5.0/9.0) * (f - 32));
        const degreeSign = String.fromCharCode(0x00B0);

        yahoo.getSimpleWeather('stockholm')
            .then(({weather}) => {
                const time = moment().format('LTS');
                const C = toCelsius(weather.temperature.value);
                lcd.setLabel(`Temperature ${degreeSign}C -- ${time}`);
                lcd.setDisplay(`${C}C`);
                emitter.emit('update');
            });
    };

    const lcd = contrib.lcd({
        bottom: 0,
        right: 0,
        width: '30%',
        height: '40%',
        segmentWidth: 0.06,
        segmentInterval: 0.010,
        display: 'NULL',
        strokeWidth: 0.11,
        border: {type: "line", fg: "cyan"},
        elements: 4,
        elementSpacing: 4,
        elementPadding: 1,
        color: 'white',
    });

    update(emitter, lcd);

    setInterval(() => {
        update(emitter, lcd);
    }, UPDATEFREQ)
    return lcd;
};

module.exports = weather;

