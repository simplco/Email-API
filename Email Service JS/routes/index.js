var express = require('express');
var router = express.Router();
const mailjet = require('node-mailjet')
  .connect("public-key", "private-key") //change
var axios = require('axios');

router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/email', function (req, res, next) {
  var data = {
    Useremail: 'email@email.com', //change
    CostYesterday: '5',
    CostThisWeek: '15',
    CostThisMonth: '100'
  };
  // var callback = axios.get('')   //the API call to the database-API Erick is working on
  // .then(response => {
  //   data = response.data;
  // })
  // .catch(error => {
  //   console.log(error);
  // });
  
  const html = `
    <h3>User email: ${data.Useremail}</h3><br>
    <h3>Yesterday's Cost: ${data.CostYesterday}</h3><br>
    <h3>This Week's Cost: ${data.CostThisWeek}</h3><br>
    <h3>This Month's Cost: ${data.CostThisMonth}</h3><br>`;
  const request = mailjet
    .post("send", { 'version': 'v3.1' })
    .request({
      "Messages": [{
        "From": {
          "Email": "email@email.com", //change
          "Name": "Mailjet Pilot"
        },
        "To": [{
          "Email": data.Useremail,
          "Name": "passenger 1"
        }],
        "Subject": "Your email flight plan!",
        "TextPart": "Dear passenger 1, welcome to Mailjet! May the delivery force be with you!",
        "HTMLPart": html
      }]
    })
  request
    .then((result) => {
      console.log(result.body)
    })
    .catch((err) => {
      console.log(err.statusCode)
    })
  res.sendStatus(200);
});

module.exports = router;
