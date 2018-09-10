var express = require('express')
var router = express.Router()
var fs = require('fs')
var path = require('path')

var hackerone = require('hackerone')

var toks = JSON.parse(fs.readFileSync(path.join(__dirname, '../apitoks.json'), 'utf8'))
var Hackerone = new hackerone(toks.hackerOne.identifier, toks.hackerOne.token)

router.get('/', function(req, res, next) {
    Hackerone.reports.read('1', function (err, apiResponse) {
        console.log(apiResponse)
        res.json(apiResponse)
    })
})

module.exports = router
