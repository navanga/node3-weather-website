console.log('Client side javascript is loaded')

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

// messageOne.textContent = 'Fomsdf sdf sdf'

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    const location = search.value    

    fetch('http://localhost:3000/weather?address='+location).then((response) => {
        response.json().then((data) => {
    
            if(data.error) {
                messageTwo.textContent = data.error
                return;
            } else {
                messageOne.textContent = 'Current temperature of ' + data.location + ' is ' + data.forecast.currentTemp
                messageTwo.textContent = 'Feels like ' + data.forecast.feelsLike
                console.log(data.location)
                console.log(data.forecast)
            }   
        })
    })

    console.log(location)
})