const express = require('express');
const request = require('request');
const uuid = require('uuid');
const app = express();

app.get('/api', (req, res) => {
    // Generate a random JWT token.
    const token = uuid.v4();
    res.send({ token });
});

app.get('/api/tracking', (req, res) => {
  // Get the tracking data.
  const trackingNumber = req.query.tracking_number;
  const options = {
    url: `https://bps.bringer.io/public/api/v2/get/parcel/tracking.json?tracking_number=${trackingNumber}`,
    headers: {
      'Authorization': 'Bearer ' + req.headers.authorization
    },
    json: true
  };

  request(options, (error, response, body) => {
    if (error) {
      console.error(error);
      res.sendStatus(500);
      return;
    }

    res.json(body);
  });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {console.log(`Server started on port ${port}`)});