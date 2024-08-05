"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "SearchResult", {
    enumerable: true,
    get: function() {
        return SearchResult;
    }
});
const _valueobject = require("../value-object");
let SearchResult = class SearchResult extends _valueobject.ValueObject {
    toJSON(forceEntity = false) {
        return {
            items: forceEntity ? this.items.map((item)=>item.toJSON()) : this.items,
            total: this.total,
            current_page: this.current_page,
            per_page: this.per_page,
            last_page: this.last_page
        };
    }
    constructor(props){
        super();
        this.items = props.items;
        this.total = props.total;
        this.current_page = props.current_page;
        this.per_page = props.per_page;
        this.last_page = Math.ceil(this.total / this.per_page);
    }
};

//# sourceMappingURL=search-result.js.map