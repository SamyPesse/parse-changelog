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

    it('should correctly extract intro', function() {
        changelog.should.have.property('intro');
        changelog.intro.should.be.exactly('All notable changes to this project will be documented in this file.\nThis project adheres to [Semantic Versioning](http://semver.org/).');
    })

    it('should correctly extract all versions', function() {
        changelog.should.have.property('versions');
        changelog.versions.should.have.lengthOf(41);
    })
});
