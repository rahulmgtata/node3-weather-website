const path = require('path') //Core Module
const express = require('express')
const hbs = require('hbs')

const publicDirectoryPath = path.join(__dirname, '../public')
console.log("publicDirectoryPath : "+publicDirectoryPath)
const app = express()
const port = process.env.PORT || 3000

//Import for forecast and geocode
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//Tell express which template engine / handle bars is installed
app.set('view engine', 'hbs')

//While using Handle bars the default path for views in the views folder.We can also create custom 
//folder by changing the name of the views folder to templates. So in this case if we run the 
//page we will get error.
//So archive custom path for views follow as below
const viewspath = path.join(__dirname, '../templates/views')
const partialspath = path.join(__dirname, '../templates/partials')

app.set('views', viewspath)
hbs.registerPartials(partialspath)

//These are the route handlers
app.get('/', (req, resp) => {
    //First argument : Name of the page tobe rendered
    //Seconf argument : The Object
    resp.render('index', {
        title:"Weather",
        name: "Andrew"
    })
})

app.get('/about', (req, resp) => {
    resp.render('about', {
        title:"About me",
        name: "Andrew"
    })

})

app.get('/help', (req, resp) => {
    resp.render( 'help', {
        title: ' Help Page',
        name: 'Rahul M G'
    })

})

//The above code checks for index.html file, if available it display the details,
//else moves to the default configuration below. NOTE : name "index" is what is 
//web server searches for.

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.send('<h1>Weather</h1>')
})

// app.get('/help', (req, res) => {
    
//     console.log('Help Page')
//     res.send({
//         name: 'Andrew',
//         age: 27
//     })
// })

// app.get('/about', (req, resp) => {
//   app.use(express.static(publicDirectoryPath+'/about'))
// })

app.get('/weather', (req, res) => {

    if(!req.query.address) {
        return res.send({
            error: 'Search parameter - Address missing'
        })
    }

    geocode(req.query.address, (error, {latitude, logitude} = {}) => {

        if(error) {
            console.log("Error ...GEOCODE")
            return res.send({ error })
        } 
      
        // console.log(JSON.stringify(logitude))

        forecast(JSON.stringify(latitude), JSON.stringify(logitude), (error, data) => {
            if(error) {
                return res.send({ error  })
            } 
            res.send({
                location: data.location,
				time: data.time,
                temperature: data.temperature,
                weatherDescription: data.weatherDescription
            })
            console.log("Error " +error)
            console.log("Data " +data)
        })
    })

    // res.send(
    //     {
    //         location: "India",
    //         forecast: "34 degree celcius",
    //         address: req.query.address

    // })
})

app.get('/products', (req, resp) => {
    if(!req.query.search) {
       return  resp.send({
            error: 'You have missed the search param'
        })
    }
    console.log(req.query.search)
    resp.send({
        products: []
    })
})
app.get('/help/*', (req, resp) => {
    
    resp.render('error', {
        errorMessage: 'Help article not found'
    })

})

app.get('*', (req, resp) => {
        resp.render('error', {
            errorMessage: 'Page not found'

        })
})

app.listen(port, () => {
    console.log('Server is up onport '+port)
})