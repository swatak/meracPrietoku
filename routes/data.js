const express = require("express");
const router = express.Router();
const Data = require("../models/dataModel");
const Profile = require("../models/profileModel");

router.put("/createLog", async (req, res) => {
  const { spotreba, teplota, rfid, time } = req.body;

  try {
    const profile = await Profile.findOne({ rfid });

    if (profile) {
      let meno = profile.meno;
      let priezvisko = profile.priezvisko;

      const data = await Data.create({
        meno: meno,
        priezvisko: priezvisko,
        spotreba: spotreba,
        teplota: teplota,
        rfid: rfid,
        cas: time,
      });

      const spotrebaUzivatela = profile.spotreba;
      const pridanaSpotreba = spotrebaUzivatela + spotreba;

      const casUzivatela = profile.cas;
      const pridanyCas = Math.round(time / 1000) + casUzivatela;

      const teplotaUzivatela = profile.teplota;

      if (teplotaUzivatela === 0) {
        pridanaTeplota = teplota;
      } else {
        //pridanaTeplota = (teplotaUzivatela + teplota) / 2;
        pridanaTeplota = Math.round((teplotaUzivatela + teplota) / 2);
      }

      await Profile.updateOne(
        { rfid: rfid },
        {
          $set: {
            spotreba: pridanaSpotreba,
            teplota: pridanaTeplota,
            cas: pridanyCas,
          },
        }
      );

      console.log("Data Created with name/surname:", data);

      return res.status(200).json(data);
    } else {
      const data = await Data.create({
        meno: "Unknown",
        priezvisko: "Unknown",
        spotreba: spotreba,
        teplota: teplota,
        rfid: rfid,
        cas: time,
      });
      console.log("Data Created without name/surname:", data);

      return res.status(200).json(data);
    }
  } catch (error) {
    console.error("Error Creating Data:", error);
    res.status(400).json({ error: error.message });
  }
});

router.get("/getData", async (req, res) => {
  try {
    const data = await Data.find();

    if (data) {
      res.status(200).json(data);
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

module.exports = router;
