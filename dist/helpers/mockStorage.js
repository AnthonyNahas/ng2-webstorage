'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var MockStorageHelper = function () {
    function MockStorageHelper() {}
    MockStorageHelper.isSecuredField = function (field) {
        return !!~MockStorageHelper.securedFields.indexOf(field);
    };
    MockStorageHelper.getStorage = function (sType) {
        if (!this.mockStorages[sType]) this.mockStorages[sType] = MockStorageHelper.generateStorage();
        return this.mockStorages[sType];
    };
    MockStorageHelper.generateStorage = function () {
        var storage = {};
        Object.defineProperties(storage, {
            setItem: {
                writable: false,
                enumerable: false,
                configurable: false,
                value: function value(key, _value) {
                    if (!MockStorageHelper.isSecuredField(key)) this[key] = _value;
                }
            },
            getItem: {
                writable: false,
                enumerable: false,
                configurable: false,
                value: function value(key) {
                    return !MockStorageHelper.isSecuredField(key) ? this[key] || null : null;
                }
            },
            removeItem: {
                writable: false,
                enumerable: false,
                configurable: false,
                value: function value(key) {
                    if (!MockStorageHelper.isSecuredField(key)) delete this[key];
                }
            },
            length: {
                enumerable: false,
                configurable: false,
                get: function get() {
                    return Object.keys(this).length;
                }
            }
        });
        return storage;
    };
    MockStorageHelper.securedFields = ['setItem', 'getItem', 'removeItem', 'length'];
    MockStorageHelper.mockStorages = {};
    return MockStorageHelper;
}();
exports.MockStorageHelper = MockStorageHelper;
//# sourceMappingURL=mockStorage.js.map