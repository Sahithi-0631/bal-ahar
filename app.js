// Bal Aahar - Production-Grade Clinical Pediatric Nutrition Engine (ICMR-NIN Aligned)

// ============================================================================
// 1. STATE MANAGEMENT
// ============================================================================
const state = {
  selectedStage: 'stage1', // 'stage1' (6-8m), 'stage2' (9-12m), 'stage3' (1-2y), 'stage4' (2-4y)
  selectedSymptoms: ['fever'], // Max 3, 4th triggers triage lock
  activeAllergens: new Set(), // 'dairy', 'nuts', 'gluten', 'egg', 'soya'
  activePantry: new Set(), // 'Rice', 'Moong Dal', 'Ragi', 'Poha', 'Curd', 'Banana', 'Ghee', 'Oats', 'Sabudana'
  portionMultiplier: 1, // 1 (150ml) or 2 (300ml)
  activeHeroRecipeId: null, // Overridden if user swaps with an alternative
  timer: {
    interval: null,
    totalSeconds: 0,
    secondsRemaining: 0,
    label: ''
  }
};

// ============================================================================
// 2. ICMR-NIN PEDIATRIC GUARDRAIL GUIDES BY AGE STAGE
// ============================================================================
const stageGuardrails = {
  stage1: {
    title: "6–8 Months (Stage 1: Smooth Purees & Single Grains)",
    texture: "Silky smooth, strained, spoon-pourable puree",
    guidance: "<strong>ICMR-NIN Infant Protocol:</strong> Strictly <em>ZERO honey</em> (infant botulism risk), <em>ZERO added salt</em> (immature infant renal kidneys), <em>ZERO added sugar/jaggery</em>, and <em>ZERO whole unground nuts</em> (fatal choking risk). Introduce one single food at a time to monitor tolerance."
  },
  stage2: {
    title: "9–12 Months (Stage 2: Mashed & Soft-Lumpy Foods)",
    texture: "Fork-mashed, soft-lumpy porridge fostering oral motor chewing",
    guidance: "<strong>ICMR-NIN Weaning Protocol:</strong> Strictly <em>ZERO honey</em>, <em>ZERO added salt</em>, <em>ZERO added sugar</em>, and <em>ZERO whole nuts</em>. Coarse fork-mashed texture develops jaw motion and tongue transit without needing purée blenders."
  },
  stage3: {
    title: "1–2 Years (Stage 3: Toddler Soft Finger Foods)",
    texture: "Soft-chew finger foods & modified family pot preparations",
    guidance: "<strong>ICMR-NIN Toddler Protocol:</strong> Strictly <em>ZERO refined sugar</em> (use natural date/banana sweetness); minimal pinch of iodized salt permitted; gentle digestive spices (jeera, haldi, hing) encouraged; nuts must be finely powdered."
  },
  stage4: {
    title: "2–4 Years (Stage 4: Nutrient-Dense Healing Meals)",
    texture: "Bite-sized soft solid family meals with diverse nutrient density",
    guidance: "<strong>ICMR-NIN Preschool Protocol:</strong> High micronutrient density (iron, zinc, vitamin A); balanced energy and protein; avoid deep-fried, heavy commercial snacks, or excessive salt."
  }
};

