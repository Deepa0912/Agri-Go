const express = require('express');
const router = express.Router();

// Agronomic data matrix for crops
const CROP_DATA = {
  "Tomato": {
    baseNPK: { N: 60, P: 40, K: 60 },
    waterNeedsLitersPerAcreDay: 14000,
    optimalMoistureMin: 60,
    optimalMoistureMax: 80,
    stageMultiplier: {
      "Germination": 0.5,
      "Vegetative": 1.0,
      "Flowering": 1.4,
      "Fruiting/Maturity": 1.2
    }
  },
  "Wheat": {
    baseNPK: { N: 50, P: 25, K: 25 },
    waterNeedsLitersPerAcreDay: 11000,
    optimalMoistureMin: 50,
    optimalMoistureMax: 70,
    stageMultiplier: {
      "Germination": 0.6,
      "Vegetative": 1.1,
      "Flowering": 1.3,
      "Fruiting/Maturity": 0.8
    }
  },
  "Rice": {
    baseNPK: { N: 70, P: 35, K: 45 },
    waterNeedsLitersPerAcreDay: 22000,
    optimalMoistureMin: 80,
    optimalMoistureMax: 100,
    stageMultiplier: {
      "Germination": 0.8,
      "Vegetative": 1.2,
      "Flowering": 1.5,
      "Fruiting/Maturity": 0.9
    }
  },
  "Maize / Corn": {
    baseNPK: { N: 65, P: 35, K: 40 },
    waterNeedsLitersPerAcreDay: 13500,
    optimalMoistureMin: 55,
    optimalMoistureMax: 75,
    stageMultiplier: {
      "Germination": 0.5,
      "Vegetative": 1.2,
      "Flowering": 1.5,
      "Fruiting/Maturity": 1.0
    }
  },
  "Potato": {
    baseNPK: { N: 75, P: 50, K: 90 },
    waterNeedsLitersPerAcreDay: 12500,
    optimalMoistureMin: 65,
    optimalMoistureMax: 80,
    stageMultiplier: {
      "Germination": 0.6,
      "Vegetative": 1.1,
      "Flowering": 1.4,
      "Fruiting/Maturity": 0.9
    }
  },
  "Cotton": {
    baseNPK: { N: 55, P: 30, K: 35 },
    waterNeedsLitersPerAcreDay: 13000,
    optimalMoistureMin: 50,
    optimalMoistureMax: 70,
    stageMultiplier: {
      "Germination": 0.5,
      "Vegetative": 1.0,
      "Flowering": 1.3,
      "Fruiting/Maturity": 0.7
    }
  }
};

// Soil factor adjustments
const SOIL_FACTORS = {
  "Clay": { waterRetention: 1.3, npkLeachingFactor: 0.9, advice: "High clay content retains moisture well. Irrigate less frequently but deeply to prevent root rot." },
  "Loam": { waterRetention: 1.0, npkLeachingFactor: 1.0, advice: "Ideal loam soil balance. Maintain regular irrigation and balanced fertigation split applications." },
  "Sandy": { waterRetention: 0.7, npkLeachingFactor: 1.3, advice: "Sandy soil drains rapidly. Split irrigation into smaller, frequent daily doses to prevent nutrient leaching." },
  "Silt": { waterRetention: 1.1, npkLeachingFactor: 1.05, advice: "Silt soil holds nutrients well. Ensure good surface drainage to avoid crusting." }
};

