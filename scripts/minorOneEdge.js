// need name of database
// need input collection name
// need output collection name
// need vertex to be deleted

db = connect( 'mongodb://localhost:27017/' + dbName );

if(db.getCollection(inputCollectionName).findOne(edge))
{
    collectionFrom = inputCollectionName
    collectionTo = intermediateCollectionName+"_copy"
    load("scripts/copyCollection.js")

    db.getCollection(intermediateCollectionName+"_copy").deleteOne(edge)
    db.getCollection(intermediateCollectionName+"_copy").deleteOne({u: edge.v, v: edge.u, w: edge.w})

    db.getCollection(intermediateCollectionName+"_copy").aggregate( [
        {
            $match: { $or:[{u: edge.v},
                           {v: edge.v}
                          ] }
        },
        {
            $project: {
              _id: 0,
              u: {
                $cond: {
                  if: { $eq: ["$u", edge.v] },
                  then: edge.u,
                  else: "$u"
                }
              },
              v: {
                $cond: {
                  if: { $eq: ["$v", edge.v] },
                  then: edge.u,
                  else: "$v"
                }
              },
              w: edge.w
            }
        },
        {
            $out: { db: dbName, coll: intermediateCollectionName }
        }
    ] )

    tempIntermediateCollectionName = intermediateCollectionName
    tempOutputCollectionName = outputCollectionName

    vertex = edge.v
    inputCollectionName = intermediateCollectionName+"_copy"
    intermediateCollectionName = intermediateCollectionName + "2"
    outputCollectionName = inputCollectionName
    load("scripts/subgraphInducedOneVertex.js")

    // union of two collections
    db.getCollection(outputCollectionName).aggregate([
        { $project: { _id: 0 } },
        { $unionWith: { coll: tempIntermediateCollectionName, pipeline: [{ $project: { _id: 0 } }] } },
        { $out: { db: dbName, coll: tempOutputCollectionName }}
    ])
}