import * as SQLite from 'expo-sqlite';
import DatabaseLayer from 'expo-sqlite-orm/src/DatabaseLayer'
import Country from './models/country';
import Follower from './models/follower';
import Purpose from './models/purpose';
import Sport from './models/sport';
import State from './models/state';
import User from './models/user';

export const init = async (sports, states, purposes) => {
  let stateValues = [];
  let sportValues = [];
  let purposeValues = [];
  let followerValues = [];
  let countryValues = {country_id: 66, name: 'France', created_at: new Date().getTime()};

  await User.dropTable();
  await User.createTable();

  await Country.dropTable();
  await Country.createTable();

  await State.dropTable();
  await State.createTable();

  await Sport.dropTable();
  await Sport.createTable();

  await Purpose.dropTable();
  await Purpose.createTable();

  // await Follower.dropTable();
  // await Follower.createTable();

  states.map(state => {
    let stateArr = {};
    stateArr['state_id'] = state.ID;
    stateArr['name'] = state.City;
    stateArr['created_at'] = new Date().getTime();
    stateValues.push(stateArr);
  });

  sports.map(sport => {
    let sportArr = {};
    sportArr['sport_id'] = sport.ySports_ID;
    sportArr['name'] = sport.SportName;
    sportArr['image'] = sport.IconPath;
    // sportArr['cat_id'] = sport.ySportsCategory_ID;
    sportArr['cat_name'] = sport.Category;
    sportArr['created_at'] = new Date().getTime();
    sportValues.push(sportArr);
  });

  purposes.map(purpose => {
    let purposeArr = {};
    purposeArr['purpose_id'] = purpose.id;
    purposeArr['name'] = purpose.text;
    purposeArr['created_at'] = new Date().getTime();
    purposeValues.push(purposeArr);
  });

  // followers.map(follower => {
  //   let followerArr = {};
  //   followerArr['user_id'] = follower;
  //   followerArr['created_at'] = new Date().getTime();
  //   followerValues.push(followerArr);
  // });
  
  const statesLayer = new DatabaseLayer(async () => SQLite.openDatabase('yaspeez.db'), 'states');
  const sportsLayer = new DatabaseLayer(async () => SQLite.openDatabase('yaspeez.db'), 'sports');
  const purposesLayer = new DatabaseLayer(async () => SQLite.openDatabase('yaspeez.db'), 'purposes');
  // const followersLayer = new DatabaseLayer(async () => SQLite.openDatabase('yaspeez.db'), 'followers');

  const cntry = new Country(countryValues);
  cntry.save();

  statesLayer.bulkInsertOrReplace(stateValues);
  sportsLayer.bulkInsertOrReplace(sportValues);
  purposesLayer.bulkInsertOrReplace(purposeValues);
  // followersLayer.bulkInsertOrReplace(followerValues);

  return true;
};