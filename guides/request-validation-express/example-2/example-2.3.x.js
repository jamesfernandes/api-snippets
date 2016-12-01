// You can find your Twilio Auth Token here: https://www.twilio.com/console
// Which can be set at runtime as follows:
// $ TWILIO_AUTH_TOKEN=XXXXXXXXXXXXXXXXXXX node index.js
// Please note that this will not work unless you set the TWILIO_AUTH_TOKEN
// environment variable.

const twilio = require('twilio');
const app = require('express')();
const bodyParser = require('body-parser');
const TwimlResponse = twilio.TwimlResponse;

const shouldValidate = process.env.NODE_ENV !== 'test';

app.use(bodyParser.urlencoded({extended: false}));

app.post('/voice', twilio.webhook({validate: shouldValidate}), (req, res) => {
  // Twilio Voice URL - receives incoming calls from Twilio
  const response = new TwimlResponse();

  response.say(
    `Thanks for calling!
     Your phone number is ${req.body.From}. I got your call because of Twilio´s
     webhook.

     Goodbye!`
  );

  response.set('Content-Type', 'text/xml');

  res.send(response.toString());
});

app.post('/message', twilio.webhook({validate: shouldValidate}), (req, res) => {
  // Twilio Messaging URL - receives incoming messages from Twilio
  const response = new TwimlResponse();

  response.message(`Your text to me was ${req.body.Body.length} characters long.
                    Webhooks are neat :)`);

  response.set('Content-Type', 'text/xml');

  res.send(response.toString());
});

app.listen(3000);