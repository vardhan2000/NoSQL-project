db = connect( 'mongodb://localhost:27017/' + dbName );

db.getCollection(collection1).aggregate([
    { $project: { _id: 0 } },
    { $unionWith: { coll: collection2, pipeline: [{ $project: { _id: 0 } }] } },
    { $out: { db: dbName, coll: outputCollectionName }}
])
