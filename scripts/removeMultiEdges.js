use(dbName);

db.getCollection(inputGraphName).aggregate([
  {
    $group: {
      _id: { u: "$u", v: "$v" },
      w: { $sum: "$w" }
    }
  },
  {
    $project: {
      _id: 0,
      u: "$_id.u",
      v: "$_id.v",
      w: "$w"
    }
  },
  { $out: outputGraphName },
]);
