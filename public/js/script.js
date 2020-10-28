console.log("client side javascript")



const weatherInfo = document.querySelector('form')
const search   = document.querySelector('input')
const message1 = document.querySelector('#msg1')
const message2 = document.querySelector('#msg2')
const message3 = document.querySelector('#msg3')

weatherInfo.addEventListener('submit', (e) => {
    e.preventDefault()
    
    const location = search.value
    message1.textContent = "Loading......"
    message2.textContent = " "
    message3.textContent = " "

    fetch('/weather?search=' + location).then( (response) => {
        response.json().then((data) => {
           if(data.error){
             return  message1.textContent = data.error
           }
           else{
               console.log({
                   "location": location,
                   "time": 30
               })
               message1.textContent = data.location
               message2.textContent = data.forecastData.temperature
               message3.textContent = data.forecastData.description
           }
        } )
} )
} )