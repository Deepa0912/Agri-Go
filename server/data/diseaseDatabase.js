// Rich Agronomic Knowledge Base for Leaf Disease Diagnosis
const diseaseDatabase = [
  {
    id: "tomato_early_blight",
    crop: "Tomato",
    diseaseName: "Early Blight (Alternaria solani)",
    confidence: 96.4,
    severity: "Moderate to High",
    severityScore: 68,
    affectedArea: "18-25% leaf surface",
    symptoms: [
      "Concentric ringed brown/black spots ('bullseye' pattern) on older lower leaves",
      "Yellow halos surrounding necrotic spots",
      "Defoliation starting from ground up, leaving fruit vulnerable to sunscald"
    ],
    cause: "Fungal pathogen *Alternaria solani* thriving in warm temperatures (24-29°C) with prolonged leaf wetness or high humidity.",
    organicTreatment: [
      "Apply copper octanoate or copper hydroxide spray early in the morning.",
      "Prune affected lower leaves (bottom 12 inches) and destroy them. Do not compost infected leaves.",
      "Spray Neem oil solution (2 tbsp/gallon water) every 7-10 days to inhibit fungal sporulation."
    ],
    chemicalTreatment: [
      "Fungicide spray containing Chlorothalonil or Mancozeb at first sign of spots.",
      "Systemic treatment with Azoxystrobin or Difenoconazole for advanced infections.",
      "Rotate active fungicide classes every 14 days to prevent fungal resistance."
    ],
    prevention: [
      "Enforce 3-year crop rotation with non-solanaceous crops (avoid peppers, eggplant, potatoes).",
      "Install drip irrigation instead of overhead sprinklers to keep leaves dry.",
      "Apply heavy organic mulch (straw or wood chips) to stop soil-borne fungal spores splashing onto lower leaves."
    ],
    boxHighlights: [
      { x: 32, y: 28, width: 22, height: 20, label: "Bullseye Lesion" },
      { x: 58, y: 45, width: 25, height: 24, label: "Chlorotic Yellow Halo" }
    ]
  },
  {
    id: "tomato_late_blight",
    crop: "Tomato",
    diseaseName: "Late Blight (Phytophthora infestans)",
    confidence: 94.8,
    severity: "Critical / High Risk",
    severityScore: 88,
    affectedArea: "35-45% leaf surface",
    symptoms: [
      "Large, dark water-soaked dark green/brown spots near leaf tips",
      "White fuzzy mildew growth under the leaf surface during humid conditions",
      "Rapid wilting and collapse of leaves and stems within days"
    ],
    cause: "Oomycete pathogen *Phytophthora infestans* favored by cool, foggy/rainy weather (15-22°C) and 90%+ relative humidity.",
    organicTreatment: [
      "Immediate application of Bordeaux mixture or liquid Copper Fungicide.",
      "Remove and safely burn or double-bag severely infected whole plants to save adjacent crops.",
      "Apply Bio-fungicide *Bacillus subtilis* to protect healthy surrounding foliage."
    ],
    chemicalTreatment: [
      "Fungicide applications with Cymoxanil + Mancozeb or Dimethomorph.",
      "Systemic curative spray with Metalaxyl / Mefenoxam + Chlorothalonil.",
      "Spray preventative broad-spectrum barrier fungicides prior to predicted rain events."
    ],
    prevention: [
      "Plant blight-resistant tomato cultivars (e.g., Defiant PHR, Mountain Magic).",
      "Maintain wide plant spacing (24-30 inches) to ensure maximum airflow and rapid canopy drying.",
      "Monitor local late-blight forecast alerts during cool humid spells."
    ],
    boxHighlights: [
      { x: 25, y: 20, width: 35, height: 30, label: "Water-soaked Blight Spot" },
      { x: 40, y: 55, width: 30, height: 28, label: "Under-leaf Sporulation Zone" }
    ]
  },
  {
    id: "corn_common_rust",
    crop: "Corn / Maize",
    diseaseName: "Common Rust (Puccinia sorghi)",
    confidence: 97.1,
    severity: "Moderate",
    severityScore: 52,
    affectedArea: "12-18% leaf surface",
    symptoms: [
      "Elongated cinnamon-brown to reddish pustules on upper and lower leaf surfaces",
      "Pustules rupture the leaf epidermis revealing powdery brick-red spores",
      "Leaf chlorosis and yellowing surrounding high-density pustule clusters"
    ],
    cause: "Airborne fungal urediniospores of *Puccinia sorghi* carried by wind currents from southern regions during warm humid conditions (16-25°C).",
    organicTreatment: [
      "Apply sulfur-based agricultural dust or wettable sulfur spray.",
      "Spray bio-control agent *Trichoderma harzianum* to inhibit spore germination.",
      "Foliar spray of garlic extract + insecticidal soap solution."
    ],
    chemicalTreatment: [
      "Fungicides containing Pyraclostrobin, Propiconazole, or Tebuconazole.",
      "Foliar application if rust infects upper canopy prior to silking stage.",
      "Apply combination Strobilurin + Triazole formulation for optimal residual control."
    ],
    prevention: [
      "Select rust-resistant hybrid seed varieties.",
      "Plant early in the season to avoid peak spore migration windows.",
      "Maintain balanced nitrogen fertilization (excess N worsens rust susceptibility)."
    ],
    boxHighlights: [
      { x: 20, y: 35, width: 18, height: 40, label: "Reddish Rust Pustules" },
      { x: 50, y: 25, width: 22, height: 45, label: "Powdery Spore Cluster" }
    ]
  },
  {
    id: "apple_black_rot",
    crop: "Apple",
    diseaseName: "Black Rot (Botryosphaeria obtusa)",
    confidence: 95.2,
    severity: "Moderate to High",
    severityScore: 64,
    affectedArea: "15-22% leaf surface",
    symptoms: [
      "Frog-eye leaf spots: small purple specks expanding into brown spots with dark purple borders",
      "Cankers on twigs and branches",
      "Rotting fruit with concentric black rings ('black rot') hanging as mummies"
    ],
    cause: "Fungal spore release from overwintered branch cankers and mummified fruit, activated by warm wet spring weather (20-27°C).",
    organicTreatment: [
      "Prune out dead wood, fire blight cankers, and mummified apples during dormant season.",
      "Apply Lime Sulfur or Copper Sulfate sprays at bud break.",
      "Remove all fallen leaves and debris beneath apple trees."
    ],
    chemicalTreatment: [
      "Captan or Mancozeb fungicide sprays applied from pink bud through petal fall.",
      "Thiophanate-methyl or Flutriafol systemic application for active cankers.",
      "Post-harvest sanitation spray to suppress overwintering inocula."
    ],
    prevention: [
      "Keep orchard floor clean of mummified fruit and infected prunings.",
      "Ensure proper canopy pruning to maximize sunlight penetration and wind drying.",
      "Prevent mechanical insect damage on fruit skins."
    ],
    boxHighlights: [
      { x: 30, y: 30, width: 25, height: 25, label: "Frog-eye Lesion" },
      { x: 60, y: 50, width: 20, height: 20, label: "Purple Border Necrotic Ring" }
    ]
  },
  {
    id: "rice_brown_spot",
    crop: "Rice",
    diseaseName: "Brown Spot (Bipolaris oryzae)",
    confidence: 96.8,
    severity: "Moderate",
    severityScore: 58,
    affectedArea: "20-28% leaf surface",
    symptoms: [
      "Oval or circular dark brown sesame-seed shaped spots on leaves",
      "Center of mature spots turns light brown/gray with a dark reddish-brown margin",
      "Severe spotting causes leaf blade wilting and poor grain filling (spotting on glumes)"
    ],
    cause: "Fungal pathogen *Bipolaris oryzae*, strongly linked to nutrient deficiency (especially Potassium and Nitrogen) and drought-stressed soil.",
    organicTreatment: [
      "Treat seeds with *Pseudomonas fluorescens* bio-formulation prior to sowing.",
      "Foliar spray of Potassium Silicate or liquid fermented compost tea.",
      "Soil application of organic compost enriched with Neem cake."
    ],
    chemicalTreatment: [
      "Seed dressing with Thiram, Carboxin, or Carbendazim.",
      "Foliar spray with Edifenphos, Mancozeb, or Propiconazole at tillering stage.",
      "Correct potassium soil deficit with Muriate of Potash (MOP) top dressing."
    ],
    prevention: [
      "Correct soil nutrient imbalances (ensure adequate Potassium & Silicon).",
      "Maintain consistent 5cm water depth in rice paddies; avoid dry soil stress.",
      "Use certified disease-free seeds and balanced soil testing."
    ],
    boxHighlights: [
      { x: 28, y: 38, width: 24, height: 18, label: "Sesame-shaped Brown Spot" },
      { x: 55, y: 22, width: 22, height: 20, label: "Gray Center Necrosis" }
    ]
  },
  {
    id: "potato_early_blight",
    crop: "Potato",
    diseaseName: "Potato Early Blight (Alternaria solani)",
    confidence: 93.9,
    severity: "Moderate",
    severityScore: 55,
    affectedArea: "15-20% leaf surface",
    symptoms: [
      "Dark brown to black target-board spots on older leaves",
      "Leaf tissue between spots yellowing prematurely",
      "Tuber skin showing sunken dark brown corky lesions"
    ],
    cause: "Spore infection on aging tissue under alternating dry and wet weather patterns.",
    organicTreatment: [
      "Apply copper sulfate or liquid copper octanoate spray.",
      "Destroy infected vines 2 weeks prior to tuber harvest.",
      "Spray compost tea enriched with beneficial microbes."
    ],
    chemicalTreatment: [
      "Chlorothalonil, Mancozeb, or Difenoconazole foliar sprays.",
      "Apply Famoxadone + Cymoxanil when canopy closes."
    ],
    prevention: [
      "Maintain high plant vigor with balanced fertilizer applications.",
      "Use drip irrigation to prevent long leaf wetness duration.",
      "Rotate with non-solanaceous crops like legumes or cereals."
    ],
    boxHighlights: [
      { x: 35, y: 40, width: 22, height: 22, label: "Concentric Target Spot" }
    ]
  },
  {
    id: "grape_black_rot",
    crop: "Grape",
    diseaseName: "Grape Black Rot (Guignardia bidwellii)",
    confidence: 95.9,
    severity: "High",
    severityScore: 76,
    affectedArea: "25-32% leaf surface",
    symptoms: [
      "Small reddish-brown circular spots on leaves with dark margins",
      "Tiny black spore-producing dots (pycnidia) inside leaf lesions",
      "Berries turn brown, shrivel into hard, black mummified grapes"
    ],
    cause: "Overwintering fungal spores in mummified berries and canes released during spring rains at 20-27°C.",
    organicTreatment: [
      "Apply Copper Hydroxide + Lime sulfur at bud break.",
      "Meticulously remove mummified grape clusters and infected canes.",
      "Foliar application of Potassium Bicarbonate spray."
    ],
    chemicalTreatment: [
      "Myclobutanil, Difenoconazole, or Captan spray applications from pre-bloom through 4 weeks post-bloom."
    ],
    prevention: [
      "Canopy management: leaf pulling around fruit zone for maximum sunlight and air movement.",
      "Complete sanitation of vineyard debris before winter."
    ],
    boxHighlights: [
      { x: 30, y: 35, width: 26, height: 26, label: "Reddish-Brown Leaf Spot" },
      { x: 62, y: 48, width: 18, height: 18, label: "Black Pycnidia Dots" }
    ]
  },
  {
    id: "healthy_leaf",
    crop: "General / Multi-Crop",
    diseaseName: "Healthy Crop Leaf (No Disease Detected)",
    confidence: 98.9,
    severity: "None / Healthy",
    severityScore: 0,
    affectedArea: "0% (Vibrant & Healthy)",
    symptoms: [
      "Uniform green pigmentation across leaf blade",
      "Intact cell walls without necrotic lesions, pustules, or wilting",
      "Optimal chlorophyll density and leaf turgidity"
    ],
    cause: "Optimal agronomic conditions, balanced soil fertility, appropriate irrigation, and effective pest management.",
    organicTreatment: [
      "No chemical treatment required!",
      "Maintain current organic soil enrichment (vermicompost, bio-char).",
      "Continue monitoring leaves bi-weekly as a proactive measure."
    ],
    chemicalTreatment: [
      "No chemical fungicides needed. Save input costs!"
    ],
    prevention: [
      "Maintain balanced N-P-K nutrient schedules.",
      "Keep field scouted regularly for early pest or disease signs.",
      "Ensure proper drainage and soil aeration."
    ],
    boxHighlights: []
  }
];

module.exports = diseaseDatabase;
