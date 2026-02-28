const Member = require("../models/Member");
const Team = require("../models/Team");


// ================= GET MY PROFILE =================
exports.getMyProfile = async (req, res) => {
  try {
    const member = await Member.findById(req.user.id);

    if (!member || !member.teamMemberId)
      return res.status(404).json({ message: "Profile not found" });

    const teamData = await Team.findById(member.teamMemberId);

    res.json(teamData);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Fetch failed" });
  }
};


// ================= UPDATE MY PROFILE =================
exports.updateMyProfile = async (req, res) => {
  try {
    const member = await Member.findById(req.user.id);

    if (!member || !member.teamMemberId)
      return res.status(404).json({ message: "Profile not found" });

    const updated = await Team.findByIdAndUpdate(
      member.teamMemberId,
      {
        name: req.body.name,
        designation: req.body.designation,
        specialization: req.body.specialization,
        experience: req.body.experience,
        skills: req.body.skills || [],
        projects: req.body.projects || [],
        workExperience: req.body.workExperience || []
      },
      { new: true }
    );

    res.json(updated);

  } catch (err) {
    console.error("UPDATE ERROR:", err);
    res.status(500).json({ message: "Update failed" });
  }
};