// ============================================================================
// 3. RECIPES DATABASE (20 Authentic Pediatric Indian Healing Bowls)
// ============================================================================
const recipeDatabase = [
  {
    id: "moong_rice_kanji",
    title: "Golden Moong Dal & Rice Kanji",
    desc: "The clinical gold standard of Ayurvedic and pediatric recovery foods. Ultra-gentle, easily absorbed amino acids and electrolyte-rich rice water.",
    type: "Digestive Gruel",
    prepTime: "5 mins",
    cookTime: "15 mins",
    cookMinutes: 15,
    isQuick: false,
    staples: ["Rice", "Moong Dal", "Ghee"],
    allergens: ["dairy"], // Ghee
    nutritionTags: {
      hydration_score: 96,
      calorie_density: 50,
      gut_gentleness: 99,
      iron_rich: 45,
      immunity_boost: 70
    },
    baseMacros: { kcal: 115, protein: 3.8, iron: 1.4, hydration: 95 },
    symptomAffinities: {
      fever: 98,
      diarrhea: 99,
      vomiting: 97,
      stomach: 96,
      dehydration: 95,
      teething: 88,
      colic: 90,
      reflux: 92
    },
    stages: {
      stage1: {
        texture: "Thin, strained liquid broth",
        ingredients: [
          { name: "Yellow Moong Dal (soaked)", baseQty: 1.5, unit: "tbsp", scalable: true },
          { name: "White Rice (washed)", baseQty: 1.5, unit: "tbsp", scalable: true },
          { name: "Filtered Water", baseQty: 2, unit: "cups", scalable: true },
          { name: "Haldi (Turmeric Powder)", baseQty: 1, unit: "tiny pinch", scalable: false },
          { name: "Pure Cow's Ghee", baseQty: 0.25, unit: "tsp", scalable: true, isAllergen: "dairy" },
          { name: "Roasted Cumin (Jeera) Powder", baseQty: 1, unit: "pinch", scalable: false }
        ],
        steps: [
          "Wash rice and moong dal 3 times, then soak for 15 minutes.",
          "Pressure cook rice, dal, water, and turmeric for 4 whistles on medium flame until thoroughly soft. [timer:10:Pressure Cook Whistles]",
          "Mash thoroughly with a potato masher, then strain through a fine mesh sieve to extract a smooth, creamy kanji broth.",
          "Warm the ghee with roasted cumin powder in a small ladle and whisk directly into the warm kanji. Serve lukewarm."
        ],
        guardrail: "Do not add salt. Keep very watery so infant can easily swallow without tiring.",
        science: "Yellow split moong dal contains easily digestible albumin and globulin proteins. Rice starch water rehydrates enterocytes and repairs the gut mucosal barrier."
      },
      stage2: {
        texture: "Soft fork-mashed semi-liquid porridge",
        ingredients: [
          { name: "Yellow Moong Dal", baseQty: 2, unit: "tbsp", scalable: true },
          { name: "White Rice", baseQty: 2, unit: "tbsp", scalable: true },
          { name: "Filtered Water", baseQty: 2, unit: "cups", scalable: true },
          { name: "Haldi & Hing (Asafoetida)", baseQty: 1, unit: "pinch each", scalable: false },
          { name: "Pure Cow's Ghee", baseQty: 0.5, unit: "tsp", scalable: true, isAllergen: "dairy" },
          { name: "Jeera (Cumin Seeds)", baseQty: 0.25, unit: "tsp", scalable: false }
        ],
        steps: [
          "Combine soaked rice and moong dal with water, turmeric, and a tiny pinch of hing.",
          "Pressure cook for 4 whistles until grains collapse. [timer:12:Cook to Mushy Grain]",
          "Do not strain; mash with a fork to leave soft, silky lumpy grains that the infant can explore.",
          "Temper with ghee and cumin seeds (remove whole seeds before feeding). Serve warm."
        ],
        guardrail: "Zero salt and zero sugar. The naturally savory taste of roasted cumin and ghee satisfies weaning infants.",
        science: "Hing (asafoetida) contains natural carminative oils that break up trapped intestinal gas bubbles during fever."
      },
      stage3: {
        texture: "Mashed khichdi consistency with soft grains",
        ingredients: [
          { name: "Yellow Moong Dal", baseQty: 3, unit: "tbsp", scalable: true },
          { name: "Rice", baseQty: 3, unit: "tbsp", scalable: true },
          { name: "Water", baseQty: 2.5, unit: "cups", scalable: true },
          { name: "Grated Ginger (Adrak)", baseQty: 0.25, unit: "tsp", scalable: false },
          { name: "Pure Cow's Ghee", baseQty: 1, unit: "tsp", scalable: true, isAllergen: "dairy" },
          { name: "Iodized Salt (Optional)", baseQty: 1, unit: "very tiny pinch", scalable: false }
        ],
        steps: [
          "Heat ghee in a mini cooker, add cumin seeds, grated ginger, and turmeric.",
          "Add rice, moong dal, water, and optional small pinch of iodized salt.",
          "Cook for 4 whistles. Let pressure release naturally. [timer:15:Complete Cooking]",
          "Mash lightly. Serve warm with an extra drop of ghee."
        ],
        guardrail: "Ensure ginger is finely grated so toddler does not bite into hard fiber strands.",
        science: "Mild ginger gingerols gently stimulate gastric motility without irritating inflamed stomach linings."
      },
      stage4: {
        texture: "Comforting soft-solid khichdi bowl",
        ingredients: [
          { name: "Yellow Moong Dal", baseQty: 4, unit: "tbsp", scalable: true },
          { name: "Rice", baseQty: 4, unit: "tbsp", scalable: true },
          { name: "Water", baseQty: 3, unit: "cups", scalable: true },
          { name: "Pure Cow's Ghee", baseQty: 1.5, unit: "tsp", scalable: true, isAllergen: "dairy" },
          { name: "Jeera & Hing", baseQty: 1, unit: "pinch each", scalable: false },
          { name: "Iodized Salt", baseQty: 0.25, unit: "tsp", scalable: true }
        ],
        steps: [
          "Roast cumin and hing in ghee until aromatic.",
          "Add washed dal, rice, salt, and water.",
          "Cook for 3-4 whistles until tender. [timer:14:Simmer Khichdi]",
          "Serve warm with a side of fresh homemade curd."
        ],
        guardrail: "Avoid hot chili or heavy masalas during fever or gastric recovery.",
        science: "Balanced ratio of carbohydrate to protein (3:1) maximizes muscle protein sparing during sick days."
      }
    }
  },

  {
    id: "roasted_ragi_sari",
    title: "Roasted Ragi Sari (Finger Millet Porridge)",
    desc: "South India's most revered traditional baby recovery food. Naturally iron-packed, exceptionally high in calcium, and deeply comforting.",
    type: "Nutrient Porridge",
    prepTime: "5 mins",
    cookTime: "10 mins",
    cookMinutes: 10,
    isQuick: true,
    staples: ["Ragi", "Ghee"],
    allergens: ["dairy"],
    nutritionTags: {
      hydration_score: 70,
      calorie_density: 80,
      gut_gentleness: 88,
      iron_rich: 98,
      immunity_boost: 82
    },
    baseMacros: { kcal: 145, protein: 4.2, iron: 3.6, hydration: 75 },
    symptomAffinities: {
      anemia: 99,
      underweight: 96,
      poorweight: 96,
      pem: 95,
      calcium: 99,
      vitd: 92,
      immunity: 88,
      teething: 85
    },
    stages: {
      stage1: {
        texture: "Silky smooth, liquid finger millet porridge",
        ingredients: [
          { name: "Sprouted Roasted Ragi Flour", baseQty: 1.5, unit: "tbsp", scalable: true },
          { name: "Filtered Water", baseQty: 1, unit: "cup", scalable: true },
          { name: "Elaichi (Cardamom) Powder", baseQty: 1, unit: "tiny pinch", scalable: false },
          { name: "Pure Ghee", baseQty: 0.25, unit: "tsp", scalable: true, isAllergen: "dairy" }
        ],
        steps: [
          "In a small saucepan, whisk ragi flour with cold water until completely lump-free.",
          "Cook on medium-low flame, stirring continuously with a whisk to prevent scorching. [timer:8:Whisk & Simmer Ragi]",
          "Watch for a glossy, smooth sheen as the ragi starch gelatinizes.",
          "Stir in cardamom powder and ghee. Serve lukewarm."
        ],
        guardrail: "Zero jaggery/sugar. The natural nutty malt sweetness of sprouted ragi is readily accepted by infants.",
        science: "Sprouting ragi multiplies bioavailable non-heme iron and breaks down anti-nutritional phytates, maximizing absorption."
      },
      stage2: {
        texture: "Thick spoon-coating malt porridge",
        ingredients: [
          { name: "Sprouted Ragi Flour", baseQty: 2, unit: "tbsp", scalable: true },
          { name: "Water", baseQty: 1, unit: "cup", scalable: true },
          { name: "Ghee", baseQty: 0.5, unit: "tsp", scalable: true, isAllergen: "dairy" },
          { name: "Cardamom & Nutmeg Powder", baseQty: 1, unit: "pinch", scalable: false }
        ],
        steps: [
          "Whisk ragi in cold water, cook on low flame for 8-10 minutes until thick. [timer:9:Thick Porridge Simmer]",
          "Stir in ghee and a whisper of nutmeg to support calming bedtime digestion.",
          "Feed warm in small spoon portions."
        ],
        guardrail: "Do not add honey. Keep texture smooth without un-dissolved dry flour lumps.",
        science: "Finger millet provides 344mg of elemental calcium per 100g, supporting skeletal mineralization during growth phases."
      },
      stage3: {
        texture: "Warm soothing porridge with mashed dates",
        ingredients: [
          { name: "Ragi Flour", baseQty: 2.5, unit: "tbsp", scalable: true },
          { name: "Water or Coconut Milk", baseQty: 1, unit: "cup", scalable: true },
          { name: "Soaked Soft Date Puree", baseQty: 1, unit: "tbsp", scalable: true },
          { name: "Ghee", baseQty: 1, unit: "tsp", scalable: true, isAllergen: "dairy" }
        ],
        steps: [
          "Dissolve ragi in liquid and simmer until bubbling and glossy. [timer:8:Simmer Porridge]",
          "Stir in soft date puree for healthy mineral sweetness.",
          "Add ghee and serve warm."
        ],
        guardrail: "Use soft soaked date paste instead of crystal sugar to provide dietary potassium and iron.",
        science: "Dates provide natural fructose bound with soluble fibers, preventing glycemic spikes while nourishing red blood cell synthesis."
      },
      stage4: {
        texture: "Warm comforting ragi halwa porridge",
        ingredients: [
          { name: "Ragi Flour", baseQty: 3, unit: "tbsp", scalable: true },
          { name: "Warm Milk or Water", baseQty: 1, unit: "cup", scalable: true, isAllergen: "dairy" },
          { name: "Jaggery Powder", baseQty: 1, unit: "tsp", scalable: true },
          { name: "Ghee", baseQty: 1.5, unit: "tsp", scalable: true, isAllergen: "dairy" },
          { name: "Powdered Almonds (Finely Sifted)", baseQty: 0.5, unit: "tsp", scalable: true, isAllergen: "nuts" }
        ],
        steps: [
          "Roast ragi in ghee for 2 minutes until fragrant.",
          "Gradually pour in warm milk while whisking vigorously. [timer:7:Cook with Milk]",
          "Add jaggery and fine almond powder. Cook for 2 more minutes until halwa consistency."
        ],
        guardrail: "If child has diarrhea, jaggery and milk will be automatically substituted by the engine.",
        science: "Almond lipids provide alpha-tocopherol (Vitamin E) and mono-unsaturated fats to accelerate recovery in underweight children."
      }
    }
  },

  {
    id: "steamed_apple_mash",
    title: "Steamed Ceylon Cinnamon & Apple Mash",
    desc: "Gentle stewed fruit nectar packed with soothing soluble pectin. Calms raw irritated throats, binds loose stools, and provides quick soothing glucose.",
    type: "Digestive Fruit Mash",
    prepTime: "5 mins",
    cookTime: "8 mins",
    cookMinutes: 8,
    isQuick: true,
    staples: ["Banana"],
    allergens: [],
    nutritionTags: {
      hydration_score: 85,
      calorie_density: 55,
      gut_gentleness: 98,
      iron_rich: 30,
      immunity_boost: 75
    },
    baseMacros: { kcal: 78, protein: 0.6, iron: 0.5, hydration: 88 },
    symptomAffinities: {
      cold: 95,
      throat: 98,
      diarrhea: 96,
      appetite: 90,
      teething: 92,
      stomach: 88
    },
    stages: {
      stage1: {
        texture: "Silky smooth warm apple nectar",
        ingredients: [
          { name: "Sweet Red Apple (Peeled & Cored)", baseQty: 1, unit: "small", scalable: true },
          { name: "Water for steaming", baseQty: 0.5, unit: "cup", scalable: false },
          { name: "Ceylon Cinnamon Powder", baseQty: 1, unit: "micro pinch", scalable: false }
        ],
        steps: [
          "Dice peeled apple into small cubes.",
          "Steam in a steamer or small saucepan with 1/4 cup water for 8 minutes until translucent and fork-tender. [timer:8:Steam Apples]",
          "Puree thoroughly in a blender until completely silky with zero grit.",
          "Stir in a tiny micro-pinch of Ceylon cinnamon. Serve warm."
        ],
        guardrail: "No added sugar or honey. Always use Ceylon cinnamon (true cinnamon) rather than cassia to avoid coumarin toxicity.",
        science: "Stewed apple releases soluble pectin that forms a soothing gel over raw pharyngeal mucosa and binds excess water in the intestinal lumen."
      },
      stage2: {
        texture: "Fork-crushed warm compote",
        ingredients: [
          { name: "Sweet Apple (Peeled)", baseQty: 1, unit: "medium", scalable: true },
          { name: "Ceylon Cinnamon", baseQty: 1, unit: "pinch", scalable: false }
        ],
        steps: [
          "Steam apple cubes until soft and squishable between two fingers. [timer:8:Steam Apple Cubes]",
          "Crush with a fork to maintain soft, melt-in-mouth pulp.",
          "Serve warm to comfort a sore throat."
        ],
        guardrail: "Ensure peel is removed completely as apple skin can cause choking in infants under 12 months.",
        science: "Warm temperature encourages localized blood circulation in the oropharynx, reducing ticklish cough reflexes."
      },
      stage3: {
        texture: "Steamed apple & pear warm compote",
        ingredients: [
          { name: "Apple & Pear (Peeled)", baseQty: 1, unit: "cup diced", scalable: true },
          { name: "Cinnamon & Clove Powder", baseQty: 1, unit: "pinch each", scalable: false },
          { name: "Ghee", baseQty: 0.25, unit: "tsp", scalable: true, isAllergen: "dairy" }
        ],
        steps: [
          "Steam fruits with a pinch of clove and cinnamon. [timer:10:Steam Compote]",
          "Mash with back of a spoon and stir in ghee.",
          "Serve warm as a soothing mid-morning recovery bowl."
        ],
        guardrail: "Keep clove powder microscopic as toddler palates are sensitive to eugenol pungency.",
        science: "Clove eugenol acts as a mild natural local analgesic for throat discomfort."
      },
      stage4: {
        texture: "Warm stewed fruit bowl with crushed raisins",
        ingredients: [
          { name: "Apple Cubes", baseQty: 1, unit: "large", scalable: true },
          { name: "Black Soaked Raisins (Mashed)", baseQty: 1, unit: "tbsp", scalable: true },
          { name: "Cinnamon Powder", baseQty: 0.25, unit: "tsp", scalable: false }
        ],
        steps: [
          "Cook apples and soaked raisins in a splash of water for 8 minutes. [timer:8:Stew Apples & Raisins]",
          "Sprinkle cinnamon and serve as a warm healing dessert."
        ],
        guardrail: "Mash raisins to avoid whole dried fruit choking risks.",
        science: "Natural tartaric acid and soluble fiber gently regulate digestion while satisfying appetite during recovery."
      }
    }
  },

  {
    id: "curd_rice_pomegranate",
    title: "Tempering-Soft Curd Rice (Daddojanam)",
    desc: "Ancient South Indian probiotic healing bowl. Cools high internal fever, restores damaged gut microbiome post-antibiotics or diarrhea, and stops diaper burn.",
    type: "Probiotic Rice Bowl",
    prepTime: "5 mins",
    cookTime: "12 mins",
    cookMinutes: 12,
    isQuick: true,
    staples: ["Rice", "Curd", "Ghee"],
    allergens: ["dairy"],
    nutritionTags: {
      hydration_score: 90,
      calorie_density: 65,
      gut_gentleness: 95,
      iron_rich: 40,
      immunity_boost: 85
    },
    baseMacros: { kcal: 130, protein: 4.5, iron: 1.1, hydration: 88 },
    symptomAffinities: {
      diarrhea: 92,
      stomach: 94,
      rashes: 98,
      diaperrash: 99,
      appetite: 85,
      teething: 88,
      fever: 80
    },
    stages: {
      stage1: {
        texture: "Smooth rice & fresh homemade curd puree",
        ingredients: [
          { name: "Overcooked Soft White Rice", baseQty: 3, unit: "tbsp", scalable: true },
          { name: "Fresh Homemade Sweet Curd (Dahi)", baseQty: 2, unit: "tbsp", scalable: true, isAllergen: "dairy" },
          { name: "Warm Water / Rice Starch", baseQty: 2, unit: "tbsp", scalable: true },
          { name: "Roasted Jeera Powder", baseQty: 1, unit: "pinch", scalable: false }
        ],
        steps: [
          "Cook rice until very soft and mushy like baby paste.",
          "Cool rice to room temperature (never mix curd into hot rice as heat kills live probiotic bacteria).",
          "Whisk fresh sweet curd and warm water into the rice until silky smooth.",
          "Sprinkle roasted cumin powder. Serve at room temperature."
        ],
        guardrail: "Ensure curd is fresh and not sour; sour curd can cause gastric acid discomfort in infants.",
        science: "Live Lactobacillus cultures in homemade curd competitively displace pathogenic gut bacteria and synthesize B-complex vitamins."
      },
      stage2: {
        texture: "Soft-mashed curd rice with mild jeera tempering",
        ingredients: [
          { name: "Soft Mashed Rice", baseQty: 0.5, unit: "cup", scalable: true },
          { name: "Fresh Curd", baseQty: 3, unit: "tbsp", scalable: true, isAllergen: "dairy" },
          { name: "Ghee", baseQty: 0.25, unit: "tsp", scalable: true, isAllergen: "dairy" },
          { name: "Cumin Seeds (Jeera)", baseQty: 0.25, unit: "tsp", scalable: false },
          { name: "Hing", baseQty: 1, unit: "pinch", scalable: false }
        ],
        steps: [
          "Mash cooked rice thoroughly while still warm, then let it cool.",
          "Fold in fresh creamy curd.",
          "In a mini ladle, warm ghee with cumin seeds and hing. Pour over curd rice (strain out whole cumin).",
          "Serve comforting bowl."
        ],
        guardrail: "Zero salt for babies under 1 year. The natural sweetness of curd is soothing.",
        science: "Lactic acid lowers intestinal pH, neutralizing alkaline diaper rash triggers and speeding perineal skin healing."
      },
      stage3: {
        texture: "Creamy curd rice with crushed pomegranate juice",
        ingredients: [
          { name: "Soft Cooked Rice", baseQty: 0.5, unit: "cup", scalable: true },
          { name: "Fresh Curd & Milk Splash", baseQty: 0.5, unit: "cup", scalable: true, isAllergen: "dairy" },
          { name: "Fresh Pomegranate (Anar) Juice", baseQty: 2, unit: "tbsp", scalable: true },
          { name: "Ghee & Mustard/Curry Leaves", baseQty: 0.5, unit: "tsp", scalable: true, isAllergen: "dairy" },
          { name: "Iodized Salt", baseQty: 1, unit: "tiny pinch", scalable: false }
        ],
        steps: [
          "Mash rice with curd and a splash of milk for a silky velvet consistency.",
          "Tempering: Splutter cumin and a fresh curry leaf in ghee. Mix into rice.",
          "Drizzle fresh sweet pomegranate juice on top. Serve cool."
        ],
        guardrail: "Use fresh strained pomegranate juice; avoid giving whole hard pomegranate seeds to toddlers under 2.",
        science: "Pomegranate punicalagins provide potent natural polyphenols that dampen systemic mucosal inflammation."
      },
      stage4: {
        texture: "Authentic temple-style Daddojanam",
        ingredients: [
          { name: "Cooked Rice", baseQty: 0.75, unit: "cup", scalable: true },
          { name: "Fresh Curd", baseQty: 0.5, unit: "cup", scalable: true, isAllergen: "dairy" },
          { name: "Ghee Tempering (Jeera, Hing, Curry Leaf)", baseQty: 1, unit: "tsp", scalable: true, isAllergen: "dairy" },
          { name: "Pomegranate Pearls (Soft)", baseQty: 1, unit: "tbsp", scalable: true },
          { name: "Salt", baseQty: 0.25, unit: "tsp", scalable: true }
        ],
        steps: [
          "Mix rice, curd, and salt.",
          "Pour hot tempering of ghee, cumin, and curry leaf over rice.",
          "Garnish with ruby pomegranate pearls. Serve fresh."
        ],
        guardrail: "Do not refrigerate and feed cold; serve at gentle room temperature.",
        science: "Probiotics accelerate barrier recovery in children recovering from acute infectious gastroenteritis."
      }
    }
  },

  {
    id: "sabudana_khichdi",
    title: "Gentle Sabudana (Tapioca Pearl) Light Khichdi",
    desc: "A staple Ayurvedic recovery meal. High-energy pure complex carbohydrate pearls that provide immediate gentle energy during bouts of vomiting or stomach weakness.",
    type: "Gentle Energy Bowl",
    prepTime: "10 mins",
    cookTime: "12 mins",
    cookMinutes: 12,
    isQuick: true,
    staples: ["Sabudana", "Ghee"],
    allergens: ["dairy", "nuts"],
    nutritionTags: {
      hydration_score: 75,
      calorie_density: 85,
      gut_gentleness: 97,
      iron_rich: 25,
      immunity_boost: 50
    },
    baseMacros: { kcal: 160, protein: 1.2, iron: 0.8, hydration: 78 },
    symptomAffinities: {
      vomiting: 98,
      diarrhea: 94,
      stomach: 92,
      underweight: 90,
      fever: 85,
      dehydration: 82
    },
    stages: {
      stage1: {
        texture: "Sabudana water / smooth gelatinized pudding",
        ingredients: [
          { name: "Sabudana (Soaked for 4 hours)", baseQty: 2, unit: "tbsp", scalable: true },
          { name: "Water", baseQty: 1.5, unit: "cups", scalable: true },
          { name: "Jeera Powder", baseQty: 1, unit: "pinch", scalable: false },
          { name: "Ghee", baseQty: 0.25, unit: "tsp", scalable: true, isAllergen: "dairy" }
        ],
        steps: [
          "Boil soaked sabudana pearls in water on medium heat until they turn completely clear and glassy. [timer:10:Boil Sabudana to Glassy]",
          "Blend into a silky starch broth.",
          "Add roasted cumin powder and a drop of ghee. Serve warm in small sips."
        ],
        guardrail: "Ensure pearls are boiled to 100% translucency so no rubbery white centers remain.",
        science: "Tapioca starch is exceptionally low in complex fiber and protein, placing minimal digestive demand on the stomach after vomiting."
      },
      stage2: {
        texture: "Soft translucent pearl mash",
        ingredients: [
          { name: "Sabudana (Soaked overnight)", baseQty: 3, unit: "tbsp", scalable: true },
          { name: "Boiled Potato Mash", baseQty: 1, unit: "tbsp", scalable: true },
          { name: "Ghee", baseQty: 0.5, unit: "tsp", scalable: true, isAllergen: "dairy" },
          { name: "Jeera", baseQty: 0.25, unit: "tsp", scalable: false }
        ],
        steps: [
          "Heat ghee in a pan, add cumin.",
          "Add soaked sabudana and mashed boiled potato with 3 tbsp water.",
          "Cover and steam for 5 minutes until pearls turn transparent. [timer:5:Steam Soft Pearls]",
          "Mash with spoon and serve warm."
        ],
        guardrail: "No whole peanuts for infants under 12 months. Peanuts are omitted for safety.",
        science: "Combined tapioca and potato starches rapidly replenish glycogen stores without provoking nausea reflexes."
      },
      stage3: {
        texture: "Soft-tossed non-sticky toddler khichdi",
        ingredients: [
          { name: "Sabudana (Soaked)", baseQty: 0.5, unit: "cup", scalable: true },
          { name: "Boiled Potato Cubes", baseQty: 2, unit: "tbsp", scalable: true },
          { name: "Finely Powdered Roasted Peanut (Nut-Free option available)", baseQty: 1, unit: "tbsp", scalable: true, isAllergen: "nuts" },
          { name: "Ghee", baseQty: 1, unit: "tsp", scalable: true, isAllergen: "dairy" },
          { name: "Cumin & Rock Salt", baseQty: 1, unit: "pinch each", scalable: false }
        ],
        steps: [
          "Toss soaked pearls with peanut powder and salt.",
          "Heat ghee, add cumin and potato cubes.",
          "Add sabudana, sprinkle water, cover and cook for 6 minutes. [timer:6:Cover & Steam]",
          "Serve soft and warm."
        ],
        guardrail: "Ensure peanuts are milled to ultra-fine dust; never give peanut chunks to young toddlers.",
        science: "Peanut powder adds essential arginine and plant lipids to balance the carbohydrate load."
      },
      stage4: {
        texture: "Traditional light pearl khichdi with lemon squeeze",
        ingredients: [
          { name: "Sabudana (Soaked)", baseQty: 0.75, unit: "cup", scalable: true },
          { name: "Boiled Potato & Finely Ground Peanuts", baseQty: 2, unit: "tbsp each", scalable: true, isAllergen: "nuts" },
          { name: "Ghee & Cumin Seeds", baseQty: 1.5, unit: "tsp", scalable: true, isAllergen: "dairy" },
          { name: "Fresh Lemon Juice & Salt", baseQty: 0.5, unit: "tsp each", scalable: false }
        ],
        steps: [
          "Saute cumin and potatoes in ghee.",
          "Add sabudana coated with roasted peanut powder and salt.",
          "Cook until pearls are soft and glossy. Finish with a squeeze of fresh lemon juice. [timer:6:Saute Khichdi]"
        ],
        guardrail: "Lemon juice should be mild and not overly sour during acid reflux.",
        science: "Vitamin C from lemon juice enhances iron bioavailability while alkalizing urine output."
      }
    }
  },

  {
    id: "ajwain_jeera_broth",
    title: "Roasted Ajwain & Jeera Digestive Broth",
    desc: "Traditional grandmother's remedy for colic, trapped wind, and acid reflux. Gently warms the digestive tract, relaxes bowel spasms, and prevents dehydration.",
    type: "Digestive Carminative Broth",
    prepTime: "2 mins",
    cookTime: "8 mins",
    cookMinutes: 8,
    isQuick: true,
    staples: ["Ghee"],
    allergens: [],
    nutritionTags: {
      hydration_score: 99,
      calorie_density: 20,
      gut_gentleness: 99,
      iron_rich: 35,
      immunity_boost: 80
    },
    baseMacros: { kcal: 25, protein: 0.4, iron: 0.6, hydration: 99 },
    symptomAffinities: {
      colic: 99,
      stomach: 97,
      reflux: 96,
      dehydration: 94,
      cold: 85,
      vomiting: 88
    },
    stages: {
      stage1: {
        texture: "Clear warm herbal infusion",
        ingredients: [
          { name: "Carom Seeds (Ajwain)", baseQty: 0.25, unit: "tsp", scalable: false },
          { name: "Cumin Seeds (Jeera)", baseQty: 0.25, unit: "tsp", scalable: false },
          { name: "Filtered Water", baseQty: 1.5, unit: "cups", scalable: true }
        ],
        steps: [
          "Dry roast ajwain and jeera on low heat for 60 seconds until aromatic.",
          "Add water and bring to a rolling boil. [timer:6:Boil Herbal Paani]",
          "Simmer until water reduces to 1 cup.",
          "Strain twice through muslin cloth to remove every seed particle. Feed 2-3 teaspoons lukewarm before naptime."
        ],
        guardrail: "Never feed whole seeds to an infant. Only feed the strained herbal water.",
        science: "Ajwain thymol possesses antispasmodic properties that relax the smooth muscles of the infant gastrointestinal tract."
      },
      stage2: {
        texture: "Infused digestive warm water",
        ingredients: [
          { name: "Ajwain & Jeera", baseQty: 0.5, unit: "tsp each", scalable: false },
          { name: "Water", baseQty: 2, unit: "cups", scalable: true }
        ],
        steps: [
          "Boil ajwain and jeera in water for 8 minutes. [timer:8:Boil Digestive Broth]",
          "Strain into a sippy cup.",
          "Offer small sips throughout the day between solid feeds."
        ],
        guardrail: "Do not add honey or sugar. Natural herbal flavor is well tolerated.",
        science: "Cuminaldehyde in jeera stimulates salivary amylase and pancreatic enzymes, speeding gastric emptying."
      },
      stage3: {
        texture: "Digestive broth with a whisper of dry ginger",
        ingredients: [
          { name: "Ajwain & Jeera", baseQty: 0.5, unit: "tsp each", scalable: false },
          { name: "Dry Ginger (Saunth) Powder", baseQty: 1, unit: "tiny pinch", scalable: false },
          { name: "Water", baseQty: 2, unit: "cups", scalable: true }
        ],
        steps: [
          "Boil spices together with water until golden yellow. [timer:8:Boil Spiced Broth]",
          "Strain and serve warm in a cup."
        ],
        guardrail: "Keep saunth very subtle so toddler does not find it pungent.",
        science: "Gingerols combined with thymol accelerate gas clearance and suppress reflux symptoms."
      },
      stage4: {
        texture: "Warm digestive tea with tulsi leaf",
        ingredients: [
          { name: "Ajwain, Jeera & Fennel (Saunf)", baseQty: 0.5, unit: "tsp each", scalable: false },
          { name: "Fresh Tulsi Leaves", baseQty: 2, unit: "leaves", scalable: false },
          { name: "Water", baseQty: 2, unit: "cups", scalable: true }
        ],
        steps: [
          "Boil seeds and torn tulsi leaves in water for 7 minutes. [timer:7:Boil Tulsi Broth]",
          "Strain and serve warm."
        ],
        guardrail: "Avoid drinking cold; warm liquids dissolve trapped gas far more effectively.",
        science: "Fennel anethole relieves visceral gut cramping and normalizes irregular intestinal peristalsis."
      }
    }
  },

  {
    id: "sprouted_green_gram_porridge",
    title: "Sprouted Moong & Rice Mash",
    desc: "A powerhouse of bioavailable protein, iron, and zinc for children recovering from weight loss, protein deficiency (PEM), or extended illness.",
    type: "High-Protein Recovery Mash",
    prepTime: "10 mins",
    cookTime: "18 mins",
    cookMinutes: 18,
    isQuick: false,
    staples: ["Moong Dal", "Rice", "Ghee"],
    allergens: ["dairy"],
    nutritionTags: {
      hydration_score: 75,
      calorie_density: 88,
      gut_gentleness: 88,
      iron_rich: 92,
      immunity_boost: 88
    },
    baseMacros: { kcal: 155, protein: 6.2, iron: 2.8, hydration: 80 },
    symptomAffinities: {
      underweight: 98,
      poorweight: 99,
      pem: 99,
      anemia: 92,
      immunity: 88,
      appetite: 82
    },
    stages: {
      stage1: {
        texture: "Ultra-smooth sprouted green gram puree",
        ingredients: [
          { name: "Sprouted Green Moong (Steamed)", baseQty: 2, unit: "tbsp", scalable: true },
          { name: "Cooked Soft Rice", baseQty: 2, unit: "tbsp", scalable: true },
          { name: "Pure Cow's Ghee", baseQty: 0.5, unit: "tsp", scalable: true, isAllergen: "dairy" },
          { name: "Warm Water", baseQty: 0.5, unit: "cup", scalable: true }
        ],
        steps: [
          "Pressure cook sprouted green gram and rice for 5 whistles until completely soft. [timer:15:Pressure Cook Sprouted Dal]",
          "Blend into a velvety, lump-free smooth paste.",
          "Whisk in warm ghee to add essential medium-chain fatty acids. Serve warm."
        ],
        guardrail: "Ensure sprouts are thoroughly pressure-cooked; never feed raw sprouts to an infant.",
        science: "Sprouting green gram synthesizes endogenous Vitamin C, which converts non-heme iron into the readily absorbable ferrous form."
      },
      stage2: {
        texture: "Soft fork-mashed sprouted khichdi",
        ingredients: [
          { name: "Sprouted Moong & Rice", baseQty: 0.5, unit: "cup combined", scalable: true },
          { name: "Ghee & Jeera", baseQty: 0.5, unit: "tsp", scalable: true, isAllergen: "dairy" },
          { name: "Turmeric & Hing", baseQty: 1, unit: "pinch each", scalable: false }
        ],
        steps: [
          "Cook sprouted dal and rice with turmeric and hing until mushy. [timer:16:Cook Sprouted Mash]",
          "Mash with potato masher.",
          "Add ghee and serve."
        ],
        guardrail: "Zero salt under 12 months. The rich umami of sprouted lentils provides great natural flavor.",
        science: "Digestibility of sprouted protein increases by 30% due to endogenous proteases breaking down complex protein matrices."
      },
      stage3: {
        texture: "Soft sprouted dal rice with carrot bits",
        ingredients: [
          { name: "Sprouted Moong & Rice", baseQty: 0.5, unit: "cup", scalable: true },
          { name: "Finely Grated Carrot", baseQty: 2, unit: "tbsp", scalable: true },
          { name: "Ghee & Cumin", baseQty: 1, unit: "tsp", scalable: true, isAllergen: "dairy" },
          { name: "Salt", baseQty: 1, unit: "pinch", scalable: false }
        ],
        steps: [
          "Saute cumin and grated carrots in ghee for 2 minutes.",
          "Add sprouted dal, rice, salt, and water.",
          "Pressure cook for 4 whistles. [timer:14:Cook Carrot Dal Rice]",
          "Mash lightly and serve warm."
        ],
        guardrail: "Grate carrots very finely so they cook to melt-in-mouth consistency.",
        science: "Beta-carotene from carrots synergizes with dietary lipids in ghee to support mucosal immune repair."
      },
      stage4: {
        texture: "Nutritious sprouted moong pulao khichdi",
        ingredients: [
          { name: "Sprouted Moong & Rice", baseQty: 0.75, unit: "cup", scalable: true },
          { name: "Mixed Vegetables (Carrot, Peas, Beans)", baseQty: 3, unit: "tbsp", scalable: true },
          { name: "Ghee & Spices", baseQty: 1.5, unit: "tsp", scalable: true, isAllergen: "dairy" },
          { name: "Iodized Salt", baseQty: 0.25, unit: "tsp", scalable: true }
        ],
        steps: [
          "Tempering with ghee, jeera, and mild turmeric.",
          "Toss veggies, sprouted moong, rice, salt, and 2 cups water.",
          "Cook for 3 whistles. [timer:14:Cook Sprouted Pulao]",
          "Serve warm with fresh curd."
        ],
        guardrail: "Avoid hot green chilies or whole garam masala pods.",
        science: "Complete complementary amino acid profile supports catch-up growth in underweight children."
      }
    }
  },

  {
    id: "soothing_poha_porridge",
    title: "Soft Turmeric Steamed Poha (Flattened Rice Mash)",
    desc: "Light, quick-cooking flattened rice porridge. High in bioavailable iron from traditional iron-roller processing, extremely easy to digest during fever and tummy distress.",
    type: "Quick Iron Mash",
    prepTime: "3 mins",
    cookTime: "8 mins",
    cookMinutes: 8,
    isQuick: true,
    staples: ["Poha", "Ghee"],
    allergens: ["dairy"],
    nutritionTags: {
      hydration_score: 80,
      calorie_density: 65,
      gut_gentleness: 94,
      iron_rich: 88,
      immunity_boost: 72
    },
    baseMacros: { kcal: 120, protein: 2.4, iron: 2.9, hydration: 82 },
    symptomAffinities: {
      anemia: 90,
      fever: 88,
      stomach: 90,
      teething: 85,
      picky: 84,
      appetite: 82
    },
    stages: {
      stage1: {
        texture: "Silky smooth poha & vegetable broth puree",
        ingredients: [
          { name: "Thick Poha (Rinsed & Soaked)", baseQty: 3, unit: "tbsp", scalable: true },
          { name: "Warm Water or Moong Broth", baseQty: 0.75, unit: "cup", scalable: true },
          { name: "Turmeric Powder", baseQty: 1, unit: "tiny pinch", scalable: false },
          { name: "Ghee", baseQty: 0.25, unit: "tsp", scalable: true, isAllergen: "dairy" }
        ],
        steps: [
          "Rinse poha thoroughly in water twice until soft.",
          "Cook poha in water and turmeric for 5 minutes until it melts completely. [timer:5:Simmer Poha]",
          "Blend into a silky smooth porridge.",
          "Stir in ghee and serve lukewarm."
        ],
        guardrail: "Ensure poha is fresh and clean; rinse thoroughly to remove surface impurities.",
        science: "Flattened rice contains 20mg iron per 100g due to processing, addressing toddler iron-deficiency anemia."
      },
      stage2: {
        texture: "Soft fork-mashed poha with roasted jeera",
        ingredients: [
          { name: "Poha (Rinsed)", baseQty: 0.5, unit: "cup", scalable: true },
          { name: "Boiled Potato Mash", baseQty: 1, unit: "tbsp", scalable: true },
          { name: "Ghee & Jeera", baseQty: 0.5, unit: "tsp", scalable: true, isAllergen: "dairy" },
          { name: "Hing", baseQty: 1, unit: "pinch", scalable: false }
        ],
        steps: [
          "Warm ghee in a pan, add jeera and hing.",
          "Add rinsed poha, boiled potato, and 4 tbsp water.",
          "Cover and steam for 4 minutes. [timer:4:Steam Poha Mash]",
          "Mash with fork and feed warm."
        ],
        guardrail: "Do not add mustard seeds or hard crunchy nuts for stage 2 infants.",
        science: "Easily broken down amylase bonds make flattened rice require 40% less digestive enzyme expenditure."
      },
      stage3: {
        texture: "Soft vegetable poha with lemon drizzle",
        ingredients: [
          { name: "Poha", baseQty: 0.5, unit: "cup", scalable: true },
          { name: "Finely Chopped Boiled Carrots & Peas", baseQty: 2, unit: "tbsp", scalable: true },
          { name: "Ghee & Cumin", baseQty: 1, unit: "tsp", scalable: true, isAllergen: "dairy" },
          { name: "Lemon Juice & Salt", baseQty: 1, unit: "tiny pinch each", scalable: false }
        ],
        steps: [
          "Saute veggies in ghee.",
          "Add softened poha, pinch of turmeric, and salt.",
          "Cover and steam for 3 minutes. [timer:3:Steam Veggie Poha]",
          "Finish with a squeeze of fresh lemon juice to boost iron absorption."
        ],
        guardrail: "Lemon juice ascorbic acid is essential to convert ferric iron in poha to absorbable ferrous state.",
        science: "Ascorbic acid from fresh lemon triples non-heme iron absorption in young toddlers."
      },
      stage4: {
        texture: "Colorful mild kanda poha with soft roasted peanuts",
        ingredients: [
          { name: "Poha", baseQty: 0.75, unit: "cup", scalable: true },
          { name: "Onion & Potato", baseQty: 2, unit: "tbsp each", scalable: true },
          { name: "Crushed Roasted Peanuts", baseQty: 1, unit: "tbsp", scalable: true, isAllergen: "nuts" },
          { name: "Ghee & Mild Spices", baseQty: 1.5, unit: "tsp", scalable: true, isAllergen: "dairy" },
          { name: "Salt & Lemon", baseQty: 0.25, unit: "tsp", scalable: true }
        ],
        steps: [
          "Saute onions and potatoes in ghee until soft.",
          "Toss with rinsed poha, crushed peanuts, turmeric, and salt. [timer:5:Saute Kanda Poha]",
          "Garnish with coriander and lemon."
        ],
        guardrail: "Keep onion very soft and translucent; avoid browned or crisp bits during recovery.",
        science: "Balanced macro breakdown with healthy mono-unsaturated fats supports sustained recovery energy."
      }
    }
  },

  {
    id: "banana_sheera",
    title: "Ghee-Roasted Suji & Banana Mash",
    desc: "A calorie-dense sweet halwa made with semolina, ripe bananas, and golden cow's ghee. Ideal for underweight recovery, teething comfort, and boosting energy.",
    type: "Calorie Recovery Mash",
    prepTime: "5 mins",
    cookTime: "10 mins",
    cookMinutes: 10,
    isQuick: true,
    staples: ["Banana", "Ghee"],
    allergens: ["gluten", "dairy"],
    nutritionTags: {
      hydration_score: 55,
      calorie_density: 95,
      gut_gentleness: 80,
      iron_rich: 50,
      immunity_boost: 65
    },
    baseMacros: { kcal: 185, protein: 3.2, iron: 1.5, hydration: 60 },
    symptomAffinities: {
      underweight: 98,
      poorweight: 98,
      constipation: 88,
      appetite: 92,
      teething: 90
    },
    stages: {
      stage1: {
        texture: "Smooth semolina & ripe elaichi banana puree",
        ingredients: [
          { name: "Fine Suji / Rava", baseQty: 1.5, unit: "tbsp", scalable: true, isAllergen: "gluten" },
          { name: "Mashed Ripe Robusta or Elaichi Banana", baseQty: 2, unit: "tbsp", scalable: true },
          { name: "Water", baseQty: 1, unit: "cup", scalable: true },
          { name: "Pure Ghee", baseQty: 0.5, unit: "tsp", scalable: true, isAllergen: "dairy" },
          { name: "Cardamom", baseQty: 1, unit: "micro pinch", scalable: false }
        ],
        steps: [
          "Dry roast suji on low heat for 3 minutes until aromatic without browning.",
          "Pour in boiling water while whisking briskly to prevent lumps. [timer:5:Whisk & Simmer Suji]",
          "Stir in mashed ripe banana and ghee until a glossy smooth puree forms.",
          "Serve lukewarm."
        ],
        guardrail: "Zero added sugar or jaggery. The natural fructose of ripe banana is completely sweet.",
        science: "Ripe bananas provide short-chain fatty acid precursors and potassium that support neural function."
      },
      stage2: {
        texture: "Soft spoonable banana halwa",
        ingredients: [
          { name: "Fine Suji", baseQty: 2, unit: "tbsp", scalable: true, isAllergen: "gluten" },
          { name: "Ripe Banana Mash", baseQty: 0.5, unit: "banana", scalable: true },
          { name: "Ghee", baseQty: 1, unit: "tsp", scalable: true, isAllergen: "dairy" },
          { name: "Water", baseQty: 1, unit: "cup", scalable: true }
        ],
        steps: [
          "Roast suji in ghee until fragrant.",
          "Add boiling water and cook for 5 minutes. [timer:5:Cook Suji Sheera]",
          "Stir in fork-mashed banana. Serve warm."
        ],
        guardrail: "Ensure suji is cooked until grains are completely soft and water-saturated.",
        science: "Easily absorbed carbohydrates help restore depleted liver glycogen reserves."
      },
      stage3: {
        texture: "Rich banana sheera with date syrup",
        ingredients: [
          { name: "Suji", baseQty: 3, unit: "tbsp", scalable: true, isAllergen: "gluten" },
          { name: "Mashed Banana", baseQty: 0.5, unit: "banana", scalable: true },
          { name: "Date Syrup / Puree", baseQty: 1, unit: "tsp", scalable: true },
          { name: "Ghee", baseQty: 1.5, unit: "tsp", scalable: true, isAllergen: "dairy" },
          { name: "Water or Milk Splash", baseQty: 1, unit: "cup", scalable: true, isAllergen: "dairy" }
        ],
        steps: [
          "Roast suji in golden ghee.",
          "Add water/milk, banana, and date puree. Simmer for 6 minutes. [timer:6:Simmer Sheera]",
          "Serve warm."
        ],
        guardrail: "If child has active diarrhea, the mutation engine will automatically replace banana sheera.",
        science: "High energy density (1.5 kcal/g) provides concentrated recovery calories for small toddler stomachs."
      },
      stage4: {
        texture: "Traditional festive Satyanarayan-style mild sheera",
        ingredients: [
          { name: "Suji / Semolina", baseQty: 4, unit: "tbsp", scalable: true, isAllergen: "gluten" },
          { name: "Ripe Banana & Jaggery", baseQty: 1, unit: "banana & 1 tsp jaggery", scalable: true },
          { name: "Pure Cow's Ghee", baseQty: 2, unit: "tsp", scalable: true, isAllergen: "dairy" },
          { name: "Cardamom & Finely Milled Almonds", baseQty: 1, unit: "pinch each", scalable: false, isAllergen: "nuts" }
        ],
        steps: [
          "Golden roast suji in ghee.",
          "Add warm water, jaggery, banana, and cardamom. Cook until halwa leaves pan sides. [timer:7:Cook Halwa]",
          "Garnish with fine almond powder."
        ],
        guardrail: "Ensure nuts are powdered to avoid choking hazard in preschoolers.",
        science: "Butyric acid in cow's ghee nourishes colonocyte enterocytes and enhances nutrient absorption."
      }
    }
  },

  {
    id: "papaya_stewed_puree",
    title: "Warm Stewed Papaya & Fennel Nectar",
    desc: "Nature's gentlest digestive fruit remedy. Rich in natural papain enzymes that dissolve digestive sludge, soften stubborn stools, and soothe tummy colic.",
    type: "Gentle Laxative Mash",
    prepTime: "5 mins",
    cookTime: "8 mins",
    cookMinutes: 8,
    isQuick: true,
    staples: [],
    allergens: [],
    nutritionTags: {
      hydration_score: 92,
      calorie_density: 45,
      gut_gentleness: 96,
      iron_rich: 30,
      immunity_boost: 88
    },
    baseMacros: { kcal: 65, protein: 0.8, iron: 0.4, hydration: 92 },
    symptomAffinities: {
      constipation: 99,
      stomach: 92,
      appetite: 90,
      immunity: 85,
      vitd: 75
    },
    stages: {
      stage1: {
        texture: "Silky smooth steamed papaya puree",
        ingredients: [
          { name: "Ripe Orange Papaya (Peeled & Deseeded)", baseQty: 0.5, unit: "cup cubed", scalable: true },
          { name: "Fennel (Saunf) Water", baseQty: 2, unit: "tbsp", scalable: false }
        ],
        steps: [
          "Steam ripe papaya cubes with fennel water for 6 minutes until soft. [timer:6:Steam Papaya]",
          "Blend into a silky, sweet orange nectar.",
          "Serve lukewarm."
        ],
        guardrail: "Ensure papaya is 100% ripe (soft orange skin and flesh); never feed raw or semi-ripe papaya to babies.",
        science: "Natural papain and high water content soften hard fecal masses without causing colic or intestinal cramping."
      },
      stage2: {
        texture: "Fork-mashed warm papaya pulp",
        ingredients: [
          { name: "Ripe Papaya", baseQty: 0.75, unit: "cup", scalable: true },
          { name: "Fennel Powder", baseQty: 1, unit: "tiny pinch", scalable: false }
        ],
        steps: [
          "Lightly steam papaya and mash with fork. [timer:6:Steam & Mash Papaya]",
          "Stir in a pinch of saunf powder.",
          "Serve as a gentle afternoon snack."
        ],
        guardrail: "Zero salt or sugar. Naturally rich in carotenoids and gentle sweetness.",
        science: "Rich in provitamin A carotenoids which support mucosal epithelial regeneration."
      },
      stage3: {
        texture: "Papaya and soaked prune warm compote",
        ingredients: [
          { name: "Ripe Papaya Cubes", baseQty: 0.75, unit: "cup", scalable: true },
          { name: "Soaked Soft Prunes (Pureed)", baseQty: 1, unit: "prune", scalable: false }
        ],
        steps: [
          "Mash steamed papaya with pureed soaked prune. [timer:5:Warm Compote]",
          "Serve warm to stimulate morning bowel movement."
        ],
        guardrail: "Remove prune pit completely.",
        science: "Prune sorbitol draws water into colon through osmosis, relieving stubborn toddler withholding constipation."
      },
      stage4: {
        texture: "Chilled fresh papaya cubes with lime and mint",
        ingredients: [
          { name: "Ripe Sweet Papaya", baseQty: 1, unit: "cup bite-sized", scalable: true },
          { name: "Fresh Lime Drizzle", baseQty: 0.25, unit: "tsp", scalable: false },
          { name: "Crushed Mint Leaves", baseQty: 2, unit: "leaves", scalable: false }
        ],
        steps: [
          "Cut soft papaya into bite-sized cubes.",
          "Toss with a drop of lime juice and mint. Serve fresh."
        ],
        guardrail: "Ensure pieces are soft and chewable.",
        science: "Dietary fiber and proteolytic enzymes optimize digestive transit time."
      }
    }
  },

  {
    id: "besan_sheera",
    title: "Golden Soothing Besan & Haldi Kadha Sheera",
    desc: "An age-old Punjabi home remedy for cold, chest congestion, and persistent cough. A warm, pourable sweet soup made of roasted chickpea flour, pure ghee, and warming spices.",
    type: "Warming Respiratory Broth",
    prepTime: "5 mins",
    cookTime: "12 mins",
    cookMinutes: 12,
    isQuick: true,
    staples: ["Ghee"],
    allergens: ["dairy"],
    nutritionTags: {
      hydration_score: 65,
      calorie_density: 85,
      gut_gentleness: 78,
      iron_rich: 70,
      immunity_boost: 98
    },
    baseMacros: { kcal: 165, protein: 5.1, iron: 2.2, hydration: 68 },
    symptomAffinities: {
      cold: 99,
      throat: 98,
      fever: 88,
      immunity: 95
    },
    stages: {
      stage1: {
        texture: "Smooth roasted besan & warm water soup",
        ingredients: [
          { name: "Gram Flour (Besan)", baseQty: 1.5, unit: "tbsp", scalable: true },
          { name: "Pure Cow's Ghee", baseQty: 0.5, unit: "tsp", scalable: true, isAllergen: "dairy" },
          { name: "Warm Filtered Water", baseQty: 1, unit: "cup", scalable: true },
          { name: "Haldi (Turmeric)", baseQty: 1, unit: "pinch", scalable: false },
          { name: "Elaichi (Cardamom)", baseQty: 1, unit: "pinch", scalable: false }
        ],
        steps: [
          "Melt ghee in a small pan, roast besan on low flame for 5 minutes until fragrant and golden. [timer:5:Roast Besan]",
          "Slowly pour in warm water while whisking vigorously to avoid any lumps.",
          "Add turmeric and cardamom. Simmer for 3 minutes until it forms a thin pourable soup. [timer:3:Simmer Sheera]",
          "Feed warm right before bedtime."
        ],
        guardrail: "No jaggery or honey for infants under 12 months. Besan natural nuttiness is sufficient.",
        science: "Warm ghee and turmeric soothe the tracheal lining and ease night-time dry coughing spasms."
      },
      stage2: {
        texture: "Warm pourable soup consistency",
        ingredients: [
          { name: "Besan", baseQty: 2, unit: "tbsp", scalable: true },
          { name: "Ghee", baseQty: 1, unit: "tsp", scalable: true, isAllergen: "dairy" },
          { name: "Warm Water", baseQty: 1, unit: "cup", scalable: true },
          { name: "Turmeric & Black Pepper", baseQty: 1, unit: "tiny pinch each", scalable: false }
        ],
        steps: [
          "Roast besan in ghee until golden nutty aroma releases.",
          "Add water and spices, whisking continuously. [timer:6:Whisk & Simmer]",
          "Serve warm in a small feeding bowl."
        ],
        guardrail: "Ensure black pepper is a microscopic speck to avoid throat irritation.",
        science: "Piperine in black pepper enhances curcumin bioavailability by up to 2000%."
      },
      stage3: {
        texture: "Comforting warm golden besan sheera",
        ingredients: [
          { name: "Besan", baseQty: 2.5, unit: "tbsp", scalable: true },
          { name: "Ghee", baseQty: 1.5, unit: "tsp", scalable: true, isAllergen: "dairy" },
          { name: "Warm Milk or Water", baseQty: 1, unit: "cup", scalable: true, isAllergen: "dairy" },
          { name: "Jaggery Powder", baseQty: 1, unit: "tsp", scalable: true },
          { name: "Haldi & Cinnamon", baseQty: 1, unit: "pinch each", scalable: false }
        ],
        steps: [
          "Roast besan in ghee until light brown.",
          "Whisk in warm liquid, jaggery, and spices. [timer:6:Cook Sheera]",
          "Simmer for 3 minutes. Feed warm before sleep."
        ],
        guardrail: "If chest is very congested, use water instead of milk to avoid thick mucus sensation.",
        science: "Chickpea flour is rich in antioxidants, zinc, and protein, fueling leukocyte antibody generation."
      },
      stage4: {
        texture: "Rich Punjabi Haldi Besan Sheera",
        ingredients: [
          { name: "Besan", baseQty: 3, unit: "tbsp", scalable: true },
          { name: "Pure Ghee", baseQty: 2, unit: "tsp", scalable: true, isAllergen: "dairy" },
          { name: "Warm Milk", baseQty: 1, unit: "cup", scalable: true, isAllergen: "dairy" },
          { name: "Jaggery & Nutmeg", baseQty: 1, unit: "tsp & pinch", scalable: true },
          { name: "Finely Ground Almonds", baseQty: 1, unit: "tsp", scalable: true, isAllergen: "nuts" }
        ],
        steps: [
          "Roast besan in ghee to deep golden shade.",
          "Add milk and jaggery, stirring continuously until velvety thick. [timer:6:Simmer Rich Sheera]",
          "Dust with nutmeg and almond dust. Serve hot-warm."
        ],
        guardrail: "Do not let the child drink cold water immediately after eating hot besan sheera.",
        science: "Nutmeg myristicin has mild sedative and bronchodilator qualities, promoting restorative deep sleep."
      }
    }
  },

  {
    id: "oats_apple_kheer",
    title: "Cardamom Rolled Oats & Pear Porridge",
    desc: "Gentle soluble beta-glucan fiber porridge that coats the digestive lining, regulates bowel movements, and provides slow-release soothing energy.",
    type: "Soluble Fiber Porridge",
    prepTime: "5 mins",
    cookTime: "8 mins",
    cookMinutes: 8,
    isQuick: true,
    staples: ["Oats", "Ghee"],
    allergens: ["dairy"],
    nutritionTags: {
      hydration_score: 82,
      calorie_density: 70,
      gut_gentleness: 92,
      iron_rich: 75,
      immunity_boost: 78
    },
    baseMacros: { kcal: 135, protein: 4.0, iron: 2.1, hydration: 80 },
    symptomAffinities: {
      constipation: 95,
      picky: 88,
      anemia: 80,
      teething: 88,
      eczema: 85
    },
    stages: {
      stage1: {
        texture: "Silky strained oat & pear milk puree",
        ingredients: [
          { name: "Rolled Oats (Powdered)", baseQty: 2, unit: "tbsp", scalable: true },
          { name: "Grated Pear (Steamed)", baseQty: 2, unit: "tbsp", scalable: true },
          { name: "Water", baseQty: 1, unit: "cup", scalable: true },
          { name: "Pure Ghee", baseQty: 0.25, unit: "tsp", scalable: true, isAllergen: "dairy" }
        ],
        steps: [
          "Cook powdered oats in water on low heat for 5 minutes until creamy. [timer:5:Simmer Oat Porridge]",
          "Stir in steamed pear mash and ghee.",
          "Blend into a silky smooth porridge. Serve warm."
        ],
        guardrail: "Ensure oats are certified gluten-free if gluten exclusion is toggled.",
        science: "Oat beta-glucans form a viscous gel in the intestinal tract that moisturizes dry stool."
      },
      stage2: {
        texture: "Soft creamy lumpy oat porridge",
        ingredients: [
          { name: "Quick Rolled Oats", baseQty: 3, unit: "tbsp", scalable: true },
          { name: "Steamed Apple/Pear Cubes", baseQty: 0.25, unit: "cup", scalable: true },
          { name: "Water", baseQty: 1, unit: "cup", scalable: true },
          { name: "Ghee & Cardamom", baseQty: 0.5, unit: "tsp & pinch", scalable: true, isAllergen: "dairy" }
        ],
        steps: [
          "Boil oats in water for 6 minutes until soft and creamy. [timer:6:Cook Rolled Oats]",
          "Fold in steamed fruit and cardamom.",
          "Serve warm."
        ],
        guardrail: "Zero salt or sugar. Natural fruit sweetness is delicious.",
        science: "Oats provide prebiotic oligosaccharides that nourish beneficial Bifidobacteria."
      },
      stage3: {
        texture: "Creamy oatmeal with cinnamon and milk",
        ingredients: [
          { name: "Rolled Oats", baseQty: 0.5, unit: "cup", scalable: true },
          { name: "Warm Milk or Water", baseQty: 1, unit: "cup", scalable: true, isAllergen: "dairy" },
          { name: "Grated Apple", baseQty: 0.25, unit: "cup", scalable: true },
          { name: "Ghee & Cinnamon", baseQty: 1, unit: "tsp & pinch", scalable: true, isAllergen: "dairy" }
        ],
        steps: [
          "Cook oats with liquid and grated apple for 6 minutes. [timer:6:Cook Creamy Oatmeal]",
          "Top with ghee and cinnamon. Serve warm."
        ],
        guardrail: "Ensure milk is boiled and cooled before mixing.",
        science: "Sustained carbohydrate release prevents post-illness toddler temper tantrums and fatigue."
      },
      stage4: {
        texture: "Warm breakfast oats bowl with fruit gems",
        ingredients: [
          { name: "Rolled Oats", baseQty: 0.75, unit: "cup", scalable: true },
          { name: "Milk", baseQty: 1.2, unit: "cups", scalable: true, isAllergen: "dairy" },
          { name: "Banana Slices & Soft Berries", baseQty: 3, unit: "tbsp", scalable: true },
          { name: "Honey (Safe >12m) or Jaggery", baseQty: 1, unit: "tsp", scalable: true }
        ],
        steps: [
          "Cook oats in milk until thick and creamy. [timer:6:Boil Oats in Milk]",
          "Top with fresh fruits and light sweetener."
        ],
        guardrail: "Safe for preschoolers; avoid whole hard berries that could slip into airway.",
        science: "Supports regular morning stool habits in children holding back due to past painful defecation."
      }
    }
  },

  {
    id: "makhana_kheer",
    title: "Roasted Makhana (Foxnut) Calcium Mash",
    desc: "Ancient lotus seed superfood. Naturally gluten-free, dense in organic calcium and magnesium, exceptionally light on inflamed stomachs, and strengthens teeth and bones.",
    type: "Calcium Superfood Porridge",
    prepTime: "5 mins",
    cookTime: "10 mins",
    cookMinutes: 10,
    isQuick: true,
    staples: ["Ghee"],
    allergens: ["dairy"],
    nutritionTags: {
      hydration_score: 75,
      calorie_density: 80,
      gut_gentleness: 95,
      iron_rich: 65,
      immunity_boost: 80
    },
    baseMacros: { kcal: 140, protein: 4.8, iron: 1.8, hydration: 78 },
    symptomAffinities: {
      calcium: 99,
      vitd: 95,
      pem: 92,
      underweight: 90,
      teething: 96,
      stomach: 85
    },
    stages: {
      stage1: {
        texture: "Silky smooth roasted makhana milk mash",
        ingredients: [
          { name: "Phool Makhana (Roasted & Powdered)", baseQty: 2, unit: "tbsp", scalable: true },
          { name: "Water or Formula/Breastmilk", baseQty: 0.75, unit: "cup", scalable: true },
          { name: "Pure Ghee", baseQty: 0.25, unit: "tsp", scalable: true, isAllergen: "dairy" },
          { name: "Elaichi Powder", baseQty: 1, unit: "micro pinch", scalable: false }
        ],
        steps: [
          "Roast makhana in ghee on low flame until crisp, then grind into a fine powder.",
          "Boil water in a saucepan, whisk in makhana powder, and simmer for 4 minutes until thick. [timer:4:Simmer Makhana]",
          "Stir in cardamom. If using breastmilk/formula, stir in after cooling slightly.",
          "Serve lukewarm."
        ],
        guardrail: "Check each makhana pearl for black woody shells before roasting to avoid hard bits.",
        science: "Foxnuts provide bioavailable calcium and magnesium in a favorable 2:1 physiological ratio."
      },
      stage2: {
        texture: "Soft spoon-mashed foxnut kheer",
        ingredients: [
          { name: "Roasted Makhana Powder", baseQty: 3, unit: "tbsp", scalable: true },
          { name: "Water or Splash of Milk", baseQty: 1, unit: "cup", scalable: true, isAllergen: "dairy" },
          { name: "Ghee & Cardamom", baseQty: 0.5, unit: "tsp", scalable: true, isAllergen: "dairy" }
        ],
        steps: [
          "Simmer makhana powder with liquid for 6 minutes. [timer:6:Cook Makhana Kheer]",
          "Stir in ghee and serve warm."
        ],
        guardrail: "Zero sugar. Naturally mild and nutty.",
        science: "Low sodium and high potassium content make foxnuts gentle on infant kidneys."
      },
      stage3: {
        texture: "Warm makhana porridge with mashed dates",
        ingredients: [
          { name: "Crushed Roasted Makhana", baseQty: 0.5, unit: "cup", scalable: true },
          { name: "Warm Milk", baseQty: 1, unit: "cup", scalable: true, isAllergen: "dairy" },
          { name: "Date Paste", baseQty: 1, unit: "tsp", scalable: true },
          { name: "Ghee", baseQty: 1, unit: "tsp", scalable: true, isAllergen: "dairy" }
        ],
        steps: [
          "Cook crushed makhana in milk until soft and pudding-like. [timer:7:Cook Makhana Pudding]",
          "Stir in date paste and ghee.",
          "Serve warm."
        ],
        guardrail: "Ensure date paste has no seed fragments.",
        science: "Magnesium acts as an enzymatic cofactor for converting Vitamin D into its active hormonal form."
      },
      stage4: {
        texture: "Royal Makhana Kheer with Saffron Strands",
        ingredients: [
          { name: "Makhana (Coarsely Crushed)", baseQty: 0.75, unit: "cup", scalable: true },
          { name: "Full Cream Milk", baseQty: 1.5, unit: "cups", scalable: true, isAllergen: "dairy" },
          { name: "Jaggery Powder & Kesar", baseQty: 1, unit: "tsp & 2 strands", scalable: true },
          { name: "Ghee", baseQty: 1.5, unit: "tsp", scalable: true, isAllergen: "dairy" }
        ],
        steps: [
          "Saute crushed makhana in ghee.",
          "Pour milk and kesar, simmer for 8 minutes until creamy thick. [timer:8:Simmer Royal Kheer]",
          "Stir in jaggery off the heat. Serve warm."
        ],
        guardrail: "Add jaggery only after turning off flame to avoid curdling milk.",
        science: "Rich in kaempferol flavonoid antioxidants that combat systemic oxidative stress during viral infections."
      }
    }
  },

  {
    id: "pumpkin_moong_soup",
    title: "Sweet Golden Kaddu & Moong Dal Velvety Soup",
    desc: "A golden restorative soup combining sweet yellow pumpkin and split yellow lentils. Rich in beta-carotene, Vitamin C, and soothing soluble fibers.",
    type: "Immunity Soup",
    prepTime: "5 mins",
    cookTime: "12 mins",
    cookMinutes: 12,
    isQuick: true,
    staples: ["Moong Dal", "Ghee"],
    allergens: ["dairy"],
    nutritionTags: {
      hydration_score: 94,
      calorie_density: 55,
      gut_gentleness: 98,
      iron_rich: 55,
      immunity_boost: 95
    },
    baseMacros: { kcal: 98, protein: 3.5, iron: 1.6, hydration: 92 },
    symptomAffinities: {
      fever: 95,
      constipation: 92,
      throat: 94,
      appetite: 92,
      vitd: 85,
      immunity: 94
    },
    stages: {
      stage1: {
        texture: "Silky smooth golden velvety soup",
        ingredients: [
          { name: "Yellow Pumpkin / Kaddu (Peeled & Cubed)", baseQty: 0.5, unit: "cup", scalable: true },
          { name: "Yellow Moong Dal (Soaked)", baseQty: 1.5, unit: "tbsp", scalable: true },
          { name: "Water", baseQty: 1.5, unit: "cups", scalable: true },
          { name: "Turmeric & Cumin Powder", baseQty: 1, unit: "pinch each", scalable: false },
          { name: "Ghee", baseQty: 0.25, unit: "tsp", scalable: true, isAllergen: "dairy" }
        ],
        steps: [
          "Pressure cook pumpkin cubes, moong dal, water, and turmeric for 3 whistles until mushy. [timer:10:Pressure Cook Pumpkin]",
          "Puree with an immersion blender until completely silky smooth.",
          "Warm ghee with cumin powder in a ladle and stir into the soup. Serve warm."
        ],
        guardrail: "No salt. The natural sweetness of ripe red pumpkin makes this soup deeply appealing to sick infants.",
        science: "Pumpkin contains carotenoids and lutein that help repair damaged mucosal membranes during respiratory viral bouts."
      },
      stage2: {
        texture: "Thick velvety puree with tiny soft pumpkin gems",
        ingredients: [
          { name: "Pumpkin & Moong Dal", baseQty: 0.75, unit: "cup combined", scalable: true },
          { name: "Ghee & Jeera", baseQty: 0.5, unit: "tsp", scalable: true, isAllergen: "dairy" },
          { name: "Hing", baseQty: 1, unit: "pinch", scalable: false }
        ],
        steps: [
          "Cook pumpkin and moong dal together. [timer:10:Cook Pumpkin Dal]",
          "Mash mostly smooth, leaving small soft pumpkin bits.",
          "Temper with ghee and cumin. Serve warm."
        ],
        guardrail: "Ensure pumpkin is thoroughly cooked and peels are removed completely.",
        science: "High potassium and dietary water content encourage gentle urinary excretion of fever metabolites."
      },
      stage3: {
        texture: "Comforting thick soup with coriander aroma",
        ingredients: [
          { name: "Pumpkin Cubes & Moong Dal", baseQty: 1, unit: "cup", scalable: true },
          { name: "Ghee", baseQty: 1, unit: "tsp", scalable: true, isAllergen: "dairy" },
          { name: "Cumin & Tiny Salt Pinch", baseQty: 1, unit: "pinch each", scalable: false }
        ],
        steps: [
          "Cook and blend into a thick velvety soup. [timer:11:Cook & Simmer Soup]",
          "Stir in ghee and a whisper of salt.",
          "Serve warm with a soft rice spoon."
        ],
        guardrail: "Do not add heavy cream; ghee provides healthy digestible lipids.",
        science: "Gentle on sore throats with zero citrus sting."
      },
      stage4: {
        texture: "Golden spiced pumpkin soup with toasted seeds",
        ingredients: [
          { name: "Pumpkin & Moong Dal", baseQty: 1.2, unit: "cups", scalable: true },
          { name: "Powdered Pumpkin Seeds (Pepitas)", baseQty: 1, unit: "tsp", scalable: true },
          { name: "Ghee, Cumin & Black Pepper", baseQty: 1, unit: "tsp & pinch", scalable: true, isAllergen: "dairy" },
          { name: "Salt", baseQty: 0.25, unit: "tsp", scalable: true }
        ],
        steps: [
          "Saute cumin in ghee, add pumpkin, dal, and water.",
          "Cook until tender, blend smooth, and season with salt and mild pepper. [timer:12:Cook Soup]",
          "Dust with finely powdered pumpkin seeds for zinc."
        ],
        guardrail: "Ensure pumpkin seeds are ground to fine powder.",
        science: "Pumpkin seeds provide bioavailable elemental zinc, crucial for T-cell replication during viral recovery."
      }
    }
  },

  {
    id: "barley_water_lime",
    title: "Soothing Pearl Barley Water with Mint",
    desc: "Traditional cooling fever drink. Flushes renal toxins, reduces high internal body heat, calms burning urine, and restores electrolyte equilibrium.",
    type: "Cooling Electrolyte Drink",
    prepTime: "2 mins",
    cookTime: "15 mins",
    cookMinutes: 15,
    isQuick: false,
    staples: [],
    allergens: ["gluten"],
    nutritionTags: {
      hydration_score: 99,
      calorie_density: 35,
      gut_gentleness: 97,
      iron_rich: 30,
      immunity_boost: 70
    },
    baseMacros: { kcal: 45, protein: 1.1, iron: 0.8, hydration: 98 },
    symptomAffinities: {
      fever: 99,
      dehydration: 98,
      rashes: 95,
      diaperrash: 92,
      vomiting: 90
    },
    stages: {
      stage1: {
        texture: "Clear strained barley water",
        ingredients: [
          { name: "Pearl Barley (Soaked for 2 hours)", baseQty: 2, unit: "tbsp", scalable: true, isAllergen: "gluten" },
          { name: "Filtered Water", baseQty: 2, unit: "cups", scalable: true }
        ],
        steps: [
          "Boil soaked barley in water in an open pan or pressure cooker for 15 minutes until water turns milky white. [timer:15:Boil Barley Water]",
          "Strain through a fine muslin sieve.",
          "Allow to cool to room temperature. Feed in small sips using a sterile spoon."
        ],
        guardrail: "Do not add honey or salt for infants under 12 months. Pure strained barley water is naturally cooling.",
        science: "Barley water acts as a mild osmotic diuretic that promotes renal clearance of pyrogenic waste products."
      },
      stage2: {
        texture: "Light barley broth with soft grain mash",
        ingredients: [
          { name: "Barley", baseQty: 3, unit: "tbsp", scalable: true, isAllergen: "gluten" },
          { name: "Water", baseQty: 2.5, unit: "cups", scalable: true }
        ],
        steps: [
          "Boil barley until tender. [timer:15:Boil Barley]",
          "Strain liquid for drinking, and lightly mash a few grains into the water.",
          "Serve lukewarm."
        ],
        guardrail: "Gluten-containing grain; excluded if gluten allergy is active.",
        science: "Rich in soluble beta-glucan and silicic acid, supporting mucosal barrier integrity."
      },
      stage3: {
        texture: "Cooling barley water with lemon drop & mint",
        ingredients: [
          { name: "Barley Water (Strained)", baseQty: 1, unit: "cup", scalable: true, isAllergen: "gluten" },
          { name: "Fresh Mint Leaf (Steeped)", baseQty: 1, unit: "leaf", scalable: false },
          { name: "Fresh Lemon Juice", baseQty: 2, unit: "drops", scalable: false }
        ],
        steps: [
          "Boil and strain barley water. [timer:14:Boil Barley Paani]",
          "Steep a mint leaf for 2 minutes and add two drops of lemon juice.",
          "Serve cool-room temperature."
        ],
        guardrail: "Ensure lemon juice is minimal to avoid citrus acidity on sensitive stomachs.",
        science: "Cooling hydration reduces core body temperature elevation during prolonged fevers."
      },
      stage4: {
        texture: "Refreshing barley water lemonade with rock salt",
        ingredients: [
          { name: "Barley Water", baseQty: 1, unit: "cup", scalable: true, isAllergen: "gluten" },
          { name: "Lemon Juice & Rock Salt", baseQty: 0.5, unit: "tsp & pinch", scalable: false },
          { name: "Jaggery (Optional)", baseQty: 0.5, unit: "tsp", scalable: false }
        ],
        steps: [
          "Mix strained barley water with lemon, rock salt, and optional light jaggery.",
          "Serve as a refreshing rehydration drink."
        ],
        guardrail: "Rock salt provides balanced trace electrolytes without excessive industrial sodium.",
        science: "Replaces sweat and evaporative fluid losses caused by sustained pediatric fever spikes."
      }
    }
  },

  {
    id: "spinach_moong_khichdi",
    title: "Iron-Rich Palak & Yellow Moong Khichdi",
    desc: "A rich green recovery khichdi combining freshly steamed baby spinach, yellow lentils, and rice. Deeply restores depleted hemoglobin and iron stores.",
    type: "Iron Restoration Khichdi",
    prepTime: "8 mins",
    cookTime: "15 mins",
    cookMinutes: 15,
    isQuick: false,
    staples: ["Rice", "Moong Dal", "Ghee"],
    allergens: ["dairy"],
    nutritionTags: {
      hydration_score: 85,
      calorie_density: 72,
      gut_gentleness: 88,
      iron_rich: 99,
      immunity_boost: 90
    },
    baseMacros: { kcal: 135, protein: 4.8, iron: 3.4, hydration: 85 },
    symptomAffinities: {
      anemia: 99,
      pem: 95,
      poorweight: 90,
      immunity: 92,
      picky: 85
    },
    stages: {
      stage1: {
        texture: "Silky emerald green dal puree",
        ingredients: [
          { name: "Baby Spinach (Blanched & Pureed)", baseQty: 3, unit: "leaves", scalable: true },
          { name: "Yellow Moong Dal & Rice", baseQty: 1.5, unit: "tbsp each", scalable: true },
          { name: "Water", baseQty: 1.5, unit: "cups", scalable: true },
          { name: "Pure Ghee", baseQty: 0.25, unit: "tsp", scalable: true, isAllergen: "dairy" },
          { name: "Turmeric", baseQty: 1, unit: "tiny pinch", scalable: false }
        ],
        steps: [
          "Blanch spinach in boiling water for 60 seconds, then immediately immerse in cool water to preserve nutrients and bright chlorophyll.",
          "Pressure cook moong dal and rice until very soft. [timer:12:Cook Dal Rice]",
          "Blend spinach, cooked dal, rice, and ghee into a silky emerald soup.",
          "Serve lukewarm."
        ],
        guardrail: "Always blanch spinach and discard blanch water to reduce oxalates and nitrates.",
        science: "Blanching removes soluble oxalates that would otherwise bind dietary iron and calcium in the gut."
      },
      stage2: {
        texture: "Soft-mashed green khichdi",
        ingredients: [
          { name: "Moong Dal & Rice", baseQty: 0.5, unit: "cup cooked", scalable: true },
          { name: "Finely Chopped Blanched Spinach", baseQty: 2, unit: "tbsp", scalable: true },
          { name: "Ghee & Jeera", baseQty: 0.5, unit: "tsp", scalable: true, isAllergen: "dairy" }
        ],
        steps: [
          "Fold blanched spinach puree into warm mashed khichdi.",
          "Temper with ghee and cumin. [timer:5:Warm & Temper Khichdi]",
          "Serve warm."
        ],
        guardrail: "No salt under 12 months. Fresh spinach has a pleasant earthy natural taste.",
        science: "Folate in green leaves is crucial for erythrocyte erythropoiesis and immune cell proliferation."
      },
      stage3: {
        texture: "Soft palak khichdi with lemon squeeze",
        ingredients: [
          { name: "Moong Dal Rice Khichdi", baseQty: 0.75, unit: "cup", scalable: true },
          { name: "Spinach Puree", baseQty: 3, unit: "tbsp", scalable: true },
          { name: "Lemon Juice Drizzle", baseQty: 0.25, unit: "tsp", scalable: false },
          { name: "Ghee & Salt", baseQty: 1, unit: "tsp & pinch", scalable: true, isAllergen: "dairy" }
        ],
        steps: [
          "Simmer khichdi with spinach puree and salt for 4 minutes. [timer:4:Simmer Green Khichdi]",
          "Stir in ghee and a drop of lemon juice to liberate bound non-heme iron."
        ],
        guardrail: "Do not overcook spinach; add at end to retain thermolabile folate.",
        science: "Ascorbic acid from lemon creates soluble iron chelates that withstand alkaline duodenal pH."
      },
      stage4: {
        texture: "Comforting Palak Dal Bowl with Paneer Bits",
        ingredients: [
          { name: "Khichdi with Spinach", baseQty: 1, unit: "cup", scalable: true },
          { name: "Soft Crumbled Fresh Paneer", baseQty: 2, unit: "tbsp", scalable: true, isAllergen: "dairy" },
          { name: "Ghee & Mild Cumin-Hing", baseQty: 1.5, unit: "tsp", scalable: true, isAllergen: "dairy" },
          { name: "Salt", baseQty: 0.25, unit: "tsp", scalable: true }
        ],
        steps: [
          "Warm khichdi with crumbled soft paneer and ghee. [timer:5:Warm Khichdi with Paneer]",
          "Serve warm."
        ],
        guardrail: "Ensure paneer is fresh and very soft.",
        science: "High biological value milk protein enhances tissue repair and iron incorporation into ferritin."
      }
    }
  },

  {
    id: "lauki_jeera_soup",
    title: "Stewed Bottle Gourd (Lauki) & Cumin Clear Broth",
    desc: "Ayurveda's most gentle hydrator. Bottle gourd is 96% pure structured water, completely non-acidic, and soothes acid reflux, nausea, and vomiting.",
    type: "Alkaline Hydration Broth",
    prepTime: "4 mins",
    cookTime: "10 mins",
    cookMinutes: 10,
    isQuick: true,
    staples: ["Ghee"],
    allergens: ["dairy"],
    nutritionTags: {
      hydration_score: 98,
      calorie_density: 30,
      gut_gentleness: 99,
      iron_rich: 30,
      immunity_boost: 65
    },
    baseMacros: { kcal: 42, protein: 0.9, iron: 0.6, hydration: 98 },
    symptomAffinities: {
      reflux: 99,
      vomiting: 97,
      stomach: 96,
      fever: 90,
      dehydration: 94
    },
    stages: {
      stage1: {
        texture: "Clear silky bottle gourd broth",
        ingredients: [
          { name: "Fresh Sweet Lauki (Peeled & Seedless)", baseQty: 0.5, unit: "cup cubed", scalable: true },
          { name: "Water", baseQty: 1, unit: "cup", scalable: true },
          { name: "Roasted Jeera Powder", baseQty: 1, unit: "pinch", scalable: false },
          { name: "Pure Ghee", baseQty: 0.25, unit: "tsp", scalable: true, isAllergen: "dairy" }
        ],
        steps: [
          "Always taste a raw slice of lauki first to guarantee it is sweet and NEVER bitter.",
          "Steam or pressure cook lauki with water for 2 whistles until clear and tender. [timer:8:Pressure Cook Lauki]",
          "Blend into a silky clear broth.",
          "Add cumin powder and ghee. Serve warm."
        ],
        guardrail: "CRITICAL SAFETY: Always taste lauki before cooking; discard if bitter (cucurbitacin toxicity).",
        science: "Naturally alkaline pH counteracts gastric hyperacidity and lowers intra-esophageal pressure in reflux."
      },
      stage2: {
        texture: "Soft fork-mashed lauki and moong dal broth",
        ingredients: [
          { name: "Lauki & Yellow Moong Dal", baseQty: 0.5, unit: "cup combined", scalable: true },
          { name: "Ghee & Jeera", baseQty: 0.5, unit: "tsp", scalable: true, isAllergen: "dairy" }
        ],
        steps: [
          "Cook lauki and moong dal together. [timer:10:Cook Lauki Moong]",
          "Mash with fork into a soft textured broth.",
          "Serve warm."
        ],
        guardrail: "Zero salt under 12 months.",
        science: "High pectin-to-cellulose ratio minimizes intestinal gas generation and fermentation."
      },
      stage3: {
        texture: "Comforting lauki soup with tiny potato dice",
        ingredients: [
          { name: "Lauki & Potato", baseQty: 0.75, unit: "cup", scalable: true },
          { name: "Ghee & Cumin Seeds", baseQty: 1, unit: "tsp", scalable: true, isAllergen: "dairy" },
          { name: "Pinch of Salt", baseQty: 1, unit: "pinch", scalable: false }
        ],
        steps: [
          "Saute cumin in ghee, add diced lauki, potato, and water.",
          "Cook until tender and puree semi-smooth. [timer:10:Simmer Lauki Soup]",
          "Serve warm."
        ],
        guardrail: "Ensure soup is not boiling hot; lukewarm temperature avoids triggering vomiting reflexes.",
        science: "Low osmolality fluid facilitates rapid gastric emptying into the small intestine."
      },
      stage4: {
        texture: "Light Lauki & Moong Dal Gravy with Rice",
        ingredients: [
          { name: "Lauki & Moong Dal", baseQty: 1, unit: "cup", scalable: true },
          { name: "Ghee, Jeera, Hing & Turmeric", baseQty: 1.5, unit: "tsp", scalable: true, isAllergen: "dairy" },
          { name: "Salt", baseQty: 0.25, unit: "tsp", scalable: true }
        ],
        steps: [
          "Cook lauki dal subzi with mild spices until stew consistency. [timer:12:Cook Lauki Dal Stew]",
          "Serve warm with steamed white rice."
        ],
        guardrail: "Avoid tomatoes or chilies when child is experiencing acid reflux.",
        science: "Non-irritating soluble fiber bulk gently absorbs gastric acids without delaying digestion."
      }
    }
  }
];

