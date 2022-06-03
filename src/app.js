const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')
const port = process.env.PORT || 3000

app.set('view engine','hbs')
app.use(express.static(publicDirectoryPath))

app.get('/',(req, res) => {
    res.render('index',{
        title: "weather APPS",
        name: "keethu weds shaaa"
    })

})
app.get('/about',(req,res) => {
    res.render('about',{
        title: "any help",
        name: "how can i help youuuuu"
    })
})


app.get('/weather', (req, res) => {
   if (!req.query.address) {
       return res.send({
           error : 'you ,ist ptobifr en sdress'

   })

}
geocode(req.query.address, (error,{ latitude, longitude, location } ) =>{
if (error) {
    return res.send({error})

}
forecast(latitude, longitude ,(error, forecastdata ) => {
    if (error) {
        return res.send({error})
    
    }
    res.send({
        forecast: forecastdata,
        location,
        adress: req.query.address
    })
})

})
})
   
app.get('*',(req,res) =>{
    res.send('My 404 page')
})
app.get('/help/*',(req,res) =>{
    res.send('help article not visible')
})
app.get('*',(req,res) =>{
    res.send('My 404 page')
})

app.listen(port, () => {
    console.log('Server is up on port 3000.')
})