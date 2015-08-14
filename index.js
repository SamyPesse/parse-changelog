var _ = require('lodash');
var kramed = require('kramed');




module.exports = function(source, opts) {
    opts = _.defaults(opts || {}, {
        title: true,
        textAsHTML: false
    });

    var changelog = {
        title: "",
        intro: "",
        versions: []
    };

    // Current version to process
    var version = null;

    // Heading's depth of the title
    var titleDepth = 0;

    // Current not to process
    var note = "";

    // Normalize text
    var normText = opts.textAsHTML? kramed : _.identity;

    // Push a new version and normalize notes
    var pushVersion = function(_version) {
        _version.rawNote = normText(
            _.chain(_version.notes)
            .map(function(note) {
                return '* '+note.trim();
            })
            .value()
            .join('\n')
        );
        _version.notes = _.map(_version.notes, normText);
        changelog.versions.push(_version);
    };

    var lexer = new kramed.Lexer({});

    var tokens = lexer.lex(source);
    _.each(tokens, function(token) {
        // First heading is title
        if (opts.title && !changelog.title && token.type == 'heading') {
            titleDepth = token.depth;
            changelog.title = normText(token.text);
        }

        // First paragraph is intro
        else if (!version && !changelog.intro && token.type == 'paragraph') {
            changelog.intro = normText(token.text);
        }

        // New tag
        else if (token.type == 'heading' && token.depth > titleDepth) {
            if (version) {
                if (note) version.notes.push(note);
                pushVersion(version);
            }
            note = "";
            version = {
                tag: token.text,
                notes: []
            };
        }

        else if (version && token.type == 'list_item_start') {
            // Push last note
            if (note) version.notes.push(note);
            note = "";
        }

        else if (version && token.type == 'text') {
            note = _.compact([note, token.text]).join('\n');
        }
    });

    if (version) pushVersion(version);

    return changelog;
};
