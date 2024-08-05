# wise-360-pro

## Project Initial Config
1. Create the dockerfile and docker-compose files
2. Install devcontainer extension
3. Start dev container 
  1. Change the docker-compose file in dev container 
    1. The volume item according your project config
  2. Change de devcontainer.json file 
    1. Add de docker-compose override file
    2. Change the **workspaceFolder** folder according your project config
    3. Add **customizations** do add vscode extensions if needed
    4. Add **features** to configure git, ZSH terminal and history
4. Start the devcontainer environment
5. Inside devcontainer environment
  1. start de npm 
    '''npm init -y '''
  2. Install typescript
    '''npm install typescript -D'''
  3. Start tsc
    '''npx tsc --init'''
  4. Install and start Jest
    '''
    npm install jest @types/jest -D
    npx jest --init
    '''
  5. Change jest.config.ts
    1. Change the **rootDir**
    2. Change the **transform** tag
      '''
        transform: {
        '^.+\\.(t|j)s$': '@swc/jest',
        },
      '''
  5. Install SWC
    '''npm install @swc/core @swc/cli @swc/jest -D'''
  6. Install ts-node
    '''npm install ts-node --save-dev'''

## Git Dev Container
### adding ssh key to dev container
1. run '''ssh-add ~/.ssh/id_rsa on local machine
2. rebuild devcontainer 


## Project starting
1. Create de src folder
2. Create de domain folder
3. Create de <entity>.entity.ts file
  1. Export a class with the attributes
  2. Create a constructor
    1. export a type with acceptable constructor params 
    1. The constructor params uses a props type exported
  3. Create a static method to create a new entity
  4. export a type with the create props to uses on create method.
  5. Create methods with the specific operations allowed to the entity, like:
    1. changeName()
    2. changeDescription()
    3. activate()
    4. deactivate()
4. Create a __test__ folder
5. Create a <entity>.entity.spec.ts file
  1. Create the tests, example:
      '''
          describe('Tenant Unit Test', () => {
          describe('Constructor', () => {
            test('Should create a tenant with default value', () => {
              const tenant = new Tenant({
                name: 'test'
              });
              expect(tenant.tenant_id).toBeUndefined()
              expect(tenant.name).toBe('test');
              expect(tenant.description).toBeNull();
              expect(tenant.is_active).toBeTruthy();
              expect(tenant.created_at).toBeInstanceOf(Date);
            });
            test('Should create a tenant with all values', () => {

              const created_at = new Date();
              const updated_at = new Date();
              const tenant = new Tenant({
                name: 'test',
                description: 'test',
                is_active: false,
                created_at,
                updated_at
              });
              expect(tenant.tenant_id).toBeUndefined()
              expect(tenant.name).toBe('test');
              expect(tenant.description).toBe('test');
              expect(tenant.is_active).toBeFalsy();
              expect(tenant.created_at).toBe(created_at);
              expect(tenant.updated_at).toBe(updated_at);
            });

            test('Should create a tenant with name and description', () => {
              const tenant = new Tenant({
                name: 'test',
                description: 'test'
              });
              expect(tenant.tenant_id).toBeUndefined()
              expect(tenant.name).toBe('test');
              expect(tenant.description).toBe('test');
              expect(tenant.is_active).toBeTruthy();
              expect(tenant.created_at).toBeInstanceOf(Date);
            });  
          });

          describe('Create', () => {
            test('Should create a tenant with default value', () => {
              const tenant = Tenant.create({
                name: 'test'
              });
              expect(tenant.tenant_id).toBeUndefined()
              expect(tenant.name).toBe('test');
              expect(tenant.description).toBeNull();
              expect(tenant.is_active).toBeTruthy();
              expect(tenant.created_at).toBeInstanceOf(Date);
            });

            test('Should create a tenant with name and description', () => {
              const tenant = Tenant.create({
                name: 'test',
                description: 'test'
              });
              expect(tenant.tenant_id).toBeUndefined()
              expect(tenant.name).toBe('test');
              expect(tenant.description).toBe('test');
              expect(tenant.is_active).toBeTruthy();
              expect(tenant.created_at).toBeInstanceOf(Date);
            });

            test('Should create a tenant with is_active false', () => {
              const tenant = Tenant.create({
                name: 'test',
                is_active: false
              });
              expect(tenant.tenant_id).toBeUndefined()
              expect(tenant.name).toBe('test');
              expect(tenant.description).toBeNull();
              expect(tenant.is_active).toBeFalsy();
              expect(tenant.created_at).toBeInstanceOf(Date);
            });
          
          });

          describe('Change Name', () => {
            test('Should change name', () => {
              const tenant = Tenant.create({
                name: 'test'
              });
              tenant.changeName('test2');
              expect(tenant.name).toBe('test2');
            });
          });

          describe('Change Description', () => {
            test('Should change description', () => {
              const tenant = Tenant.create({
                name: 'test'
              });
              tenant.changeDescription('test2');
              expect(tenant.description).toBe('test2');
            });
          });

          describe('Activate', () => {
            test('Should activate tenant', () => {
              const tenant = Tenant.create({
                name: 'test',
                is_active: false
              });
              tenant.activate();
              expect(tenant.is_active).toBeTruthy();
            });
          });

          describe('Deactivate', () => {
            test('Should deactivate tenant', () => {
              const tenant = Tenant.create({
                name: 'test',
                is_active: true
              });
              tenant.deactivate();
              expect(tenant.is_active).toBeFalsy();
            });
          });

        });

      '''
6. Validator
  1. Enable **expetimentalDecotators, emitDecoratormetadata and strictNullChecks = false**  on tsconfig.json
  2. install class-validator lib '''npm install class-validator'''
  3. Creating a custom assertion
    TODO it's not working for While, need to come back to lesson "lancando exceção na invalidação da categoria" to fix 
7. #### Repository
    1. Creating a generic repository interface - No bussines must be implemented in repository, it's just to take data from and to the storage.
      1. list all main methods that should be implemented in each repository
      2. Create a in memory repository, it uses the repository interface and implements the methods using generic, that will help when implementing the entity repository, the in memory repository will help on testing.
      
8. Test Data Builder
  1. Instaling the chance and @types/chance lib
  
9. Sequelize
  1. Instaling Sequelize 
    1. '''npm install sequelize sequelize-typescript'''
    2. '''npm install @types/sequelize --save-dev '''
    3. '''npm install sqlite3'''
10. Use Case
  1. Creating a use case create_entity
    1. added a new folder Application at the same level as Domain in both shared an core
    2. on shared create an interface with just to make clear the inputs and outputs params as the method thar will run, every use case must implement this interface.
    3. on entity folder
      1. Create usecase
        1. Add the create-<entity> class that implements the IUseCase
        2. Create types to the input and output params
        3. Implement the execute method.
          1. Create a entity based on input Data
          2. Insert the data do DB, using the repository instance received on constructor
          3. return the data according the output param, instead of to be possible return the own entity, it is not a good practice, because it make the external layer to know the internal layer, and it become a problem when the entity is changed (a field is added), it make all the external layer to manage it as well.
      2. update use-case
        1. Add the update-<entity> class that implements the IUseCase
        2. Create types to the input and output params
        3. Implement the update code on execute method.
      3. Delete use-case
        1. Add the update-<entity> class that implements the IUseCase
        2. Create types to the input and output params
        3. Implement the update code on execute method.
      4. Buscar por ID use-case
        1. Add the get_<entity> class that implements the IUseCase
        2. Create types to the input and output params
        3. Implement the update code on execute method.
      5. Listagem de tenant- use-case
        1. Add list-<entity> class that implements the IUseCase
        2. Create types to the input and output params
        3. Implement the update code on execute method.
      6. Criando abstração para OUTPUT Type
11. Validator
  1. Aplicado o notification patter
  2. separando validações de negócios das validações de syntax
  
        
** NestJS
1. instalando e configurando o NestJS
  1. incluir no docker file a instalação do nestjs, antes da criação do usuário NODE
  '''RUN npm install -g @nestjs/cli@10.1.17'''
  2. criar o projeto nest
    '''nest new nest'''
  3. 
2. criando módulo tenant no nest.
  1. executar o comando '''nest g resource''' que criara um CRUD completo para o modulo tenant.
  2. Ele cria arquivos para serviços, mas como isso já temos nos casos de uso do core, não vamos precisar desses arquivos e vamos remover
  3. O mesmo ocorre com entidade.
3. integrando o squelize com o nest.
  1. instalar o nest sequelize comando: '''npm install @nestjs/sequelize'''
  2. adicionar imports sequelize e tenat no app.modules
  3. adcionar imports e provider no tenant module.
  




    


  



