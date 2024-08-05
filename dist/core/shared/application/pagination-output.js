"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PaginationOutputMapper", {
    enumerable: true,
    get: function() {
        return PaginationOutputMapper;
    }
});
let PaginationOutputMapper = class PaginationOutputMapper {
    static toOutput(items, props) {
        return {
            items,
            total: props.total,
            current_page: props.current_page,
            last_page: props.last_page,
            per_page: props.per_page
        };
    }
};

//# sourceMappingURL=pagination-output.js.map