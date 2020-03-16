const request = require('request');

const geocode = (address, callback) => {
  const url =
    'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
    encodeURIComponent(address) +
    '.json?access_token=*************&limit=1';
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback(error, undefined);
    } else if (body.features.length === 0) {
      callback('Unable to find location', undefined);
    } else {
      const coordinates = body.features[0].center;
      callback(undefined, {
        latitude: coordinates[0],
        longtitude: coordinates[1],
        location: body.features[0].place_name
      });
    }
  });
};

module.exports = geocode;
