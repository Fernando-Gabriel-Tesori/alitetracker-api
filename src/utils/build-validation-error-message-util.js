"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildValidationErrorMessage = buildValidationErrorMessage;
function buildValidationErrorMessage(issues) {
    const errors = issues.map((item) => `${item.path.join('.')}: ${item.message}`);
    return errors;
}
