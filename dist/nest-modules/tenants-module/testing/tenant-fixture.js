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
    CreateTenantFixture: function() {
        return CreateTenantFixture;
    },
    GetTenantFixture: function() {
        return GetTenantFixture;
    },
    ListTenantsFixture: function() {
        return ListTenantsFixture;
    },
    UpdateTenantFixture: function() {
        return UpdateTenantFixture;
    }
});
const _tenantentity = require("../../../core/tenant/domain/tenant.entity");
const _keysInResponse = [
    'id',
    'name',
    'description',
    'is_active',
    'created_at',
    'updated_at'
];
let GetTenantFixture = class GetTenantFixture {
};
GetTenantFixture.keysInResponse = _keysInResponse;
let CreateTenantFixture = class CreateTenantFixture {
    static arrangeForCreate() {
        const faker = _tenantentity.Tenant.fake().aTenant().withName('Movie').withDescription('description test');
        return [
            {
                send_data: {
                    name: faker.name
                },
                expected: {
                    name: faker.name,
                    description: null,
                    is_active: true
                }
            },
            {
                send_data: {
                    name: faker.name,
                    description: faker.description
                },
                expected: {
                    name: faker.name,
                    description: faker.description,
                    is_active: true
                }
            },
            {
                send_data: {
                    name: faker.name,
                    is_active: true
                },
                expected: {
                    name: faker.name,
                    description: null,
                    is_active: true
                }
            },
            {
                send_data: {
                    name: faker.name,
                    is_active: false
                },
                expected: {
                    name: faker.name,
                    description: null,
                    is_active: false
                }
            },
            {
                send_data: {
                    name: faker.name,
                    description: faker.description,
                    is_active: true
                },
                expected: {
                    name: faker.name,
                    description: faker.description,
                    is_active: true
                }
            }
        ];
    }
    static arrangeInvalidRequest() {
        const defaultExpected = {
            statusCode: 422,
            error: 'Unprocessable Entity'
        };
        return {
            EMPTY: {
                send_data: {},
                expected: {
                    message: [
                        'name should not be empty',
                        'name must be a string'
                    ],
                    ...defaultExpected
                }
            },
            NAME_UNDEFINED: {
                send_data: {
                    name: undefined
                },
                expected: {
                    message: [
                        'name should not be empty',
                        'name must be a string'
                    ],
                    ...defaultExpected
                }
            },
            NAME_NULL: {
                send_data: {
                    name: null
                },
                expected: {
                    message: [
                        'name should not be empty',
                        'name must be a string'
                    ],
                    ...defaultExpected
                }
            },
            NAME_EMPTY: {
                send_data: {
                    name: ''
                },
                expected: {
                    message: [
                        'name should not be empty'
                    ],
                    ...defaultExpected
                }
            },
            DESCRIPTION_NOT_A_STRING: {
                send_data: {
                    description: 5
                },
                expected: {
                    message: [
                        'name should not be empty',
                        'name must be a string',
                        'description must be a string'
                    ],
                    ...defaultExpected
                }
            },
            IS_ACTIVE_NOT_A_BOOLEAN: {
                send_data: {
                    is_active: 'a'
                },
                expected: {
                    message: [
                        'name should not be empty',
                        'name must be a string',
                        'is_active must be a boolean value'
                    ],
                    ...defaultExpected
                }
            }
        };
    }
    static arrangeForEntityValidationError() {
        const faker = _tenantentity.Tenant.fake().aTenant();
        const defaultExpected = {
            statusCode: 422,
            error: 'Unprocessable Entity'
        };
        return {
            NAME_TOO_LONG: {
                send_data: {
                    name: faker.withInvalidNameTooLong().name
                },
                expected: {
                    message: [
                        'name must be shorter than or equal to 255 characters'
                    ],
                    ...defaultExpected
                }
            }
        };
    }
};
CreateTenantFixture.keysInResponse = _keysInResponse;
let UpdateTenantFixture = class UpdateTenantFixture {
    static arrangeForUpdate() {
        const faker = _tenantentity.Tenant.fake().aTenant().withName('Movie').withDescription('description test');
        return [
            {
                send_data: {
                    name: faker.name,
                    description: null,
                    is_active: true
                },
                expected: {
                    name: faker.name,
                    description: null,
                    is_active: true
                }
            },
            {
                send_data: {
                    name: faker.name,
                    description: faker.description
                },
                expected: {
                    name: faker.name,
                    description: faker.description,
                    is_active: true
                }
            },
            {
                send_data: {
                    name: faker.name,
                    is_active: false
                },
                expected: {
                    name: faker.name,
                    is_active: false
                }
            }
        ];
    }
    static arrangeInvalidRequest() {
        const defaultExpected = {
            statusCode: 422,
            error: 'Unprocessable Entity'
        };
        return {
            DESCRIPTION_NOT_A_STRING: {
                send_data: {
                    description: 5
                },
                expected: {
                    message: [
                        'description must be a string'
                    ],
                    ...defaultExpected
                }
            },
            IS_ACTIVE_NOT_A_BOOLEAN: {
                send_data: {
                    is_active: 'a'
                },
                expected: {
                    message: [
                        'is_active must be a boolean value'
                    ],
                    ...defaultExpected
                }
            }
        };
    }
    static arrangeForEntityValidationError() {
        const faker = _tenantentity.Tenant.fake().aTenant();
        const defaultExpected = {
            statusCode: 422,
            error: 'Unprocessable Entity'
        };
        return {
            NAME_TOO_LONG: {
                send_data: {
                    name: faker.withInvalidNameTooLong().name
                },
                expected: {
                    message: [
                        'name must be shorter than or equal to 255 characters'
                    ],
                    ...defaultExpected
                }
            }
        };
    }
};
UpdateTenantFixture.keysInResponse = _keysInResponse;
let ListTenantsFixture = class ListTenantsFixture {
    static arrangeIncrementedWithCreatedAt() {
        const _entities = _tenantentity.Tenant.fake().theTenants(4).withName((i)=>i + '').withCreatedAt((i)=>new Date(new Date().getTime() + i * 2000)).withUpdatedAt((i)=>new Date(new Date().getTime() + i * 2000)).build();
        const entitiesMap = {
            first: _entities[0],
            second: _entities[1],
            third: _entities[2],
            fourth: _entities[3]
        };
        const arrange = [
            {
                send_data: {},
                expected: {
                    entities: [
                        entitiesMap.fourth,
                        entitiesMap.third,
                        entitiesMap.second,
                        entitiesMap.first
                    ],
                    meta: {
                        current_page: 1,
                        last_page: 1,
                        per_page: 15,
                        total: 4
                    }
                }
            },
            {
                send_data: {
                    page: 1,
                    per_page: 2
                },
                expected: {
                    entities: [
                        entitiesMap.fourth,
                        entitiesMap.third
                    ],
                    meta: {
                        current_page: 1,
                        last_page: 2,
                        per_page: 2,
                        total: 4
                    }
                }
            },
            {
                send_data: {
                    page: 2,
                    per_page: 2
                },
                expected: {
                    entities: [
                        entitiesMap.second,
                        entitiesMap.first
                    ],
                    meta: {
                        current_page: 2,
                        last_page: 2,
                        per_page: 2,
                        total: 4
                    }
                }
            }
        ];
        return {
            arrange,
            entitiesMap
        };
    }
    static arrangeUnsorted() {
        const faker = _tenantentity.Tenant.fake().aTenant();
        const entitiesMap = {
            a: faker.withName('a').build(),
            AAA: faker.withName('AAA').build(),
            AaA: faker.withName('AaA').build(),
            b: faker.withName('b').build(),
            c: faker.withName('c').build()
        };
        const arrange = [
            {
                send_data: {
                    page: 1,
                    per_page: 2,
                    sort: 'name',
                    filter: 'a'
                },
                expected: {
                    entities: [
                        entitiesMap.AAA,
                        entitiesMap.AaA
                    ],
                    meta: {
                        total: 3,
                        current_page: 1,
                        last_page: 2,
                        per_page: 2
                    }
                }
            },
            {
                send_data: {
                    page: 2,
                    per_page: 2,
                    sort: 'name',
                    filter: 'a'
                },
                expected: {
                    entities: [
                        entitiesMap.a
                    ],
                    meta: {
                        total: 3,
                        current_page: 2,
                        last_page: 2,
                        per_page: 2
                    }
                }
            }
        ];
        return {
            arrange,
            entitiesMap
        };
    }
};

//# sourceMappingURL=tenant-fixture.js.map