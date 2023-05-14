use(dbName);

db.getCollection(inputGraphName).aggregate([
    { $project: { _id: 0, u: 1, v: 1, w: 1 } },
    { $addFields: { reverse: { u: "$v", v: "$u", w: "$w" } } },
    { $project: { edges: { $concatArrays: [ ["$$ROOT"], ["$reverse"] ] } } },
    { $unwind: "$edges" },
    { $replaceRoot: { newRoot: "$edges" } },
    { $project: { reverse: 0 } },
    { $out: outputGraphName }
  ]);