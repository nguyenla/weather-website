const weather_form = document.querySelector("form")
const search = document.querySelector("input")
const messageOne = document.querySelector("#message-1")
const messageTwo = document.querySelector("#message-2")

weather_form.addEventListener("submit", (event) => {
    event.preventDefault()
    const location = search.value
    messageOne.textContent = "Loading weather for " + location
    messageTwo.textContent = ""

    weather_url = "/weather?address=" + location
    console.log("Fetching ", weather_url)
    fetch(weather_url).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            }
            else {
                messageOne.textContent = "Location: " + data.address
                messageTwo.textContent = "It is " + data.description + ", with a temperature of "
                    + data.temperature + ", feels like " + data.feelslike + ". Humidity is "
                    + data.humidity + "%."
            }
        })
    })
})