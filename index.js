const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')

const app = express()
const port = process.env.PORT || 5000

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

// Listen on environment port or 5000
app.listen(port, () =>{
    console.log('Listening on port 5000 successful')
})

// MySQL todoreact

const pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'localhost',
    user            : 'root',
    password        : '',
    database        : 'todoreact'

})


// Get All records
app.get('/', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected at id ${connection.threadId}`)

        // query(queryString, callBack)
        connection.query('SELECT * FROM todos', (err, rows) => {
            connection.release() // return connection to pool

            if(!err) {
                res.send(rows)
            } else {
                console.log(err)
            }
        })
    })
})

// Get a record by ID
app.get('/:id', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected at id ${connection.threadId}`)

        // query(queryString, callBack)
        connection.query('SELECT * FROM todos WHERE id = ?', [req.params.id], (err, rows) => {
            connection.release() // return connection to pool

            if(!err) {
                res.send(rows)
            } else {
                console.log(err)
            }
        })
    })
})


// Delete a record by ID
app.delete('/:id', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected at id ${connection.threadId}`)

        // query(queryString, callBack)
        connection.query('DELETE FROM todos WHERE id = ?', [req.params.id], (err, rows) => {
            connection.release() // return connection to pool

            if(!err) {
                res.send(`Deleted Sussess: id- ${req.params.id}`)
            } else {
                console.log(err)
            }
        })
    })
})

// Add new task
app.post('', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected at id ${connection.threadId}`)

        // query(queryString, callBack)
        connection.query('INSERT INTO todos SET ?', req.body, (err, rows) => {
            connection.release() // return connection to pool

            if(!err) {
                res.send(`New Task added with id:-`)
            } else {
                console.log(err)
            }
        })
    })
})

// Update a Task
app.put('', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected at id ${connection.threadId}`)

        const {id, title, description} = req.body

        // query(queryString, callBack)
        connection.query("UPDATE todos SET title = ?, description = ? WHERE id = ?", [title, description, id], (err, rows) => {
            connection.release() // return connection to pool

            if(!err) {
                res.send(`New Task added with id:-`)
            } else {
                console.log(err)
            }
        })
    })
})