db = connect( 'mongodb://localhost:27017/' + dbName );

function generateEdge( a , b , c) {
    return { u:a, v:b , w:c};
}

db.getCollection("petersen").insertMany( [
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

    generateEdge( 1 , 9 , 1),
    generateEdge( 9 , 1 , 1),

    generateEdge( 10 , 2 , 1),
    generateEdge( 2 , 10 , 1),

    generateEdge( 6 , 3 , 1),
    generateEdge( 3 , 6 , 1),

    generateEdge( 7 , 4 , 1),
    generateEdge( 4 , 7 , 1),

    generateEdge( 5 , 8 , 1),
    generateEdge( 8 , 5 , 1),

    generateEdge( 9 , 6 , 1),
    generateEdge( 6 , 9 , 1),

    generateEdge( 9 , 7 , 1),
    generateEdge( 7 , 9 , 1),

    generateEdge( 7 , 10 , 1),
    generateEdge( 10 , 7 , 1),

    generateEdge( 6 , 8 , 1),
    generateEdge( 8 , 6 , 1),

    generateEdge( 10 , 8 , 1),
    generateEdge( 8 , 10 , 1),

    
 ] );
 

//   outer C5 => 1 2 3 4 5
//   inner C5 => 6 7 8 9 10
//   1 -- 9
//   5 -- 8
//   7 -- 4
//   6 -- 3
//   2 -- 10