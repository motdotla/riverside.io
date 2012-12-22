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
  email = req.body.email

  console.log email

  #TESTING

  res.json
    success: true
    email : email

  # if(api)

  #   api.listSubscribe
  #     id: "" #add list id here
  #     email: email, 
  #     (err, _res) ->
  #       if err
  #         res.json 
  #           success : false
  #           error   : err
  #       else
  #          res.json 
  #           sucess    : true
  #           response  : _res
  # else
  #   #shoOt to mailchimp sign up page
  #   res.redirect 'http://riverside.us5.list-manage2.com/subscribe?u=0b634d613f02dd256ad0d7317&id=27ea75d96b'

http.createServer(app).listen app.get("port"), ->
  console.log "Express server listening on port " + app.get("port")
