console.log('client side JS')

fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data)
    })
})


// If we do as below the page will be re-freshed.
// const weatherForm = document.querySelector('form')
// weatherForm.addEventListener('submit', () => {
//     console.log('Testing')

// })

//In this case the page will not be refreshed.
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2') 
const message3 = document.querySelector('#message-3') 

weatherForm.addEventListener('submit', (e) => {
    //THis will restrict page reload
    e.preventDefault()

    const location = search.value
    message1.textContent = 'Loading ....'
    message2.textContent = ''
    message3.textContent = ''
    //USe http://localhost:3000/weather?address to test locally 
    fetch('/weather?address='+location).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                console.log(data.error)              
                message1.textContent = data.error
               
            } else {
                console.log(data.location+ "  "+data.temperature)
                message1.textContent = data.location + " at " + data.time
                message2.textContent = "Temperature is " + data.temperature
                message3.textContent =  "Weather is " + data.weatherDescription
               
            }
       })
    })
    

})