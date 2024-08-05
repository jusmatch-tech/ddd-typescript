"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "TenantOutputMapper", {
    enumerable: true,
    get: function() {
        return TenantOutputMapper;
    }
});
let TenantOutputMapper = class TenantOutputMapper {
    static toOutput(entity) {
        const { tenant_id, ...otherProps } = entity.toJSON();
        return {
            id: entity.tenant_id.id,
            ...otherProps
        };
    }
};

//# sourceMappingURL=tenant-output.js.map