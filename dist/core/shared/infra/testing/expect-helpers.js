//import { ClassValidatorFields } from "../../domain/validators/class-validator-fields";
//import { EntityValidationError } from "../../domain/validators/validation.error";
//import { FieldsErrors } from "../../domain/validators/validator-fields-interface";
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
// type Expected =
//   | {
//       validator: ClassValidatorFields<any>;
//       data: any;
//     }
//   | (() => any);
expect.extend({
    notificationContainsErrorMessages (expected, received) {
        const every = received.every((error)=>{
            if (typeof error === 'string') {
                return expected.errors.has(error);
            } else {
                return Object.entries(error).every(([field, messages])=>{
                    const fieldMessages = expected.errors.get(field);
                    return fieldMessages && fieldMessages.length && fieldMessages.every((message)=>messages.includes(message));
                });
            }
        });
        return every ? {
            pass: true,
            message: ()=>''
        } : {
            pass: false,
            message: ()=>`The validation errors not contains ${JSON.stringify(received)}. Current: ${JSON.stringify(expected.toJSON())}`
        };
    }
}); // function assertContainsErrorsMessages(
 //   expected: FieldsErrors,
 //   received: FieldsErrors
 // ) {
 //   const isMatch = expect.objectContaining(received).asymmetricMatch(expected);
 //   return isMatch
 //     ? isValid()
 //     : {
 //         pass: false,
 //         message: () =>
 //           `The validation errors not contains ${JSON.stringify(
 //             received
 //           )}. Current: ${JSON.stringify(expected)}`,
 //       };
 // }
 // function isValid() {
 //   return { pass: true, message: () => "" };
 // }

//# sourceMappingURL=expect-helpers.js.map