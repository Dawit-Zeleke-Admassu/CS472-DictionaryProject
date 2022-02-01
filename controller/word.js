const constants = require('../consts')
const mysql = require('mysql')

const con = mysql.createConnection({
  host: constants.host,
  user: constants.dbUsername,
  password: constants.dbPassword,
  database: constants.db
})


con.connect((error) => {
  if (error)  
    throw error 
  else 
    console.info('Connected!')
})

/**
 * Word definition model
 * @param {object} entry - object containing the definitions of the term as returned form db
 * @function
 */
const WordDefinition = function (entry) {
  this.word = entry.word
  this.wordtype = entry.wordtype
  this.definition = entry.definition
}

const lookupWordFromDictionary = (req, res) => {
  WordDefinition.findByWord( req.query.data && req.query.data.term, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.send([])
      } else {
        console.log(`Error retrieving definition with search term ${req.query.data.term}`)
        res.send([])
      }
    } else res.send(data)
  })
}

WordDefinition.findByWord = (word, result) => {
  con.query(`${constants.dbSelect} '${word}'`, (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(err, null)
      return
    }

    if (res.length) {
      result(null, res)
      return
    }

    result({ kind: "not_found" }, null)
  })
}

module.exports = {
  lookupWordFromDictionary
};
