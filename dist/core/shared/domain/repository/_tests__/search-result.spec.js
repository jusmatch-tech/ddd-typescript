"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _searchresult = require("../search-result");
describe('SearchResult Unit Tests', ()=>{
    test('constructor props', ()=>{
        let result = new _searchresult.SearchResult({
            items: [
                'entity1',
                'entity2'
            ],
            total: 4,
            current_page: 1,
            per_page: 2,
            last_page: 2
        });
        expect(result.toJSON()).toStrictEqual({
            items: [
                'entity1',
                'entity2'
            ],
            total: 4,
            current_page: 1,
            per_page: 2,
            last_page: 2
        });
        result = new _searchresult.SearchResult({
            items: [
                'entity1',
                'entity2'
            ],
            total: 4,
            current_page: 1,
            per_page: 2,
            last_page: 2
        });
        expect(result.toJSON()).toStrictEqual({
            items: [
                'entity1',
                'entity2'
            ],
            total: 4,
            current_page: 1,
            per_page: 2,
            last_page: 2
        });
    });
    it('should set last_page = 1 when per_page field is greater than total field', ()=>{
        const result = new _searchresult.SearchResult({
            items: [],
            total: 4,
            current_page: 1,
            per_page: 15,
            last_page: 1
        });
        expect(result.last_page).toBe(1);
    });
    test('last_page prop when total is not a multiple of per_page', ()=>{
        const result = new _searchresult.SearchResult({
            items: [],
            total: 101,
            current_page: 1,
            per_page: 20,
            last_page: 6
        });
        expect(result.last_page).toBe(6);
    });
});

//# sourceMappingURL=search-result.spec.js.map