const express = require('express')
const app = express()
const port = 5000

app.get('/', (req, res) => {
    res.send("Hello Salman")
})

app.listen(port, () =>{
    console.log('Listening on port 5000 successful')
})