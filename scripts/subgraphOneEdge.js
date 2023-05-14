// need name of database
// need input collection name
// need output collection name
// need vertex to be deleted

db = connect( 'mongodb://localhost:27017/' + dbName );

db.getCollection(inputCollectionName).aggregate( [
    {
       $match: { $or:[{u: edge.u,v: edge.v,w: edge.w},
                      {u: edge.v,v: edge.u,w: edge.w}
                     ] }
    },
    {
        $out: { db: dbName, coll: intermediateCollectionName }
    }
 ] )

db.getCollection(inputCollectionName).aggregate([
{
    $lookup: {
    from: intermediateCollectionName,
    let: { a_field1: "$u", a_field2: "$v", a_field3: "$w" },
    pipeline: [
        {
        $match: {
            $expr: {
            $and: [
                { $eq: ["$u", "$$a_field1"] },
                { $eq: ["$v", "$$a_field2"] },
                { $eq: ["$w", "$$a_field3"] }
            ]
            }
        }
        }
    ],
    as: "matches"
    }
},
{
    $match: {
    matches: { $size: 0 }
    }
},
{
    $out: outputCollectionName
}
])

db.getCollection(outputCollectionName).updateMany(
{},
{
    $unset: {
    matches: 1
    }
}
)