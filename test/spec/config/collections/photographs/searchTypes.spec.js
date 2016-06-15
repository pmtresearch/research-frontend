(function () {
    'use strict';

    define(
        [
            'lodash',
            'chai',
            'config/collections/library/searchTypes'
        ],
        function (_, chai, searchTypes) {
            var expect = chai.expect;

            describe('The `library/searchTypes` module', function () {
                it('Defines a static array', function () {
                    expect(searchTypes).to.be.an('array');
                    expect(searchTypes).to.have.length(4);
                });
                it('Defines the `Keyword` field', function () {
                    var searchType = _.find(searchTypes, { key: '_fulltext' });
                    expect(searchType.labelText).to.equal('Keyword');
                    expect(searchType.glyphicon).to.equal('search');
                });
                it('Defines the `Author` field', function () {
                    var searchType = _.find(searchTypes, { key: 'ca_objects.Author' });
                    expect(searchType.labelText).to.equal('Author');
                    expect(searchType.glyphicon).to.equal('user');
                });
                it('Defines the `Title` field', function () {
                    var searchType = _.find(searchTypes, { key: 'ca_objects.preferred_labels' });
                    expect(searchType.labelText).to.equal('Title');
                    expect(searchType.glyphicon).to.equal('certificate');
                });
                it('Defines the `Subject` field', function () {
                    var searchType = _.find(searchTypes, { key: 'ca_occurrences.preferred_labels' });
                    expect(searchType.labelText).to.equal('Subject');
                    expect(searchType.glyphicon).to.equal('paperclip');
                });
            });
        }
    );
}());
