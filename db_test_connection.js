var mysql = require('mysql')

var con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Davemiu@132127',
  database: 'entries'
})

con.connect(async (err) => {
  if (err) throw err
  console.log('Connected!')
  await con.query('SELECT * FROM entries', (error, result, fields) => {
    if (error) {
      console.log('ERROR Occured: ', error)
    }
    console.log('Result>> ', result)
  })
})
