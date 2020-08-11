import * as  SQLite from 'expo-sqlite';
import { BaseModel, types } from 'expo-sqlite-orm';

export default class User extends BaseModel {
  constructor(obj) {
    super(obj)
  }

  static get database() {
    return async () => SQLite.openDatabase('yaspeez.db')
  }

  static get tableName() {
    return 'users'
  }

  static get columnMapping() {
    return {
      id: { type: types.INTEGER, primary_key: true },
      user_id: { type: types.INTEGER, not_null: true, unique: true },
      first_name: { type: types.TEXT, not_null: true },
      last_name: { type: types.TEXT, not_null: true },
      email: { type: types.TEXT, not_null: true, unique: true },
      phone_no: { type: types.TEXT, not_null: true, unique: true },
      born_at: { type: types.INTEGER, not_null: true },
      birth_place: { type: types.TEXT, not_null: true },
      address: { type: types.TEXT, not_null: true },
      pincode: { type: types.INTEGER, not_null: true },
      referral: { type: types.TEXT, not_null: true },
      country_id: { type: types.INTEGER, not_null: true },
      state_id: { type: types.INTEGER, not_null: true },
      purpose_id: { type: types.INTEGER, not_null: true },
      sport_id: { type: types.INTEGER, not_null: true },
      created_at: { type: types.INTEGER, default: () => Date.now() }
    }
  }
}
