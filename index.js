var _ = require('lodash');
var kramed = require('kramed');




module.exports = function(source, opts) {
    opts = _.defaults(opts || {}, {
        title: true
    });


    var version = null;
    var titleDepth = 0;
    var changelog = {
        title: "",
        intro: "",
        versions: []
    };
    var lexer = new kramed.Lexer({});

    var tokens = lexer.lex(source);
    _.each(tokens, function(token) {
        // First heading is title
        if (opts.title && !changelog.title && token.type == 'heading') {
            titleDepth = token.depth;
            changelog.title = token.text;
        }

        // First paragraph is intro
        else if (!version && !changelog.intro && token.type == 'paragraph') {
            changelog.intro = token.text;
        }

        else if (token.type == 'heading' && token.depth > titleDepth) {
            if (version) changelog.versions.push(version);
            version = {
                tag: token.text
            };
        }
    });

    if (version) changelog.versions.push(version);

    return changelog;
};
