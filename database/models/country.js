import * as  SQLite from 'expo-sqlite';
import { BaseModel, types } from 'expo-sqlite-orm';

export default class Country extends BaseModel {
  constructor(obj) {
    super(obj)
  }

  static get database() {
    return async () => SQLite.openDatabase('yaspeez.db')
  }

  static get tableName() {
    return 'countries'
  }

  static get columnMapping() {
    return {
      id: { type: types.INTEGER, primary_key: true },
      country_id: { type: types.INTEGER, not_null: true, unique: true },
      name: { type: types.TEXT, not_null: true },
      created_at: { type: types.INTEGER, default: () => Date.now() }
    }
  }
}