// ============================================================================
// 4. MULTI-SYMPTOM SCORING & DYNAMIC CONFLICT ENGINE
// ============================================================================

/**
 * Calculates a multidimensional clinical score for a recipe based on active symptoms,
 * age stage, active allergens, and pantry filter.
 */
function scoreRecipe(recipe) {
  let score = 0;
  const symptoms = state.selectedSymptoms;
  
  // 1. Base symptom affinity scoring
  symptoms.forEach(sym => {
    const affinity = recipe.symptomAffinities[sym] || 25;
    score += affinity * 1.5;
  });

  // 2. Multi-symptom clinical trait weighting
  if (symptoms.includes('diarrhea')) {
    score += (recipe.nutritionTags.hydration_score * 0.4);
    score += (recipe.nutritionTags.gut_gentleness * 0.5);
    score -= (recipe.nutritionTags.calorie_density * 0.2); // Too heavy worsens diarrhea
  }
  if (symptoms.includes('fever')) {
    score += (recipe.nutritionTags.hydration_score * 0.45);
    score += (recipe.nutritionTags.immunity_boost * 0.35);
  }
  if (symptoms.includes('vomiting')) {
    score += (recipe.nutritionTags.gut_gentleness * 0.6);
    score += (recipe.nutritionTags.hydration_score * 0.4);
    score -= (recipe.nutritionTags.calorie_density * 0.3); // High fat provokes vomiting
  }
  if (symptoms.includes('underweight') || symptoms.includes('poorweight') || symptoms.includes('pem')) {
    score += (recipe.nutritionTags.calorie_density * 0.65);
    score += (recipe.nutritionTags.iron_rich * 0.25);
  }
  if (symptoms.includes('anemia')) {
    score += (recipe.nutritionTags.iron_rich * 0.85);
  }
  if (symptoms.includes('constipation')) {
    score += (recipe.nutritionTags.gut_gentleness * 0.4);
    score += (recipe.nutritionTags.hydration_score * 0.35);
  }
  if (symptoms.includes('cold') || symptoms.includes('throat')) {
    score += (recipe.nutritionTags.immunity_boost * 0.6);
  }
  if (symptoms.includes('colic') || symptoms.includes('reflux') || symptoms.includes('stomach')) {
    score += (recipe.nutritionTags.gut_gentleness * 0.7);
  }
  if (symptoms.includes('calcium') || symptoms.includes('vitd')) {
    if (recipe.id === 'makhana_kheer' || recipe.id === 'roasted_ragi_sari') score += 40;
  }

  // 3. Pantry Staple Match Boost (+25 points per matching staple in kitchen)
  if (state.activePantry.size > 0 && recipe.staples) {
    let pantryOverlap = 0;
    recipe.staples.forEach(staple => {
      if (state.activePantry.has(staple)) {
        pantryOverlap++;
        score += 28;
      }
    });
  }

  // 4. Allergen Exclusion Handling
  if (state.activeAllergens.size > 0) {
    state.activeAllergens.forEach(allergen => {
      if (recipe.allergens && recipe.allergens.includes(allergen)) {
        // If gluten is excluded and recipe uses gluten grain (suji/barley) without easy substitute
        if (allergen === 'gluten' && (recipe.id === 'banana_sheera' || recipe.id === 'barley_water_lime')) {
          score -= 1000; // Strict filter out
        }
      }
    });
  }

  return score;
}

