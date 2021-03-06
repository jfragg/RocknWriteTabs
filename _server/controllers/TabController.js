var restful = require('node-restful');

module.exports = function (app, route){

    var rest = restful.model(
        'tab',
        app.models.tab
    ).methods(['get', 'put', 'post', 'delete']);

    //register this endpoint with application
    rest.register(app, route);

    //return middleware
    return function(req, res, next){
        next();
    };
};