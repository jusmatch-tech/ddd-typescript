"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Notification", {
    enumerable: true,
    get: function() {
        return Notification;
    }
});
let Notification = class Notification {
    addError(error, field) {
        if (field) {
            const errors = this.errors.get(field) ?? [];
            errors.indexOf(error) === -1 && errors.push(error);
            this.errors.set(field, errors);
        } else {
            this.errors.set(error, error);
        }
    }
    setError(error, field) {
        if (field) {
            this.errors.set(field, Array.isArray(error) ? error : [
                error
            ]);
        } else {
            if (Array.isArray(error)) {
                error.forEach((value)=>{
                    this.errors.set(value, value);
                });
                return;
            }
            this.errors.set(error, error);
        }
    }
    hasErrors() {
        return this.errors.size > 0;
    }
    copyErrors(notification) {
        notification.errors.forEach((value, field)=>{
            this.setError(value, field);
        });
    }
    toJSON() {
        const errors = [];
        this.errors.forEach((value, key)=>{
            if (typeof value === 'string') {
                errors.push(value);
            } else {
                errors.push({
                    [key]: value
                });
            }
        });
        return errors;
    }
    constructor(){
        this.errors = new Map();
    }
};

//# sourceMappingURL=notification.js.map