db = connect( 'mongodb://localhost:27017/' + dbName );

function generateEdge( a , b , c) {
    return { u:a, v:b , w:c};
}

db.getCollection("c5").insertMany( [
    generateEdge( 1 , 2 , 1),
    generateEdge( 2 , 1 , 1),

    generateEdge( 2 , 3 , 1),
    generateEdge( 3 , 2 , 1),

    generateEdge( 3 , 4 , 1),
    generateEdge( 4 , 3 , 1),

    generateEdge( 4 , 5 , 1),
    generateEdge( 5 , 4 , 1),

    generateEdge( 5 , 1 , 1),
    generateEdge( 1 , 5 , 1),

 ] );