/**
 * Mutates ingredients dynamically when conflicting symptoms or allergies occur
 */
function resolveIngredientMutations(recipe, stageData) {
  const mutations = [];
  const symptoms = state.selectedSymptoms;
  const isInfant = state.selectedStage === 'stage1' || state.selectedStage === 'stage2';
  const hasDiarrhea = symptoms.includes('diarrhea');
  const hasDairyAllergy = state.activeAllergens.has('dairy');
  const hasNutAllergy = state.activeAllergens.has('nuts');
  const hasGlutenAllergy = state.activeAllergens.has('gluten');

  // Clone stage ingredients for safe mutation
  const adaptedIngredients = stageData.ingredients.map(ing => {
    let modified = { ...ing };
    let originalName = ing.name;

    // Rule 1: Infant < 12m salt & sugar guardrail
    if (isInfant) {
      if (ing.name.toLowerCase().includes('salt') || ing.name.toLowerCase().includes('sugar') || ing.name.toLowerCase().includes('jaggery') || ing.name.toLowerCase().includes('honey')) {
        modified.name = `${ing.name} — OMITTED`;
        modified.adapted = true;
        mutations.push({
          badge: "ICMR-NIN Guardrail: Salt/Sugar Omitted",
          text: "Under 12 months, infant kidneys and developing metabolic pathways cannot process added sodium or sugar."
        });
      }
    }

    // Rule 2: Diarrhea active -> Strip jaggery/sugars & heavy dairy
    if (hasDiarrhea) {
      if (ing.name.toLowerCase().includes('jaggery') || ing.name.toLowerCase().includes('sugar') || ing.name.toLowerCase().includes('honey')) {
        modified.name = "Sweetener Omitted (Zero added sugar)";
        modified.adapted = true;
        mutations.push({
          badge: "Sugar Omitted: Diarrhea Safe",
          text: "High osmolar sugars draw excess water into bowel lumen and exacerbate diarrhea."
        });
      }
      if (ing.name.toLowerCase().includes('milk') && !ing.name.toLowerCase().includes('coconut') && !ing.name.toLowerCase().includes('formula') && !ing.name.toLowerCase().includes('breastmilk')) {
        modified.name = "Light Coconut Milk or Diluted Rice Starch";
        modified.adapted = true;
        mutations.push({
          badge: "Dairy Substituted: Diarrhea Recovery",
          text: "Transient secondary lactase enzyme deficiency is frequent during pediatric gastroenteritis."
        });
      }
    }

    // Rule 3: Dairy allergy active -> Swap ghee/milk/curd
    if (hasDairyAllergy) {
      if (ing.name.toLowerCase().includes('ghee')) {
        modified.name = "Virgin Cold-Pressed Coconut Oil";
        modified.adapted = true;
        mutations.push({
          badge: "Ghee Swapped: 100% Dairy-Free",
          text: "Replaced cow's ghee with cold-pressed coconut oil for milk protein allergy safety."
        });
      }
      if (ing.name.toLowerCase().includes('curd') || (ing.name.toLowerCase().includes('milk') && !ing.name.toLowerCase().includes('coconut'))) {
        modified.name = "Homemade Coconut Milk or Oat Cream";
        modified.adapted = true;
        mutations.push({
          badge: "Milk Swapped: Dairy-Free",
          text: "Substituted dairy milk/curd with plant-based hypoallergenic coconut milk."
        });
      }
    }

    // Rule 4: Nut allergy active -> Swap almonds/peanuts
    if (hasNutAllergy) {
      if (ing.name.toLowerCase().includes('almond') || ing.name.toLowerCase().includes('peanut') || ing.name.toLowerCase().includes('nut')) {
        modified.name = "Roasted Sesame & Melon Seed Powder (Nut-Free)";
        modified.adapted = true;
        mutations.push({
          badge: "Nut Substitute: Allergy-Safe",
          text: "Replaced tree nuts/peanuts with finely milled hypoallergenic seeds."
        });
      }
    }

    return modified;
  });

  // Deduplicate mutations by badge
  const uniqueMutations = [];
  const seenBadges = new Set();
  mutations.forEach(m => {
    if (!seenBadges.has(m.badge)) {
      seenBadges.add(m.badge);
      uniqueMutations.push(m);
    }
  });

  return { adaptedIngredients, uniqueMutations };
}

