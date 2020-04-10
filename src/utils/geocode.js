/**
 * http://usejsdoc.org/
 */

const request = require('request')

	const geocode = (address, callback) => {
		
		const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoicmFodWxtZyIsImEiOiJjazhvOXA2enQwNHE5M2xza3B5dWdxdmIwIn0.lUKUn7jUHgd_g42ldYh3IQ&limit=1'
		console.log("url : " +url)
		//Without destructuring
		//request({url, json: true}, (error, {response}) => {
		//Using  destructuring
		request({url, json: true}, (error, {body}) => {
			console.log("body : "+body.features)
			if(error) {
				callback('Unable to connect to service', undefined )
			} else if (body.features.length === 0){ 
				console.log(" 2nd ...")
				callback('Unable to find location ', undefined)
			} else {
				console.log(" 3rd ...")
				callback(undefined, {
					latitude: body.features[0].center[0],
					logitude: body.features[0].center[1],
					location: body.features[0].place_name
				})
				
			}
		})
	}
	
	
	module.exports = geocode