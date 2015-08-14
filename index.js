var _ = require('lodash');
var kramed = require('kramed');




module.exports = function(source) {
    var changelog = {
        title: "",
        intro: "",
        versions: []
    };
    var lexer = new kramed.Lexer({});

    var tokens = lexer.lex(source);

    if (tokens[0].type == 'heading') changelog.title = tokens[0].text;

    return changelog;
};
