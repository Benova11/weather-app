const request = require('request');

const forcast = (latitude, longtitude, callback) => {
  const url =
    'https://api.darksky.net/forecast/8519c749a02206266fb34a57f9ddb20d/' +
    latitude +
    ',' +
    longtitude +
    '?units=ca';
  request({ url, json: true }, (error, { body }) => {
    callback(
      undefined,
      body.daily.data[0].summary +
        'it is currently ' +
        body.currently.temperature +
        ' degress out. Tere is a ' +
        body.currently.precipProbability +
        '% chance of rain.'
    );
  });
};

module.exports = forcast;
