const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const port = 3000;
const https = require("https");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
app.post("/", (req, res) => {
  const cityName = req.body.cityName;
  console.log(cityName);
  const unit = "metric";
  console.log(unit);
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${unit}&appid=8f960c929117b6bf713f4e7bc604f7c5`;
  https.get(url, (response) => {
    response.on("data", (data) => {
      const weatherData = JSON.parse(data);
      console.log(weatherData);

      const temp = Math.floor(weatherData.main.temp);
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
      const Humidity = weatherData.main.humidity;
      const wind = weatherData.wind;
      const pressure = weatherData.main.pressure;
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      const today = new Date();
      const Day = today.toLocaleDateString("en-US", options);
      res.render("index", {
        Date: Day,
        Temp: temp,
        Hum: Humidity,
        Wind: wind,
        Pre: pressure,
        Img: imageURL,
      });
    });
  });
});

app.listen(port, () => {
  console.log("server is running on port " + port);
});
