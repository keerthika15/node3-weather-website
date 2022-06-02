const { response } = require("express")

console.log('client side javascript is loaded')
fetch('http://puzzle.mead.io/puzzle').then((reesponse) => {
    response.json().then (data) => {
        console.log(data)
    }
})