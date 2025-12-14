exports.exitVisitor = async (req, res) => {
  const { visitId } = req.body;

  await VisitLog.findByIdAndUpdate(visitId, {
    exitTime: new Date(),
    status: "COMPLETED"
  });

  res.json({ message: "Exit logged" });
};
