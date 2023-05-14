use(dbName);

db.getCollection(inputGraphName).aggregate([
  // Project the source and destination nodes and weight into separate fields
  {
    $project: {
      _id: 0,
      source: "$u",
      destination: "$v",
      weight: "$w",
    },
  },
  // Group by the source node and create an array of destination nodes with weights
  {
    $group: {
      _id: "$source",
      edges: {
        $push: {
          v: "$destination",
          w: "$weight",
        },
      },
    },
  },
  // Project the final output to rename fields and output to a new collection
  {
    $project: {
      _id: 0,
      u: "$_id",
      edges: 1,
    },
  },
  {
    $out: outputGraphName,
  },
]);
