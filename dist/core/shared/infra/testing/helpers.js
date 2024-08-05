"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "setupSequelize", {
    enumerable: true,
    get: function() {
        return setupSequelize;
    }
});
const _config = require("../config");
const _sequelizetypescript = require("sequelize-typescript");
function setupSequelize(options = {}) {
    let _sequelize;
    beforeAll(async ()=>{
        _sequelize = new _sequelizetypescript.Sequelize({
            ..._config.Config.db(),
            ...options
        });
        await _sequelize.sync({
            force: true
        });
    });
    beforeEach(async ()=>{
        await _sequelize.sync({
            force: true
        });
    });
    afterAll(async ()=>{
        await _sequelize.close();
    });
    return {
        get sequelize () {
            return _sequelize;
        }
    };
}

//# sourceMappingURL=helpers.js.map