"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Entity", {
    enumerable: true,
    get: function() {
        return Entity;
    }
});
const _notification = require("./validators/notification");
let Entity = class Entity {
    constructor(){
        this.notification = new _notification.Notification();
    }
};

//# sourceMappingURL=entity.js.map