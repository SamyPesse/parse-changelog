var fs = require('fs');
var path = require('path');
var should = require('should');
var parseChangelog = require('../');


describe('ChangeLog', function() {
    var changelog = parseChangelog(fs.readFileSync(path.resolve(__dirname, 'CHANGES.md'), { encoding: 'utf-8' }));

    it('should correctly extract title', function() {
        changelog.should.have.property('title');
        changelog.title.should.be.exactly('Release notes');
    })

});
