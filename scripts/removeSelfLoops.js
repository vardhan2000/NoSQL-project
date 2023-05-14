use(dbName);

db.getCollection(inputGraphName).aggregate([
  { $match: { $expr: { $ne: [ "$u", "$v" ] } } },
  { $out: outputGraphName },
]);
