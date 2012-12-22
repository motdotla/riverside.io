###
Module dependencies.
###
express = require("express")
members = require("./members.json")
routes = require("./routes")
http = require("http")
path = require("path")
MailChimpAPI = require('mailchimp').MailChimpAPI;

apiKey = process.env.MAILCHIMPAPIKEY;

#try mailchimp api

try
  api = new MailChimpAPI(apiKey,
    version: "1.3"
    secure: false
  )
catch error
  console.log error.message


app = express()

app.configure ->
  app.set "port", process.env.PORT or 3000
  app.set "views", __dirname + "/views"
  app.set "view engine", "jade"
  app.use express.favicon()
  app.use express.logger("dev")
  app.use express.bodyParser()
  app.use express.methodOverride()
  app.use app.router
  app.use express.static(path.join(__dirname, "public"))
  app.use require('connect-assets')()

app.configure "development", ->
  app.use express.errorHandler()

app.locals.members = members 

app.get "/", routes.index

app.get "/locations", routes.locations

app.post "/subscribe", (req, res) ->
  email = req.query.email;

  if(api)
    #need to add in list id
    api.listSubscribe({id: '', email: email}, function(err, _res){
      if(err)
        res.json(err);
      else
        res.json(_res);

    })
  else
    #shot to mailchimp sign up page
    res.redirect('')

http.createServer(app).listen app.get("port"), ->
  console.log "Express server listening on port " + app.get("port")
