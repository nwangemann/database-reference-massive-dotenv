require('dotenv').config();

const express = require('express');
const massive = require('massive')
const {SERVER_PORT, CONNECTION_STRING} = process.env;
const app = express();
const ctrl = require('./db/controller/studentsCtrl')
app.use(express.json());

massive(CONNECTION_STRING)
.then(db => {
    app.set("db", db)
    console.log('connected to db')
})

app.get('/api/students', ctrl.getAllStudents)
app.post('/api/student', ctrl.addStudent)
app.put('/api/student/:id', ctrl.editStudentName)
app.delete('/api/delete/:id', ctrl.deleteStudent)

app.listen(SERVER_PORT, () => console.log(`Servin up some heat on Port ${SERVER_PORT}`))