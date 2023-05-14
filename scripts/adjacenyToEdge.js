use(dbName);

db.getCollection(inputGraphName).aggregate([
    // Unwind the edges array to create one document per edge
    {
      $unwind: "$edges"
    },
    // Project the fields into the format u, v, and w
    {
      $project: {
        _id: 0,
        u: "$u",
        v: "$edges.v",
        w: "$edges.w"
      }
    },
    // Output to a new collection
    {
      $out: outputGraphName
    }
  ])