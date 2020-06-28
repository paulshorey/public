import express from 'express'
import http from 'http'
import spawns from 'child_process'

const spawn = spawns.spawn

const app = express()

app.set('port', 9999)

app.all('/_deploy', function (req, res) {

  // done
  res.json(200, {
    message: 'Github Hook received!'
  })

  // apply
  spawn('bash', ['_start.sh'])

})

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'))
})

