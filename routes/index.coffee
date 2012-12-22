
#
# * GET home page.
# 
exports.index = (req, res) ->
  if req.query.v == '2' 
    res.render "index",
      title: "Riverside.io"
  else
    res.render "control",
      title: "Riverside.io"

exports.locations = (req, res) ->
  res.render "locations",
    title: "Locations"
