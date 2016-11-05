'use strict';

const contrib = require('blessed-contrib');
const moment = require('moment');
const SL = require('sl-api');

const {REALTIMEKEY, LOCATIONKEY} = require('../utils/config.js');

const sl = new SL({
    realtimeInformation: REALTIMEKEY,
    locationLookup: LOCATIONKEY,
}, 'json');

//  Every 5 min
const UPDATEFREQ = 5 * 60 * 1000;

const update = (emitter, table) => {
    const time = moment().format('LTS');
    table.setLabel(`SL timetable --- ${time}`);
    table.setData({
        headers: ['Line', 'To', 'Time'],
        data:
            [
                [1, 2, 3],
                [4, 5, 6]
            ]
    });
    emitter.emit('update');
};

const timetable = emitter => {
    const table = contrib.table({
        keys: true,
        fg: 'white',
        selectedFg: 'white',
        selectedBg: 'blue',
        interactive: true,
        width: '40%',
        height: '30%',
        border: {type: "line", fg: "cyan"},
        columnSpacing: 10,
        columnWidth: [16, 12, 12]
    });

    update(emitter, table);
    table.focus();

    setInterval(() => {
        update(emitter, table);
    }, UPDATEFREQ)
    return table;
};

module.exports = timetable;
