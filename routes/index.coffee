
#
# * GET home page.
# 
exports.index = (req, res) ->
  if req.query.v is '2' 
    res.render "index",
      title: "Riverside.io"
  else if req.query.v is '3'
    res.render "index2",
      title: "Riverside.io"
  else
    res.render "control",
      title: "Riverside.io"

exports.locations = (req, res) ->
  res.render "locations",
    title: "Locations"
