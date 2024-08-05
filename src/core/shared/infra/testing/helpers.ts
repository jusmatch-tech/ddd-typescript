import { Config } from './../config';
import { Sequelize, SequelizeOptions } from "sequelize-typescript";

export function setupSequelize(options: SequelizeOptions = {}) {
  let _sequelize: Sequelize;

  beforeAll(async () => {
    _sequelize = new Sequelize({
      ...Config.db(),
      ...options,
    });

    await _sequelize.sync({ force: true });
  });

  beforeEach(async () => {
    await _sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await _sequelize.close();
  });

  return {
    get sequelize() {
      return _sequelize;
    }
  }
}
