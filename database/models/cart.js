import * as  SQLite from 'expo-sqlite';
import { BaseModel, types } from 'expo-sqlite-orm';

export default class Cart extends BaseModel {
  constructor(obj) {
    super(obj)
  }

  static get database() {
    return async () => SQLite.openDatabase('yaspeez.db')
  }

  static get tableName() {
    return 'cart'
  }

  static get columnMapping() {
    return {
      id: { type: types.INTEGER, primary_key: true },
      cart_id: { type: types.INTEGER, not_null: true },
      product_id: { type: types.INTEGER, not_null: true },
      product_name: { type: types.TEXT, not_null: true },
      image: { type: types.TEXT, not_null: true },
      bgColor: { type: types.TEXT, not_null: true },
      size: { type: types.TEXT, not_null: true },
      brand: { type: types.TEXT, not_null: true },
      variant_id: { type: types.INTEGER, not_null: true },
      quantity: { type: types.INTEGER, not_null: true },
      price: { type: types.TEXT, not_null: true },
      points: { type: types.TEXT, not_null: true },
      vat: { type: types.TEXT, not_null: true },
      created_at: { type: types.INTEGER, default: () => Date.now() }
    }
  }
}
