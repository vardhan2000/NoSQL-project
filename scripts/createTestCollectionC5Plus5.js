db = connect( 'mongodb://localhost:27017/' + dbName );

function generateEdge( a , b , c) {
    return { u:a, v:b , w:c};
}

db.getCollection("c5_plus5").insertMany( [
    generateEdge(6 , 7 , 1),
    generateEdge( 7 , 6 , 1),

    generateEdge( 7 , 8 , 1),
    generateEdge( 8 , 7 , 1),

    generateEdge( 8 , 9 , 1),
    generateEdge( 9 , 8 , 1),

    generateEdge( 9 , 10 , 1),
    generateEdge( 10 , 9 , 1),

    generateEdge( 10 , 6 , 1),
    generateEdge( 6 , 10 , 1),

 ] );