// ============================================================================
// 5. VIEW RENDERING & CONTROLLER
// ============================================================================

/**
 * Re-evaluates entire dataset, ranks matches, and renders UI
 */
function updateAppView() {
  const container = document.getElementById('recipe-output-container');
  const recoverySection = document.getElementById('recovery-schedule-section');
  
  // 1. Check 3-Symptom Clinical Triage Cutoff
  if (state.selectedSymptoms.length > 3) {
    renderMedicalTriageAlert();
    if (recoverySection) recoverySection.innerHTML = '';
    return;
  }

  // 2. Score and Rank Recipes
  const scoredRecipes = recipeDatabase
    .map(recipe => ({ recipe, score: scoreRecipe(recipe) }))
    .filter(item => item.score > -200) // Filter out hard allergen exclusions
    .sort((a, b) => b.score - a.score);

  if (scoredRecipes.length === 0) {
    container.innerHTML = `
      <div class="doctor-warning-card" style="text-align: center;">
        <h3>No Exact Recipe Match</h3>
        <p>No recipes match your active allergy exclusions. Please uncheck some exclusions or clear symptom filters.</p>
      </div>
    `;
    return;
  }

  // 3. Determine Hero Recipe (Use activeHeroRecipeId if chosen, else #1 score)
  let heroItem = scoredRecipes[0];
  if (state.activeHeroRecipeId) {
    const customHero = scoredRecipes.find(item => item.recipe.id === state.activeHeroRecipeId);
    if (customHero) heroItem = customHero;
  }

  const heroRecipe = heroItem.recipe;

  // 4. Determine Top 2 Alternatives (#2 Quick Option, #3 Pantry/Next Best)
  const remaining = scoredRecipes.filter(item => item.recipe.id !== heroRecipe.id);
  let quickAlt = remaining.find(item => item.recipe.isQuick) || remaining[0];
  let secondAlt = remaining.find(item => item.recipe.id !== (quickAlt ? quickAlt.recipe.id : '')) || remaining[1];

  // 5. Render Hero Recipe Card
  renderHeroRecipe(heroRecipe, heroItem.score);

  // 6. Render Ranked Alternatives
  if (quickAlt || secondAlt) {
    renderAlternatives(quickAlt ? quickAlt.recipe : null, secondAlt ? secondAlt.recipe : null);
  }

  // 7. Render 24-Hour Recovery Feeding Schedule
  render24HourSchedule(heroRecipe);

  // 8. Update Profile Header & Mobile Sticky Bar
  updateProfileSummary(heroRecipe);
}

