var express = require('express')
var router = express.Router()
var fs = require('fs')
var path = require('path')

var hackerone = require('hackerone')

var toks = JSON.parse(fs.readFileSync(path.join(__dirname, '../apitoks.json'), 'utf8'))
var Hackerone = new hackerone(toks.hackerOne.identifier, toks.hackerOne.token)

router.get('/', function(req, res, next) {
    const filter = req.query.filter || {}
    const page = req.query.page
    const queryParams = {
        program: filter.program[0], // You can't pass multiple terms here?
        page, // Page doesn't work?
    }

    Hackerone.reports.query(queryParams, function (err, apiResponse) {
        res.json(apiResponse)
    })
})

router.get('/me', function(req, res, next) {
    Hackerone.me.programs.query({}, function (err, apiResponse) {
        res.json(apiResponse)
    })
})

module.exports = router
