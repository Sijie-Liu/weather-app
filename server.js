const express = require('express')
const bodyParser = require('body-parser');
const request = require('request');
const app = express()
const apiKey = '08d0f8103f674f19cc17e3a35d79f113';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'))

app.set('view engine', 'ejs')

app.get('/', function (req, res) {
    res.render('index', {weather: null, error: null});
})

app.post('/', function (req, res) {
    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
    request(url, function (err, response, body) {
        if(err){
            console.log('we get an error ' + err)
            res.render('index', {weather: null, error: 'Error, please try again'});
        } else {
            console.log('no error.')
            let weather = JSON.parse(body)
            if(weather.main == undefined){
                console.log('main is undefined.')
                res.render('index', {weather: null, error: 'Error, please try again'});
            } else {
                console.log('main is defined.')
                let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
                res.render('index', {weather: weatherText, error: null});
            }
        }
    });
})

app.listen(80, function () {
  console.log('Example app listening on port 80!')
})