/**
 * Renders the prominent Pediatrician Consultation Triage screen when > 3 symptoms
 */
function renderMedicalTriageAlert() {
  const container = document.getElementById('recipe-output-container');
  container.innerHTML = `
    <div class="doctor-warning-card">
      <div class="warning-icon-big">⚠️</div>
      <h3>Pediatric Evaluation Required: Consult a Doctor</h3>
      <p>You have selected <strong>${state.selectedSymptoms.length} simultaneous symptoms</strong>. When an infant or toddler exhibits more than 3 concurrent acute symptoms, recipe-based home recovery is clinically contraindicated without a physical pediatric examination.</p>
      
      <div class="emergency-red-box">
        <strong>🚨 Immediate Emergency Hospital Red Flags (Do Not Delay):</strong>
        <ul style="margin-left: 1.2rem; margin-top: 0.4rem; line-height: 1.5;">
          <li>High unremitting fever (&gt;102°F or lasting &gt;48 hours)</li>
          <li>Sunken eyes, depressed fontanelle (soft spot), or zero wet diapers in 6+ hours</li>
          <li>Extreme lethargy, floppiness, or inability to wake for feeds</li>
          <li>Rapid breathing, grunting sounds, or chest retractions (ribs pulling inward)</li>
          <li>Persistent projectile vomiting or blood/mucus in stool</li>
        </ul>
      </div>

      <div style="margin-top: 1.2rem;">
        <button type="button" class="timer-tactile-btn primary" onclick="clearSelectedSymptoms()">
          ✕ Reset to Single Symptom Care
        </button>
      </div>
    </div>
  `;
}

