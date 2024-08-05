"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    UpdateTenantDto: function() {
        return UpdateTenantDto;
    },
    UpdateTenantInputWithoutId: function() {
        return UpdateTenantInputWithoutId;
    }
});
const _updatetenantinput = require("../../../core/tenant/application/use-case/update-tenant/update-tenant.input");
const _mappedtypes = require("@nestjs/mapped-types");
let UpdateTenantInputWithoutId = class UpdateTenantInputWithoutId extends (0, _mappedtypes.OmitType)(_updatetenantinput.UpdateTenantInput, [
    'id'
]) {
};
let UpdateTenantDto = class UpdateTenantDto extends UpdateTenantInputWithoutId {
};

//# sourceMappingURL=update-tenant.dto.js.map