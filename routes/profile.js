const express = require("express");
const router = express.Router();
const Profile = require("../models/profileModel");

router.post("/createProfile", async (req, res) => {
  const { meno, priezvisko, rfid } = req.body;

  try {
    const profile = await Profile.create({
      meno: meno,
      priezvisko: priezvisko,
      rfid: rfid,
      teplota: 0,
      spotreba: 0,
      cas: 0,
    });

    if (profile) {
      res.status(200).json(profile);
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.get("/getProfiles", async (req, res) => {
  try {
    const profiles = await Profile.find();
    res.status(200).json(profiles);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.delete("/deleteProfile", async (req, res) => {
  const id = req.query.id;

  try {
    const profile = await Profile.findByIdAndDelete(id);

    res.status(200).json(profile);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.put("/editProfile", async (req, res) => {
  const id = req.query.id;
  const { meno, priezvisko, teplota, spotreba, cas, rfid } = req.body;

  try {
    const profile = await Profile.findById(id);

    profile.meno = meno || profile.meno;
    profile.priezvisko = priezvisko || profile.priezvisko;
    profile.teplota = teplota || profile.teplota;
    profile.spotreba = spotreba || profile.spotreba;
    profile.cas = cas || profile.cas;
    profile.rfid = rfid || profile.rfid;

    await profile.save();

    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
