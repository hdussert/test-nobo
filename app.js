const express = require('express')
const app = express()
const port = 4242
const divideStringLengthByN = require('./p1').divideStringLengthByN;
const getNbDays = require('./p2').getNbDays;
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// P1 - Takes str and n as url parameters
// Respond with the size of str divided by n 
app.get('/api/p1', (req, res) => { // /api/p1?str=test&n=8 >0.5
  let { str, n } = req.query;
  res.send(divideStringLengthByN(str,n));
})

// P2 - Takes date_start and date_end
// Respond with the number of days between the begining of the month of date_start and itself
// + the number of hours between the end of the month of date_end and itself
app.get('/api/p2', (req, res) => { // /api/p2?date_start=2020-06-10&date_end=2020-07-25 >15 jours
  let { date_start, date_end } = req.query;
  res.send(getNbDays(date_start, date_end));
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})