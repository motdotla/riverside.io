
#
# * GET home page.
# 
exports.index = (req, res) ->
  res.render "index",
    title: "Riverside.io"

exports.locations = (req, res) ->
  res.render "locations",
    title: "Locations"
