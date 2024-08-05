"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _classtransformer = require("class-transformer");
const _collectionpresenter = require("../collection.presenter");
const _paginationpresenter = require("../pagination.presenter");
let StubCollectionPresenter = class StubCollectionPresenter extends _collectionpresenter.CollectionPresenter {
    constructor(...args){
        super(...args);
        this.data = [
            1,
            2,
            3
        ];
    }
};
describe('CollectionPresenter Unit Tests', ()=>{
    describe('constructor', ()=>{
        it('should set values', ()=>{
            const presenter = new StubCollectionPresenter({
                current_page: 1,
                per_page: 2,
                last_page: 3,
                total: 4
            });
            expect(presenter['paginationPresenter']).toBeInstanceOf(_paginationpresenter.PaginationPresenter);
            expect(presenter['paginationPresenter'].current_page).toBe(1);
            expect(presenter['paginationPresenter'].per_page).toBe(2);
            expect(presenter['paginationPresenter'].last_page).toBe(3);
            expect(presenter['paginationPresenter'].total).toBe(4);
            expect(presenter.meta).toEqual(presenter['paginationPresenter']);
        });
    });
    it('should presenter data', ()=>{
        let presenter = new StubCollectionPresenter({
            current_page: 1,
            per_page: 2,
            last_page: 3,
            total: 4
        });
        expect((0, _classtransformer.instanceToPlain)(presenter)).toStrictEqual({
            data: [
                1,
                2,
                3
            ],
            meta: {
                current_page: 1,
                per_page: 2,
                last_page: 3,
                total: 4
            }
        });
        presenter = new StubCollectionPresenter({
            current_page: '1',
            per_page: '2',
            last_page: '3',
            total: '4'
        });
        expect((0, _classtransformer.instanceToPlain)(presenter)).toStrictEqual({
            data: [
                1,
                2,
                3
            ],
            meta: {
                current_page: 1,
                per_page: 2,
                last_page: 3,
                total: 4
            }
        });
    });
});

//# sourceMappingURL=collection.presenter.spec.js.map