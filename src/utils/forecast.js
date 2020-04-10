/**
 * http://usejsdoc.org/
 */
const request = require('request')

const forecast = (latitude, longitude, callback) => {
	console.log("latitude :"+latitude+ " longitude "+longitude)
	const url = 'http://api.weatherstack.com/current?access_key=79bf86e3ce2ff5ad9d7141cc74d259a9&query='+longitude+','+latitude
	
	// request( { url, json: true}, (error, response) => {
	//Using Destructuring, if we are not using destructuring we need to fetch data
	//like response.body.location.name
	request( { url, json: true}, (error, {body}) => {
		if(error) {
			console.log("Unable to connect to the service...")
			callback('Unable to connect to the service...', undefined)
		} else if(body.error) {
			console.log("Unable to find location..")
			callback('Unable to find location..', undefined)
		}else {
			
			console.log('Sending success message')
			//callback( undefined, body.location.name+ " The temprature at "+body.current.observation_time+ " is "+body.current.temperature)
			callback( undefined, {
				location: body.location.name,
				time: body.current.observation_time,
				temperature: body.current.temperature,
				weatherDescription: body.current.weather_descriptions
			})
		}
	})
}
	module.exports = forecast
	
	