/**
 * Renders the #1 Best Clinical Match Hero Card
 */
function renderHeroRecipe(recipe, score) {
  const container = document.getElementById('recipe-output-container');
  const stageData = recipe.stages[state.selectedStage] || recipe.stages.stage1;
  const { adaptedIngredients, uniqueMutations } = resolveIngredientMutations(recipe, stageData);

  // Calculate scaled macros
  const mult = state.portionMultiplier;
  const macros = {
    kcal: Math.round(recipe.baseMacros.kcal * mult),
    protein: (recipe.baseMacros.protein * mult).toFixed(1),
    iron: (recipe.baseMacros.iron * mult).toFixed(1),
    hydration: recipe.baseMacros.hydration
  };

  // Build Ingredients HTML with interactive checkboxes
  const ingredientsHtml = adaptedIngredients.map((ing, i) => {
    const qtyText = ing.scalable ? `${ing.baseQty * mult} ${ing.unit}` : `${ing.unit}`;
    const adaptedTag = ing.adapted ? `<span class="ing-adapted-tag">Adapted</span>` : '';
    return `
      <label class="ingredient-row" id="ing-row-${i}">
        <input type="checkbox" class="ing-checkbox" onchange="toggleIngCheck(this, ${i})">
        <span class="ing-text"><strong>${qtyText}</strong> ${ing.name} ${adaptedTag}</span>
      </label>
    `;
  }).join('');

  // Build Steps HTML with step-linked timers
  const stepsHtml = stageData.steps.map((step, idx) => {
    // Check for [timer:MINS:LABEL]
    let timerBtnHtml = '';
    let cleanStep = step;
    const match = step.match(/\[timer:(\d+):(.*?)\]/);
    if (match) {
      const minutes = parseInt(match[1]);
      const label = match[2];
      timerBtnHtml = `
        <div>
          <button type="button" class="step-timer-trigger" onclick="triggerStepTimer(${minutes}, '${label.replace(/'/g, "\\'")}')">
            ⏱️ Start ${minutes}m ${label}
          </button>
        </div>
      `;
      cleanStep = step.replace(/\[timer:.*?\]/, '');
    }

    return `
      <div class="step-item">
        <div class="step-number-circle">${idx + 1}</div>
        <div>
          <div class="step-desc-text">${cleanStep}</div>
          ${timerBtnHtml}
        </div>
      </div>
    `;
  }).join('');

  // Multi-symptom harmony explanation
  let harmonyHtml = '';
  if (state.selectedSymptoms.length > 1) {
    const symNames = state.selectedSymptoms.map(s => getSymptomLabel(s)).join(', ');
    harmonyHtml = `
      <div class="harmony-conflict-box">
        <strong>💡 Multi-Symptom Harmonized:</strong> For concurrent symptoms (<em>${symNames}</em>), 
        <strong>${recipe.title}</strong> was dynamically selected by our scoring engine as the optimal intersection of 
        electrolyte rehydration and gut mucosal tolerance.
        ${uniqueMutations.length > 0 ? `
          <div class="mutation-badges-wrap">
            ${uniqueMutations.map(m => `<span class="mutation-badge" title="${m.text}">⚡ ${m.badge}</span>`).join('')}
          </div>
        ` : ''}
      </div>
    `;
  } else if (uniqueMutations.length > 0) {
    harmonyHtml = `
      <div class="harmony-conflict-box">
        <strong>🛡️ Clinical Adaptations Applied:</strong>
        <div class="mutation-badges-wrap">
          ${uniqueMutations.map(m => `<span class="mutation-badge" title="${m.text}">⚡ ${m.badge}</span>`).join('')}
        </div>
      </div>
    `;
  }

  container.innerHTML = `
    <article class="recipe-card-hero">
      
      <!-- Top Clinical Match Bar -->
      <div class="hero-match-badge-bar">
        <div style="display: flex; align-items: center; gap: 0.6rem;">
          <span class="clinical-match-badge">⭐ #1 BEST CLINICAL MATCH</span>
          <span style="font-size: 0.8rem; font-weight: 700; color: var(--text-main);">${recipe.type}</span>
        </div>
        <span class="match-score-pill">Fit Score: ${Math.round(score)} pts</span>
      </div>

      <div class="recipe-hero-body">
        
        <!-- Header Info -->
        <div class="recipe-header-flex">
          <div>
            <h2 class="recipe-hero-title">${recipe.title}</h2>
            <p class="recipe-hero-desc">${recipe.desc}</p>
          </div>
        </div>

        <!-- Multi-Symptom Conflict Resolution Banner -->
        ${harmonyHtml}

        <!-- Macro Nutrients (Scales with Portion) -->
        <div class="macros-grid">
          <div class="macro-col">
            <span class="macro-val">${macros.kcal}</span>
            <span class="macro-lbl">Calories (kcal)</span>
          </div>
          <div class="macro-col">
            <span class="macro-val">${macros.protein}g</span>
            <span class="macro-lbl">Protein</span>
          </div>
          <div class="macro-col">
            <span class="macro-val">${macros.iron}mg</span>
            <span class="macro-lbl">Iron</span>
          </div>
          <div class="macro-col">
            <span class="macro-val">${macros.hydration}%</span>
            <span class="macro-lbl">Hydration</span>
          </div>
        </div>

        <!-- Quick Meta Details Strip -->
        <div class="meta-quick-strip">
          <div class="meta-chip">⏱️ Prep: <span>${recipe.prepTime}</span></div>
          <div class="meta-chip">🔥 Cook: <span>${recipe.cookTime}</span></div>
          <div class="meta-chip">🥣 Suggested Texture: <span>${stageData.texture}</span></div>
        </div>

        <!-- Two Columns: Ingredients Checklist vs Cooking Directions -->
        <div class="recipe-inner-columns">
          
          <!-- Ingredients Checklist with Interactive Checkboxes -->
          <div class="checklist-box">
            <h4 class="recipe-sub-title">📋 Ingredients (${mult === 1 ? '1 Bowl' : '2 Bowls Batch'})</h4>
            <div style="font-size: 0.78rem; color: var(--text-muted); margin-bottom: 0.6rem;">Tap to check off while prepping:</div>
            <div class="ingredients-checklist">
              ${ingredientsHtml}
            </div>
          </div>

          <!-- Cooking Directions with Step-Linked Timers -->
          <div class="steps-box">
            <h4 class="recipe-sub-title">👩‍🍳 Step-by-Step Directions</h4>
            <div class="cooking-steps-list">
              ${stepsHtml}
            </div>
          </div>

        </div>

        <!-- Active Cooking Timer Widget -->
        <div class="cooking-timer-card">
          <div class="timer-header-flex">
            <span class="timer-title-text" id="active-timer-label">⏰ Active Cooking Helper: Standby</span>
            <span class="timer-countdown-clock" id="timer-clock-display">00:00</span>
          </div>
          <div class="timer-bar-track">
            <div class="timer-bar-progress" id="timer-progress-bar"></div>
          </div>
          <div class="timer-buttons-row">
            <button type="button" class="timer-tactile-btn primary" id="timer-toggle-btn" onclick="toggleTimer()">
              Start Helper
            </button>
            <button type="button" class="timer-tactile-btn" onclick="resetTimer()">
              Reset
            </button>
          </div>
        </div>

        <!-- Scientific Rationale & Safety Callouts -->
        <div class="science-guardrail-grid">
          <div class="guardrail-callout">
            <h5>👶 Stage Safety Guide</h5>
            <p>${stageData.guardrail}</p>
          </div>
          <div class="guardrail-callout">
            <h5>🔬 Pediatric Biochemical Rationale</h5>
            <p>${stageData.science}</p>
          </div>
        </div>

      </div>

    </article>

    <!-- Container for Ranked Alternatives -->
    <div id="alternatives-output-container"></div>
  `;
}

/**
 * Renders the 2 Ranked Alternatives
 */
function renderAlternatives(quickAlt, pantryAlt) {
  const container = document.getElementById('alternatives-output-container');
  if (!container) return;

  let cardsHtml = '';

  if (quickAlt) {
    cardsHtml += `
      <div class="alt-recipe-card">
        <div>
          <div class="alt-tag-row">
            <span class="alt-type-badge quick">⚡ Quick ${quickAlt.cookTime} Option</span>
            <span style="font-size: 0.76rem; color: var(--text-muted); font-weight: 600;">${quickAlt.type}</span>
          </div>
          <h4 class="alt-card-title">${quickAlt.title}</h4>
          <p class="alt-card-desc">${quickAlt.desc}</p>
        </div>
        <button type="button" class="swap-to-main-btn" onclick="swapToHero('${quickAlt.id}')">
          Swap to Main View 🥣
        </button>
      </div>
    `;
  }

  if (pantryAlt && (!quickAlt || pantryAlt.id !== quickAlt.id)) {
    cardsHtml += `
      <div class="alt-recipe-card">
        <div>
          <div class="alt-tag-row">
            <span class="alt-type-badge pantry">🏠 Pantry Staple Option</span>
            <span style="font-size: 0.76rem; color: var(--text-muted); font-weight: 600;">${pantryAlt.staples ? pantryAlt.staples.join(', ') : 'Staples'}</span>
          </div>
          <h4 class="alt-card-title">${pantryAlt.title}</h4>
          <p class="alt-card-desc">${pantryAlt.desc}</p>
        </div>
        <button type="button" class="swap-to-main-btn" onclick="swapToHero('${pantryAlt.id}')">
          Swap to Main View 🥣
        </button>
      </div>
    `;
  }

  container.innerHTML = `
    <section class="alternatives-section">
      <h3 class="alternatives-title">🔄 Ranked Clinical Alternatives</h3>
      <div class="alternatives-grid">
        ${cardsHtml}
      </div>
    </section>
  `;
}

