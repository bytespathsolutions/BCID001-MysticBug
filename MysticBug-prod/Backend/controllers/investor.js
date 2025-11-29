import { User } from "../models/user.js"
export const getAllInvestors = async (req, res) => {
  try {
    const investorsData = await User.find({ userType: "investor" })
      .select("name income expense profits roi");

    res.status(200).json({ success: true, investors: investorsData });
  } catch (err) {
    console.error("Error fetching investors:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
}

export const getSpecificInvestor = async (req, res) => {
  try {
    const { uid } = req.params
    const investorData = await User.find({ uid, userType: "investor" }).select("name income expense profits roi");
    if (investorData.length === 0) {
      return res.status(404).json({ message: "investor not found" })
    }
    res.status(200).json({ investorData: investorData })
  } catch (error) {
    console.error("Error fetching investor data:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
}

export const updateInvestorById = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedInvestor = await User.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    }).select("name email income expense profits roi rating allowLogin isActive");

    if (!updatedInvestor) {
      return res
        .status(404)
        .json({ success: false, message: "Investor not found" });
    }

    res.status(200).json({ success: true, investor: updatedInvestor });
  } catch (err) {
    console.error("Error updating investor:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
}