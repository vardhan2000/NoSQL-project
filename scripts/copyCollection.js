db = connect( 'mongodb://localhost:27017/' + dbName );

db.getCollection(collectionFrom).aggregate([
    {
      $out: collectionTo
    }
  ])