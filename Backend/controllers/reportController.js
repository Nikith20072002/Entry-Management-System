const VisitLog = require("../models/VisitLog");

exports.dailyVisitors = async (req, res) => {
  const start = new Date();
  start.setHours(0, 0, 0, 0);

  const end = new Date();
  end.setHours(23, 59, 59, 999);

  const count = await VisitLog.countDocuments({
    entryTime: { $gte: start, $lte: end }
  });

  res.json({ date: start.toDateString(), visitors: count });
};
exports.visitorsByDateRange = async (req, res) => {
  const { from, to } = req.query;

  const visitors = await VisitLog.countDocuments({
    entryTime: {
      $gte: new Date(from),
      $lte: new Date(to)
    }
  });

  res.json({ from, to, visitors });
};
exports.flatWiseVisitors = async (req, res) => {
  const { flatNo } = req.params;

  const data = await VisitLog.aggregate([
    {
      $lookup: {
        from: "residents",
        localField: "residentId",
        foreignField: "_id",
        as: "resident"
      }
    },
    { $unwind: "$resident" },
    { $match: { "resident.flatNo": flatNo } },
    {
      $lookup: {
        from: "visitors",
        localField: "visitorId",
        foreignField: "_id",
        as: "visitor"
      }
    },
    { $unwind: "$visitor" },
    {
      $project: {
        entryTime: 1,
        exitTime: 1,
        "visitor.name": 1,
        "visitor.phone": 1
      }
    }
  ]);

  res.json(data);
};
exports.currentVisitors = async (req, res) => {
  const visitors = await VisitLog.find({
    exitTime: null,
    status: "APPROVED"
  })
    .populate("visitorId", "name phone")
    .populate("residentId", "flatNo");

  res.json(visitors);
};
exports.topVisitedFlats = async (req, res) => {
  const data = await VisitLog.aggregate([
    {
      $group: {
        _id: "$residentId",
        visitCount: { $sum: 1 }
      }
    },
    { $sort: { visitCount: -1 } },
    { $limit: 5 },
    {
      $lookup: {
        from: "residents",
        localField: "_id",
        foreignField: "_id",
        as: "resident"
      }
    },
    { $unwind: "$resident" },
    {
      $project: {
        flatNo: "$resident.flatNo",
        visitCount: 1
      }
    }
  ]);

  res.json(data);
};
exports.guardActivity = async (req, res) => {
  const data = await VisitLog.aggregate([
    {
      $group: {
        _id: "$guardId",
        totalEntries: { $sum: 1 }
      }
    },
    {
      $lookup: {
        from: "guards",
        localField: "_id",
        foreignField: "_id",
        as: "guard"
      }
    },
    { $unwind: "$guard" },
    {
      $project: {
        guardName: "$guard.name",
        totalEntries: 1
      }
    }
  ]);

  res.json(data);
};
