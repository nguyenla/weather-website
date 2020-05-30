const express = require("express")
const hbs = require("hbs")
const path = require("path")
const geocode = require("./utils/geocode")
const weather_forecast = require("./utils/weather_forecast")

// Define paths for express
const public_dir_path = path.join(__dirname, "../public")
const partialsPath = path.join(__dirname, "../templates/partials")
const viewsPath = path.join(__dirname, "../templates/views")

const app = express()
app.set("view engine", "hbs")
app.set("views", viewsPath)
hbs.registerPartials(partialsPath)

// Set up static directory to serve
app.use(express.static(public_dir_path))

app.get("", (req, res) => {
    res.render("index", {
        name: "Lam Nguyen",
        title: "Weather"
    })
})

app.get("/about", (req, res) => {
    res.render("about", {
        name: "Lam Nguyen",
        title: "About me"
    })
})

app.get("/help", (req, res) => {
    res.render("help", {
        name: "Lam Nguyen",
        title: "Help",
        helpText: "Help page here."
    })
})

app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide an address."
        })
    }

    geocode(req.query.address, (error, {location, longitude, latitude} = {} ) => {
        if (error) {
            return res.send({ error })
        }
        weather_forecast(longitude, latitude, (error, forecast_data) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                address: req.query.address,
                forecast: forecast_data,
                temperature: forecast_data.temperature,
                feelslike: forecast_data.feelslike,
                description: forecast_data.description,
                humidity: forecast_data.humidity
            })
            console.log("Location: ", location)
            console.log("Forecast data: ", forecast_data)
        })
    })
})

app.get("/products", (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term."
        })
    }
    res.send({
        products: []
    })
})

app.get("/help/*", (req, res) => {
    res.render("404", {
        name: "Lam Nguyen",
        title: "404 page",
        errorMessage: "Help article not found"
    })
})

app.get("*", (req, res) => {
    res.render("404", {
        name: "Lam Nguyen",
        title: "404 page",
        errorMessage: "Page not found"
    })
})

const PORT = process.env.PORT || 3000 // default to 3000 for local testing
app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})