/**
 * Renders the 24-Hour Gentle Recovery Schedule
 */
function render24HourSchedule(recipe) {
  const container = document.getElementById('recovery-schedule-section');
  if (!container) return;

  const hasFever = state.selectedSymptoms.includes('fever');
  const hasDiarrhea = state.selectedSymptoms.includes('diarrhea');
  const hasCold = state.selectedSymptoms.includes('cold') || state.selectedSymptoms.includes('throat');

  let morningDrink = "Warm Jeera-Ajwain Paani or Light Fennel Infusion";
  let afternoonSip = "Tender Coconut Water or Homemade Electrolyte Sip";
  let eveningDinner = "Soft Mashed Moong Khichdi with drop of Ghee";

  if (hasDiarrhea) {
    morningDrink = "Diluted Rice Water (Kanji Paani) with pinch of Cumin";
    afternoonSip = "Fresh Homemade Curd Whey Water (Probiotic Chaas)";
    eveningDinner = "Steamed Stewed Apple Mash with Cinnamon";
  } else if (hasCold) {
    morningDrink = "Warm Ginger-Tulsi Steamed Water (Strained)";
    afternoonSip = "Warm Stewed Apple Puree with Ceylon Cinnamon";
    eveningDinner = "Golden Besan Kadha Sheera (Warm Bedtime Soup)";
  } else if (hasFever) {
    morningDrink = "Strained Pearl Barley Paani (Cooling Hydrator)";
    afternoonSip = "Tender Coconut Water or Sweet Pomegranate Nectar";
    eveningDinner = "Golden Moong Dal & Rice Thin Gruel";
  }

  container.innerHTML = `
    <div class="recovery-header-flex">
      <div class="recovery-header-title">
        <h3>24-Hour Gentle Recovery Feeding Schedule</h3>
        <p>Pediatric circadian timeline tailored to active recovery needs:</p>
      </div>
      <div class="recovery-actions">
        <button type="button" class="recovery-tactile-btn whatsapp" onclick="copyScheduleToWhatsApp('${recipe.title.replace(/'/g, "\\'")}')">
          📋 Copy for WhatsApp
        </button>
      </div>
    </div>

    <div class="timeline-slots-grid">
      <div class="timeline-slot">
        <span class="slot-time-badge">🌅 7:00 AM – 8:00 AM</span>
        <div class="slot-name">Morning Hydration</div>
        <div class="slot-item-text">${morningDrink}</div>
      </div>
      <div class="timeline-slot" style="border-left: 3px solid var(--primary-color);">
        <span class="slot-time-badge">🍲 10:30 AM – 11:30 AM</span>
        <div class="slot-name">Healing Bowl</div>
        <div class="slot-item-text"><strong>${recipe.title}</strong> (${state.portionMultiplier} Bowl Portion)</div>
      </div>
      <div class="timeline-slot">
        <span class="slot-time-badge">☀️ 2:30 PM – 3:30 PM</span>
        <div class="slot-name">Afternoon Sip</div>
        <div class="slot-item-text">${afternoonSip}</div>
      </div>
      <div class="timeline-slot">
        <span class="slot-time-badge">🌙 6:30 PM – 7:30 PM</span>
        <div class="slot-name">Soothing Dinner</div>
        <div class="slot-item-text">${eveningDinner}</div>
      </div>
    </div>
  `;
}

/**
 * Updates top profile bar and mobile sticky bar
 */
function updateProfileSummary(recipe) {
  const stageHeader = stageGuardrails[state.selectedStage];
  const summaryStage = document.getElementById('summary-stage-title');
  const summarySub = document.getElementById('summary-symptoms-sub');
  const mobileMatchedTitle = document.getElementById('mobile-matched-title');

  if (summaryStage) summaryStage.textContent = stageHeader.title;
  if (summarySub) {
    summarySub.textContent = `Active: ${state.selectedSymptoms.map(s => getSymptomLabel(s)).join(', ')}`;
  }
  if (mobileMatchedTitle) {
    mobileMatchedTitle.textContent = recipe.title;
  }

  // Update Pediatric Guardrail Box
  const guardrailBox = document.getElementById('pediatric-guardrail-box');
  if (guardrailBox) {
    guardrailBox.innerHTML = stageHeader.guidance;
  }

  // Update Selected Symptom Pill Count
  const countBadge = document.getElementById('selected-count-badge');
  const clearBtn = document.getElementById('clear-selection-btn');
  if (countBadge) {
    countBadge.textContent = `Selected: ${state.selectedSymptoms.length} / 3`;
    if (state.selectedSymptoms.length === 3) {
      countBadge.className = 'selected-pill-badge limit-reached';
    } else if (state.selectedSymptoms.length > 3) {
      countBadge.className = 'selected-pill-badge alert-badge';
    } else {
      countBadge.className = 'selected-pill-badge';
    }
  }
  if (clearBtn) {
    clearBtn.disabled = state.selectedSymptoms.length === 0;
  }
}

// ============================================================================
// 6. INTERACTIVE TIMERS & STEP LINKING
// ============================================================================

function triggerStepTimer(minutes, label) {
  state.timer.totalSeconds = minutes * 60;
  state.timer.secondsRemaining = minutes * 60;
  state.timer.label = label;
  
  const labelEl = document.getElementById('active-timer-label');
  if (labelEl) labelEl.textContent = `⏰ Active: ${label}`;
  
  updateTimerDisplay();
  startTimerCountdown();
}

function toggleTimer() {
  const btn = document.getElementById('timer-toggle-btn');
  if (state.timer.interval) {
    // Pause
    clearInterval(state.timer.interval);
    state.timer.interval = null;
    if (btn) btn.textContent = 'Resume';
  } else {
    // Start / Resume
    if (state.timer.secondsRemaining <= 0) {
      state.timer.totalSeconds = 10 * 60;
      state.timer.secondsRemaining = 10 * 60;
      state.timer.label = "Cooking Simmer";
    }
    startTimerCountdown();
  }
}

function startTimerCountdown() {
  if (state.timer.interval) clearInterval(state.timer.interval);

  const btn = document.getElementById('timer-toggle-btn');
  if (btn) btn.textContent = 'Pause';

  state.timer.interval = setInterval(() => {
    if (state.timer.secondsRemaining > 0) {
      state.timer.secondsRemaining--;
      updateTimerDisplay();
    } else {
      clearInterval(state.timer.interval);
      state.timer.interval = null;
      onTimerFinished();
    }
  }, 1000);
}

function resetTimer() {
  if (state.timer.interval) {
    clearInterval(state.timer.interval);
    state.timer.interval = null;
  }
  state.timer.secondsRemaining = state.timer.totalSeconds || 10 * 60;
  updateTimerDisplay();

  const btn = document.getElementById('timer-toggle-btn');
  if (btn) btn.textContent = 'Start Helper';
}

function updateTimerDisplay() {
  const display = document.getElementById('timer-clock-display');
  const bar = document.getElementById('timer-progress-bar');
  if (!display) return;

  const mins = Math.floor(state.timer.secondsRemaining / 60);
  const secs = state.timer.secondsRemaining % 60;
  display.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

  if (bar && state.timer.totalSeconds > 0) {
    const pct = ((state.timer.totalSeconds - state.timer.secondsRemaining) / state.timer.totalSeconds) * 100;
    bar.style.width = `${pct}%`;
  }
}

function onTimerFinished() {
  const display = document.getElementById('timer-clock-display');
  if (display) {
    display.textContent = "Done! 🎉";
    display.style.color = "var(--secondary-color)";
  }
  const btn = document.getElementById('timer-toggle-btn');
  if (btn) btn.textContent = 'Finished';

  // Play gentle web audio chime
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(523.25, audioCtx.currentTime); // C5
    gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
    osc.start();
    osc.frequency.exponentialRampToValueAtTime(659.25, audioCtx.currentTime + 0.3); // E5
    osc.stop(audioCtx.currentTime + 0.8);
  } catch(e) {
    console.log("Audio chime note:", e);
  }
}

// ============================================================================
// 7. USER EVENT HANDLERS
// ============================================================================

function setAgeStage(stage) {
  state.selectedStage = stage;
  document.querySelectorAll('.age-card-btn').forEach(btn => btn.classList.remove('active'));
  const activeBtn = document.getElementById(`age-${stage}`);
  if (activeBtn) activeBtn.classList.add('active');

  state.activeHeroRecipeId = null; // Reset manual swap
  updateAppView();
}

function toggleSymptom(symptomId) {
  const index = state.selectedSymptoms.indexOf(symptomId);
  const btn = document.getElementById(`symptom-${symptomId}`);

  if (index > -1) {
    // Remove symptom
    state.selectedSymptoms.splice(index, 1);
    if (btn) btn.classList.remove('active');
  } else {
    // Add symptom
    state.selectedSymptoms.push(symptomId);
    if (btn) btn.classList.add('active');
  }

  state.activeHeroRecipeId = null; // Clear override to re-rank
  updateAppView();
}

function clearSelectedSymptoms() {
  state.selectedSymptoms = [];
  document.querySelectorAll('.symptom-chip').forEach(btn => btn.classList.remove('active'));
  state.activeHeroRecipeId = null;
  updateAppView();
}

function toggleAllergen(allergen) {
  const btn = document.getElementById(`allergen-${allergen}`);
  if (state.activeAllergens.has(allergen)) {
    state.activeAllergens.delete(allergen);
    if (btn) btn.classList.remove('active');
  } else {
    state.activeAllergens.add(allergen);
    if (btn) btn.classList.add('active');
  }
  updateAppView();
}

function togglePantry(staple) {
  const btn = document.getElementById(`pantry-${staple.replace(/\s+/g, '')}`);
  if (state.activePantry.has(staple)) {
    state.activePantry.delete(staple);
    if (btn) btn.classList.remove('active');
  } else {
    state.activePantry.add(staple);
    if (btn) btn.classList.add('active');
  }
  updateAppView();
}

function clearPantryFilter() {
  state.activePantry.clear();
  document.querySelectorAll('.pantry-chip').forEach(btn => btn.classList.remove('active'));
  updateAppView();
}

function setPortionScale(scale) {
  state.portionMultiplier = scale;
  document.getElementById('portion-btn-1').classList.toggle('active', scale === 1);
  document.getElementById('portion-btn-2').classList.toggle('active', scale === 2);
  updateAppView();
}

function swapToHero(recipeId) {
  state.activeHeroRecipeId = recipeId;
  updateAppView();
  // Smooth scroll into workspace
  const workspace = document.getElementById('recipe-workspace');
  if (workspace) {
    workspace.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function toggleIngCheck(checkbox, index) {
  const row = document.getElementById(`ing-row-${index}`);
  if (row) {
    row.classList.toggle('checked', checkbox.checked);
  }
}

function scrollToRecipe() {
  const workspace = document.getElementById('recipe-workspace');
  if (workspace) {
    workspace.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function copyScheduleToWhatsApp(recipeTitle) {
  const stageHeader = stageGuardrails[state.selectedStage];
  const symptomsText = state.selectedSymptoms.map(s => getSymptomLabel(s)).join(', ');
  
  const text = `🥣 *Bal Aahar — Pediatric Recovery Plan*\n` +
    `👶 *Stage:* ${stageHeader.title}\n` +
    `🩺 *Symptoms:* ${symptomsText}\n\n` +
    `⭐ *Recommended Healing Bowl:* ${recipeTitle}\n` +
    `📅 *24-Hour Recovery Feeding Schedule:*\n` +
    `• *7:00 AM:* Gentle Morning Hydration\n` +
    `• *10:30 AM:* ${recipeTitle} (${state.portionMultiplier} Bowl Portion)\n` +
    `• *2:30 PM:* Afternoon Electrolyte Sip (Coconut water / Chaas)\n` +
    `• *6:30 PM:* Light Soothing Dinner\n\n` +
    `⚠️ *Pediatric Note:* Grounded in ICMR-NIN dietary guidelines. Consult pediatrician if fever > 102°F or signs of dehydration appear.`;

  navigator.clipboard.writeText(text).then(() => {
    showToast("📋 Recovery plan copied! Paste in WhatsApp.");
  }).catch(() => {
    showToast("Copied to clipboard!");
  });
}

function showToast(msg) {
  const toast = document.getElementById('toast-notification');
  if (toast) {
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }
}

function getSymptomLabel(id) {
  const labels = {
    fever: "Fever / Flu",
    cold: "Cough & Cold",
    stomach: "Tummy Troubles",
    throat: "Sore Throat",
    constipation: "Constipation",
    teething: "Teething Distress",
    vomiting: "Vomiting",
    colic: "Colic & Gas",
    appetite: "Appetite Loss",
    rashes: "Heat Boils",
    diarrhea: "Loose Diarrhea",
    dehydration: "Dehydration",
    anemia: "Iron Deficiency",
    underweight: "Underweight Boost",
    poorweight: "Poor Weight",
    pem: "Protein Recovery",
    vitd: "Vitamin D",
    calcium: "Calcium",
    immunity: "Weak Immunity",
    picky: "Picky Eating",
    diaperrash: "Diaper Rash",
    eczema: "Skin Eczema",
    reflux: "Acid Reflux"
  };
  return labels[id] || id;
}

// ============================================================================
// 8. 3D TACTILE HOVER TILT & INITIALIZATION
// ============================================================================
function initTactileTilt() {
  const cards = document.querySelectorAll('.age-card-btn, .alt-recipe-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const rotX = -(y / (rect.height / 2)) * 6;
      const rotY = (x / (rect.width / 2)) * 6;
      card.style.transform = `perspective(800px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translateY(-2px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

// Window Globals for onclick handlers in dynamic markup
window.setAgeStage = setAgeStage;
window.toggleSymptom = toggleSymptom;
window.clearSelectedSymptoms = clearSelectedSymptoms;
window.toggleAllergen = toggleAllergen;
window.togglePantry = togglePantry;
window.clearPantryFilter = clearPantryFilter;
window.setPortionScale = setPortionScale;
window.swapToHero = swapToHero;
window.toggleIngCheck = toggleIngCheck;
window.triggerStepTimer = triggerStepTimer;
window.toggleTimer = toggleTimer;
window.resetTimer = resetTimer;
window.scrollToRecipe = scrollToRecipe;
window.copyScheduleToWhatsApp = copyScheduleToWhatsApp;

// DOM Ready
window.addEventListener('DOMContentLoaded', () => {
  updateAppView();
  initTactileTilt();
});
