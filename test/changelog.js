var fs = require('fs');
var path = require('path');
var should = require('should');
var parseChangelog = require('../');


describe('ChangeLog', function() {
    var changelog = parseChangelog(fs.readFileSync(path.resolve(__dirname, 'CHANGES.md')));

    it('should correctly extract title', function() {
        changelog.should.have.property('title');
        changelog.should.title.should.be.exactly('Release notes');
    })

});