// POST /api/schedule/calculate
router.post('/calculate', (req, res) => {
  try {
    const {
      crop = "Tomato",
      soilType = "Loam",
      growthStage = "Flowering",
      acreage = 2.5,
      currentSoilMoisture = 45, // percentage
      soilNPK = { N: 30, P: 20, K: 25 } // current soil levels
    } = req.body;

    const cropInfo = CROP_DATA[crop] || CROP_DATA["Tomato"];
    const soilInfo = SOIL_FACTORS[soilType] || SOIL_FACTORS["Loam"];
    const stageMult = cropInfo.stageMultiplier[growthStage] || 1.0;

    // Calculate NPK requirements in kg per acre
    const targetN = Math.round(cropInfo.baseNPK.N * stageMult * soilInfo.npkLeachingFactor);
    const targetP = Math.round(cropInfo.baseNPK.P * stageMult * soilInfo.npkLeachingFactor);
    const targetK = Math.round(cropInfo.baseNPK.K * stageMult * soilInfo.npkLeachingFactor);

    const deficitN = Math.max(0, targetN - (soilNPK.N || 0));
    const deficitP = Math.max(0, targetP - (soilNPK.P || 0));
    const deficitK = Math.max(0, targetK - (soilNPK.K || 0));

    // Convert NPK deficit into commercial fertilizer quantities (e.g., Urea 46% N, DAP 18-46-0, MOP 60% K2O)
    const ureaKg = Math.round((deficitN / 0.46) * acreage);
    const dapKg = Math.round((deficitP / 0.46) * acreage);
    const mopKg = Math.round((deficitK / 0.60) * acreage);

    // Calculate Water Volume (Liters per acre per day)
    const moistureDeficitRatio = Math.max(0.1, (cropInfo.optimalMoistureMax - currentSoilMoisture) / 100);
    const baseDailyLitersPerAcre = Math.round(cropInfo.waterNeedsLitersPerAcreDay * stageMult * moistureDeficitRatio * soilInfo.waterRetention);
    const totalDailyLiters = baseDailyLitersPerAcre * acreage;

    // Build 7-day actionable calendar schedule
    const daysOfWeek = ["Today", "Tomorrow", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"];
    const schedule = daysOfWeek.map((dayLabel, index) => {
      const date = new Date();
      date.setDate(date.getDate() + index);

      let actionType = "Irrigation";
      let waterLiters = totalDailyLiters;
      let fertRecommendation = null;
      let notes = "Normal drip cycle";

      if (index === 0) {
        actionType = "Irrigation + Fertigation";
        fertRecommendation = `Apply ${Math.round(ureaKg * 0.4)} kg Urea dissolved in drip tank`;
        notes = "First split dose of Nitrogen fertigation";
      } else if (index === 2) {
        actionType = "Fertilizer Top Dress";
        fertRecommendation = `Apply ${Math.round(dapKg * 0.5)} kg DAP + ${Math.round(mopKg * 0.5)} kg MOP around plant drip line`;
        notes = "Phosphorus & Potassium boost for root & flower development";
      } else if (index === 4) {
        actionType = "Irrigation + Fertigation";
        fertRecommendation = `Apply remaining ${Math.round(ureaKg * 0.6)} kg Urea`;
        notes = "Second split Nitrogen dose";
      } else if (index === 6) {
        actionType = "Maintenance & Moisture Check";
        waterLiters = Math.round(totalDailyLiters * 0.7);
        notes = "Measure soil moisture with sensor probe prior to next week cycle";
      }

      // If sandy soil, recommend morning & evening split
      if (soilType === "Sandy") {
        notes += " (Split 50% morning / 50% evening)";
      }

      return {
        day: dayLabel,
        dateString: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', weekday: 'short' }),
        actionType,
        waterVolumeLiters: Math.round(waterLiters),
        waterVolumeGallons: Math.round(waterLiters * 0.264172),
        durationMinutes: Math.round(waterLiters / (15 * acreage)), // assuming 15L/min per acre drip
        fertilizerDetail: fertRecommendation,
        notes
      };
    });

    return res.json({
      success: true,
      timestamp: new Date().toISOString(),
      summary: {
        crop,
        soilType,
        growthStage,
        acreage,
        currentSoilMoisture,
        moistureStatus: currentSoilMoisture < cropInfo.optimalMoistureMin ? "Low - Requires immediate irrigation" : currentSoilMoisture > cropInfo.optimalMoistureMax ? "Optimal / Wet" : "Adequate"
      },
      nutrientAnalysis: {
        targetsKgPerAcre: { N: targetN, P: targetP, K: targetK },
        deficitsKgPerAcre: { N: deficitN, P: deficitP, K: deficitK },
        totalFarmDeficitKg: {
          N: Math.round(deficitN * acreage),
          P: Math.round(deficitP * acreage),
          K: Math.round(deficitK * acreage)
        },
        commercialFertilizerNeeds: {
          urea: `${ureaKg} kg (46% N)`,
          dap: `${dapKg} kg (Di-Ammonium Phosphate 18-46-0)`,
          mop: `${mopKg} kg (Muriate of Potash 60% K2O)`
        }
      },
      waterRequirement: {
        dailyPerAcreLiters: baseDailyLitersPerAcre,
        totalFarmDailyLiters: totalDailyLiters,
        weeklyTotalCubicMeters: Math.round((totalDailyLiters * 7) / 1000),
        soilAdvice: soilInfo.advice
      },
      schedule
    });
  } catch (error) {
    console.error("Schedule error:", error);
    res.status(500).json({ success: false, message: "Error calculating recommendations." });
  }
});

module.exports = router;
