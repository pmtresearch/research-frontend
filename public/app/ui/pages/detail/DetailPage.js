(function () {
    'use strict';

    define(
        [
            'lodash',
            'knockout',
            'util/container',
            'models/DynamicRecord'
        ],
        function (_, ko, container, DynamicRecord) {
            return function (context, parameters) {
                var record = ko.observable(undefined);

                this.detailFields = ko.observableArray();
                this.loading = ko.observable(false);

                this.data = ko.pureComputed(function () {
                    return record() ? record().data() : undefined;
                }.bind(this));

                this.idno = ko.pureComputed(function () {
                    var data = this.data();
                    return data ? data.idno : undefined;
                }.bind(this));

                this.displayRecord = ko.pureComputed(function () {
                    return !this.loading() && !!this.data();
                }.bind(this));

                this.binding = function (element, callback) {
                    var detail = container.resolve(parameters.detailServiceKey);
                    record(undefined);
                    this.loading(true);
                    require(
                        [
                            parameters.detailFields
                        ],
                        function (detailFields) {
                            this.detailFields(detailFields);
                            detail(context.params.id, function (err, result) {
                                this.loading(false);
                                if (err) {
                                    // TODO Display error
                                    return callback();
                                }
                                record(new DynamicRecord(result, this.detailFields));
                                callback();
                            }.bind(this));
                        }.bind(this)
                    );
                };

                this.labelFor = function (key) {
                    var field = _.find(this.detailFields(), { key: key });
                    return field ? field.labelText : '';
                };

                this.displayFor = function (key) {
                    var field = _.find(this.detailFields(), { key: key });
                    if (!field) {
                        return undefined;
                    }
                    return {
                        name: 'display/' + (field.display || 'text'),
                        params: {
                            data: this.data,
                            name: key,
                            placeholder: field.placeholder
                        }
                    };
                };
            };
        }
    );
}());