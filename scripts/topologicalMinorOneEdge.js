// need name of database
// need input collection name
// need output collection name
// need vertex to be deleted

db = connect( 'mongodb://localhost:27017/' + dbName );

// print(db.getCollection(inputCollectionName).find({u: edge.u}).toArray().length);

if(db.getCollection(inputCollectionName).findOne(edge) 
    && db.getCollection(inputCollectionName).find({u: edge.u}).toArray().length==2
    && db.getCollection(inputCollectionName).find({u: edge.v}).toArray().length==2)
{
  load("scripts/minorOneEdge.js");
}