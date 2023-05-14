// load("scripts/create.js")

db = connect( 'mongodb://localhost:27017/' + dbName );
db.dropDatabase();
db = db.getSiblingDB(dbName);
// db.getCollection(dbName).insertMany( [
//     { u: 1, v: 2, w: 50},
//     { u: 2, v: 1, w: 250},
//  ] );
 