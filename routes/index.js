
exports.home = function(req, res){
    res.render("home");
}

exports.not_found = function(req, res){
    res.send("404 Not Found");
}