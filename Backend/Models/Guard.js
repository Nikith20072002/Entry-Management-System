const GuardSchema = new mongoose.Schema({
  name: String,
  username: String,
  passwordHash: String,
  shift: String
});

module.exports = mongoose.model("Guard", GuardSchema);
