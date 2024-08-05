"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _classtransformer = require("class-transformer");
const _paginationpresenter = require("../pagination.presenter");
describe('PaginationPresenter Unit Tests', ()=>{
    describe('constructor', ()=>{
        it('should set values', ()=>{
            const presenter = new _paginationpresenter.PaginationPresenter({
                current_page: 1,
                per_page: 2,
                last_page: 3,
                total: 4
            });
            expect(presenter.current_page).toBe(1);
            expect(presenter.per_page).toBe(2);
            expect(presenter.last_page).toBe(3);
            expect(presenter.total).toBe(4);
        });
        it('should set string number values', ()=>{
            const presenter = new _paginationpresenter.PaginationPresenter({
                current_page: '1',
                per_page: '2',
                last_page: '3',
                total: '4'
            });
            expect(presenter.current_page).toBe('1');
            expect(presenter.per_page).toBe('2');
            expect(presenter.last_page).toBe('3');
            expect(presenter.total).toBe('4');
        });
    });
    it('should presenter data', ()=>{
        let presenter = new _paginationpresenter.PaginationPresenter({
            current_page: 1,
            per_page: 2,
            last_page: 3,
            total: 4
        });
        expect((0, _classtransformer.instanceToPlain)(presenter)).toStrictEqual({
            current_page: 1,
            per_page: 2,
            last_page: 3,
            total: 4
        });
        presenter = new _paginationpresenter.PaginationPresenter({
            current_page: '1',
            per_page: '2',
            last_page: '3',
            total: '4'
        });
        expect((0, _classtransformer.instanceToPlain)(presenter)).toStrictEqual({
            current_page: 1,
            per_page: 2,
            last_page: 3,
            total: 4
        });
    });
});

//# sourceMappingURL=pagination.presenter.spec.js.map