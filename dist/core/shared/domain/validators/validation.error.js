"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "EntityValidationError", {
    enumerable: true,
    get: function() {
        return EntityValidationError;
    }
});
let EntityValidationError = class EntityValidationError extends Error {
    count() {
        return Object.keys(this.error).length;
    }
    constructor(error, message = 'Entity Validation Error'){
        super(message);
        this.error = error;
    }
} // import { FieldsErrors } from './validator-fields-interface';
 // export abstract class BaseValidationError extends Error {
 //   constructor(
 //     public error: FieldsErrors[],
 //     message = 'Validation Error',
 //   ) {
 //     super(message);
 //   }
 //   setFromError(field: string, error: Error) {
 //     if (error) {
 //       this.error[field] = [error.message];
 //     }
 //   }
 // export class ValidationError extends Error {}
 // export class SearchValidationError extends BaseValidationError {
 //   constructor(error: FieldsErrors[]) {
 //     super(error, 'Search Validation Error');
 //     this.name = 'SearchValidationError';
 //   }
 // }
 // export class LoadEntityError extends BaseValidationError {
 //   constructor(public error: FieldsErrors[]) {
 //     super(error, 'LoadEntityError');
 //     this.name = 'LoadEntityError';
 //   }
 // }
;

//# sourceMappingURL=validation.error.js.map