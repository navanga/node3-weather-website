

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

    fetch('/weather?address='+location).then((response) => {
        response.json().then((data) => {
    
            if(data.error) {
                messageTwo.textContent = data.error
                return;
            } else {
                messageOne.textContent = 'Current temperature of ' + data.location + ' is ' + data.forecast.currentTemp
                messageTwo.textContent = 'Feels like ' + data.forecast.feelsLike + '. The weather is '+ data.forecast.description
                console.log(data.location)
                console.log(data.forecast)
            }   
        })
    })

    console.log(location)
})