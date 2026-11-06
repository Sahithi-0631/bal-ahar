// Bal Aahar Recipe Database & Zomato-themed Interactive Logic

// 1. Comprehensive Recipe Database (75 combinations: 25 illnesses * 3 age groups)
const recipes = {
  // --- FEVER / FLU ---
  fever: {
    infant: {
      title: "Golden Moong Dal Soup",
      desc: "A warm, light, and highly digestible lentil broth. Perfect for keeping infants hydrated and providing easy-to-absorb protein during a fever.",
      prepTime: "10 mins",
      cookTime: "15 mins",
      servings: "1-2 small bowls",
      rating: "4.9",
      reviews: [
        { name: "Priya K. (Mom of 8-month-old)", rating: "5★", text: "This soup was the only thing my baby would take when she had a fever last week. So simple and highly digestible.", date: "3 days ago", avatarClass: "" },
        { name: "Divya M. (Mom of 10-month-old)", rating: "4★", text: "Added a drop of ghee as suggested and she finished the whole bowl. Very soothing.", date: "1 week ago", avatarClass: "purple" }
      ],
      ingredients: [
        "2 tablespoons yellow moong dal (washed & soaked for 15 mins)",
        "1.5 cups water",
        "A tiny pinch of turmeric powder (haldi)",
        "A pinch of roasted cumin powder (jeera)",
        "1/4 teaspoon pure cow's ghee"
      ],
      steps: [
        "In a small pressure cooker, add the soaked moong dal, water, and turmeric powder.",
        "Cook for 3-4 whistles until the lentils are completely soft and mushy.",
        "Mash the dal thoroughly with a spoon or blend it slightly to create a watery, smooth consistency.",
        "Strain it if your baby is new to solids to remove any grainy parts.",
        "Warm the ghee in a small ladle, add a tiny pinch of cumin powder, and stir it into the soup. Serve lukewarm."
      ],
      ageAdjustment: "For babies 6-12 months: DO NOT add salt. The recipe is naturally savory from the lentils. Keep the soup very watery and easy to swallow.",
      science: "Yellow Moong Dal is exceptionally easy on a feverish digestive system. Turmeric has anti-inflammatory properties, while ghee provides energy-boosting medium-chain fatty acids that help in recovery."
    },
    toddler: {
      title: "Soothing Moong Dal Khichdi",
      desc: "The gold standard of Indian recovery foods. Soft mashed rice and yellow lentils cooked to a porridge consistency with gentle spices.",
      prepTime: "10 mins",
      cookTime: "20 mins",
      servings: "2 child-size servings",
      rating: "4.8",
      reviews: [
        { name: "Sneha R. (Mom of 18-month-old)", rating: "5★", text: "Dadi's recipe never fails! The khichdi is so soft, my toddler didn't have to struggle to chew it.", date: "Yesterday", avatarClass: "orange" },
        { name: "Ritu S. (Mom of 2-year-old)", rating: "5★", text: "A dash of ghee makes it taste so comforting. Highly recommend when the kid is down with flu.", date: "4 days ago", avatarClass: "green" }
      ],
      ingredients: [
        "3 tablespoons rice (washed)",
        "2 tablespoons yellow moong dal (washed)",
        "2 cups water",
        "A tiny pinch of turmeric powder",
        "A pinch of hing (asafoetida)",
        "1/2 teaspoon ghee",
        "A small pinch of salt (optional)"
      ],
      steps: [
        "Soak the rice and dal together in water for 15 minutes, then drain.",
        "Heat ghee in a small pressure cooker. Add hing and turmeric.",
        "Add the drained rice, dal, water, and a very small pinch of salt.",
        "Pressure cook for 4 whistles on medium heat. Let the pressure release naturally.",
        "Open and mash the khichdi using a potato masher until it is semi-solid and easily swallowable. Serve warm with a drop of ghee."
      ],
      ageAdjustment: "For toddlers (12-24 months): Keep the texture very soft. You can mix in 1 tablespoon of fresh curd if the child likes it and doesn't have a cold.",
      science: "Rice and lentils together form a complete protein that helps rebuild tissues. The soft texture requires minimal chewing, saving the sick child's energy, while hing aids in relieving bloating."
    },
    preschool: {
      title: "Warm Tomato & Barley Soup",
      desc: "Barley is traditional for reducing body heat, combined with fresh tomatoes to provide Vitamin C and restore lost minerals during fever.",
      prepTime: "15 mins",
      cookTime: "25 mins",
      servings: "2 servings",
      rating: "4.7",
      reviews: [
        { name: "Meera J. (Mom of 3-year-old)", rating: "4★", text: "My daughter loves tomatoes and this barley soup was a hit! It really helped cool down her body temperature.", date: "5 days ago", avatarClass: "purple" },
        { name: "Arpita V. (Mom of 4-year-old)", rating: "5★", text: "Excellent combination of vitamin C and cooling barley. Super simple to make.", date: "2 weeks ago", avatarClass: "" }
      ],
      ingredients: [
        "2 tablespoons pearl barley (soaked for 2 hours)",
        "2 medium ripe tomatoes (washed & chopped)",
        "3 cups water",
        "1/2 teaspoon butter or ghee",
        "A pinch of cumin seeds",
        "A small pinch of black pepper powder",
        "1/4 teaspoon salt"
      ],
      steps: [
        "Boil the soaked barley in 2 cups of water in a pressure cooker for 4 whistles until completely tender and soft.",
        "Boil the tomatoes separately in 1 cup of water for 5 minutes, peel the skins, and blend into a smooth puree.",
        "In a saucepan, heat butter/ghee. Add cumin seeds and let them splutter.",
        "Pour in the tomato puree and cooked barley (along with its boiling water).",
        "Add salt and black pepper. Simmer on low heat for 10 minutes until the soup thickens slightly. Serve warm."
      ],
      ageAdjustment: "For 2-4 years: Make sure the barley grains are soft enough to chew easily. Adjust pepper to keep it very mild.",
      science: "Barley water has cooling properties that help regulate body temperature. Tomatoes are rich in Vitamin C, which supports the immune system and helps the body fight off infections."
    }
  },

  // --- COUGH & COLD ---
  cold: {
    infant: {
      title: "Cinnamon Stewed Apple Puree",
      desc: "Warm, sweet, and comforting. Steam-cooked apples are soothing on raw throats, while cinnamon offers traditional warming properties.",
      prepTime: "5 mins",
      cookTime: "10 mins",
      servings: "1 serving",
      rating: "4.9",
      reviews: [
        { name: "Kajal P. (Mom of 7-month-old)", rating: "5★", text: "The warm cinnamon aroma is so soothing. My baby had a runny nose and loved swallowing this soft puree.", date: "2 days ago", avatarClass: "orange" }
      ],
      ingredients: [
        "1 medium sweet red apple (peeled & cored)",
        "1/2 cup water",
        "A tiny pinch of Ceylon cinnamon powder",
        "No sugar or honey (unsafe for <1 year)"
      ],
      steps: [
        "Chop the peeled and cored apple into small, even cubes.",
        "Place the cubes in a small saucepan with the water. Cover and simmer on low heat for 8-10 minutes until mushy.",
        "Allow to cool slightly, then mash thoroughly with a fork or blend into a silky smooth puree.",
        "Stir in a tiny pinch of cinnamon powder. Serve warm."
      ],
      ageAdjustment: "For infants (6-12 months): DO NOT add honey or sweeteners. The natural sweetness of the apple is fully satisfying. Ensure it is served warm, not hot.",
      science: "Apples contain pectin, a soluble fiber that is very gentle on the stomach, while warm cinnamon helps stimulate circulation, clearing throat irritation."
    },
    toddler: {
      title: "Golden Soothing Besan Sheera",
      desc: "An age-old Punjabi home remedy for cold. A warm, semi-liquid sweet soup made of roasted chickpea flour, ghee, and warming spices.",
      prepTime: "5 mins",
      cookTime: "12 mins",
      servings: "1 bowl",
      rating: "4.9",
      reviews: [
        { name: "Gurpreet K. (Mom of 20-month-old)", rating: "5★", text: "This sheera is magic! Fed this warm to my boy before sleep. It stopped his night coughing fits.", date: "Yesterday", avatarClass: "green" },
        { name: "Anjali T. (Mom of 18-month-old)", rating: "5★", text: "A must-make in winters. Clears nose blocks immediately.", date: "3 days ago", avatarClass: "purple" }
      ],
      ingredients: [
        "1.5 tablespoons besan (chickpea flour)",
        "1 tablespoon ghee",
        "1 cup warm water or milk",
        "1 tablespoon jaggery powder (gur)",
        "A pinch of cardamom powder (elaichi)",
        "A tiny pinch of turmeric powder"
      ],
      steps: [
        "Heat ghee in a heavy-bottomed pan on low heat. Add the besan.",
        "Roast the besan, stirring continuously, for about 5-6 minutes until it turns golden brown and emits a nutty aroma.",
        "Slowly pour in the warm water or milk while whisking vigorously to prevent any lumps from forming.",
        "Add the jaggery, turmeric, and cardamom powder.",
        "Simmer for another 2-3 minutes until it reaches a thick, pourable soup consistency. Feed it to the child warm, preferably right before bed."
      ],
      ageAdjustment: "For toddlers (12-24 months): Use warm water instead of milk if the cold has created heavy chest congestion, as dairy can sometimes make mucus feel thicker.",
      science: "Besan is nutrient-dense and provides immediate energy. Ghee coats the throat to relieve dry cough, and turmeric acts as an antiseptic. Feeding this warm helps clear nasal blockages."
    },
    preschool: {
      title: "Spiced Golden Turmeric Milk",
      desc: "Traditional Haldi-Doodh sweetened with honey. Contains curcumin and black pepper to help relieve coughs and bolster immunity.",
      prepTime: "3 mins",
      cookTime: "7 mins",
      servings: "1 cup",
      rating: "4.8",
      reviews: [
        { name: "Pooja D. (Mom of 3.5-year-old)", rating: "5★", text: "The honey and pepper combination works wonders. He slept peacefully without coughing.", date: "Yesterday", avatarClass: "" }
      ],
      ingredients: [
        "1 cup whole milk (or almond milk)",
        "1/4 teaspoon organic turmeric powder",
        "A tiny pinch of freshly ground black pepper",
        "1/4 teaspoon ghee",
        "1 teaspoon honey (added after cooling slightly)"
      ],
      steps: [
        "In a small saucepan, bring the milk to a gentle boil.",
        "Stir in the turmeric powder, black pepper, and ghee. Whisk well.",
        "Lower the heat and let it simmer for 3-4 minutes to activate the turmeric.",
        "Turn off the heat. Let the milk cool to a warm, drinkable temperature.",
        "Stir in the honey and serve right away."
      ],
      ageAdjustment: "For 2-4 years: Do not add honey to boiling milk, as it destroys its beneficial enzymes. The tiny pinch of pepper is crucial to help the body absorb the curcumin in turmeric.",
      science: "Curcumin, the active compound in turmeric, is a powerful antioxidant and anti-inflammatory agent. Black pepper contains piperine, which increases curcumin absorption by up to 2000%."
    }
  },

  // --- TUMMY TROUBLES ---
  stomach: {
    infant: {
      title: "Starch-Rich Rice Kanji",
      desc: "A watery, soothing rice gruel that is highly effective at settling an upset stomach and restoring fluids during loose motions.",
      prepTime: "5 mins",
      cookTime: "20 mins",
      servings: "1-2 small bowls",
      rating: "4.9",
      reviews: [
        { name: "Preeti S. (Mom of 9-month-old)", rating: "5★", text: "Super gentle on the gut. Restores fluids and settled my baby's loose motions in a day.", date: "4 days ago", avatarClass: "purple" }
      ],
      ingredients: [
        "2 tablespoons broken rice (washed)",
        "2 cups water",
        "A tiny pinch of roasted cumin powder (jeera)",
        "No salt for infants under 1 year"
      ],
      steps: [
        "Add washed rice and water into a pressure cooker or saucepan.",
        "Cook until the rice is overcooked and very soft (about 4-5 whistles in a pressure cooker).",
        "Strain the watery liquid (the kanji) into a cup, leaving behind the solid rice.",
        "Stir a tiny pinch of roasted cumin powder into the warm liquid. Feed in sips."
      ],
      ageAdjustment: "For infants (6-12 months): Feed only the strained starch water (kanji). Cumin powder helps relieve gas and colic pain. Do not add salt.",
      science: "Rice starch water is extremely easy to absorb and forms a soothing layer over the inflamed intestinal lining, helping stop diarrhea and dehydration."
    },
    toddler: {
      title: "Banana Sooji Halwa (No Dairy)",
      desc: "Mild, sweet, and comforting. Banana is rich in potassium to replace lost electrolytes, combined with roasted semolina which binds the stomach.",
      prepTime: "5 mins",
      cookTime: "10 mins",
      servings: "1-2 servings",
      rating: "4.7",
      reviews: [
        { name: "Shweta G. (Mom of 22-month-old)", rating: "4★", text: "Great recipe without milk. Safe for loose motions and my child loved the sweet banana flavor.", date: "1 week ago", avatarClass: "green" }
      ],
      ingredients: [
        "2 tablespoons sooji (semolina)",
        "1/2 ripe banana (mashed thoroughly)",
        "1 cup water",
        "1/2 teaspoon ghee",
        "A tiny pinch of cardamom powder"
      ],
      steps: [
        "Heat ghee in a pan. Add the sooji and roast on low heat for 3-4 minutes until it becomes fragrant (do not let it brown too much).",
        "Slowly add the water, stirring continuously to avoid lumps.",
        "Cook on low heat for 3 minutes until the sooji swells and absorbs the water.",
        "Stir in the thoroughly mashed banana and cardamom powder.",
        "Cook for 1 more minute until it forms a soft, pudding-like consistency. Serve warm."
      ],
      ageAdjustment: "For toddlers (12-24 months): Ensure the banana is completely ripe (with black spots) as unripe bananas can cause constipation. No milk is used to avoid stomach irritation.",
      science: "Bananas contain pectin, which helps bind runny stools, and potassium, which replenishes essential minerals lost during vomiting or diarrhea. Sooji provides easily digestible carbohydrates."
    },
    preschool: {
      title: "Cooling Pomegranate Curd Rice",
      desc: "Probiotic-rich curd rice to settle the gut, topped with gentle pomegranate juice or seeds to soothe inflammation.",
      prepTime: "10 mins",
      cookTime: "15 mins",
      servings: "2 servings",
      rating: "4.8",
      reviews: [
        { name: "Pooja V. (Mom of 3-year-old)", rating: "5★", text: "Probiotics really helped settle his diarrhea. Adding the pomegranate juice makes it look attractive too.", date: "Yesterday", avatarClass: "orange" }
      ],
      ingredients: [
        "1/2 cup rice (washed)",
        "1.5 cups water",
        "1/2 cup fresh, non-sour curd (yogurt)",
        "1/8 teaspoon salt",
        "2 tablespoons fresh pomegranate seeds (or 1 tbsp juice for sensitive tummies)"
      ],
      steps: [
        "Cook the rice with 1.5 cups of water until it is very soft and mushy.",
        "Mash the hot rice thoroughly with the back of a spoon. Let it cool to room temperature.",
        "Once cooled, add the yogurt and salt. Mix well until it forms a creamy consistency.",
        "Gently fold in fresh pomegranate seeds or drizzle pomegranate juice over the top. Serve cool."
      ],
      ageAdjustment: "For 2-4 years: Never add curd to hot rice, as it kills the active probiotics. If the child is recovering from vomiting, serve very small spoonfuls.",
      science: "Yogurt contains live active cultures (lactobacillus) that restore healthy gut flora. Pomegranate is a traditional astringent that helps reduce intestinal inflammation and diarrhea."
    }
  },

  // --- SORE THROAT / FATIGUE ---
  throat: {
    infant: {
      title: "Creamy Carrot & Sweet Potato Puree",
      desc: "Naturally sweet, smooth, and easy to swallow. Packed with Vitamin A to help repair throat membranes.",
      prepTime: "10 mins",
      cookTime: "15 mins",
      servings: "1-2 small servings",
      rating: "4.8",
      reviews: [
        { name: "Ridhi S. (Mom of 8-month-old)", rating: "5★", text: "Super smooth, sweet carrot flavor. My teething baby with a sore throat ate it without crying.", date: "6 days ago", avatarClass: "purple" }
      ],
      ingredients: [
        "1/2 medium carrot (peeled & sliced)",
        "1/2 medium sweet potato (peeled & cubed)",
        "1 cup water",
        "1/4 teaspoon ghee",
        "A pinch of cumin powder"
      ],
      steps: [
        "Steam the carrot slices and sweet potato cubes with water in a cooker for 2 whistles until fully tender.",
        "Let it cool down slightly.",
        "Transfer to a blender and puree until completely smooth and creamy with no lumps.",
        "Warm the ghee, add a pinch of cumin, and stir it into the puree. Serve lukewarm."
      ],
      ageAdjustment: "For infants (6-12 months): Keep the consistency very smooth. The natural sweetness of carrots and sweet potatoes is highly appealing when appetite is low.",
      science: "Carrots and sweet potatoes are loaded with beta-carotene (Vitamin A), which is crucial for maintaining and repairing the mucosal linings of a sore throat and airway."
    },
    toddler: {
      title: "Warm Ragi Malt Porridge",
      desc: "Ragi (finger millet) is highly nutrient-dense. This warm, smooth drink is easy on the throat and provides substantial energy when the child refuses solid foods.",
      prepTime: "5 mins",
      cookTime: "10 mins",
      servings: "1 cup",
      rating: "4.9",
      reviews: [
        { name: "Jasmine T. (Mom of 14-month-old)", rating: "5★", text: "Ragi malt is my go-to! It's so filling and easy to feed through a straw cup when they are cranky.", date: "2 days ago", avatarClass: "green" }
      ],
      ingredients: [
        "1 tablespoon ragi flour",
        "1 cup water (or half water, half milk)",
        "1 teaspoon jaggery powder",
        "A tiny pinch of cardamom powder",
        "1/4 teaspoon ghee"
      ],
      steps: [
        "In a small bowl, mix the ragi flour with 3 tablespoons of room-temperature water. Stir well to ensure there are no lumps.",
        "Bring the remaining water/milk to a boil in a saucepan.",
        "Lower the heat and slowly pour in the ragi mixture while stirring continuously.",
        "Cook on low-medium heat for 5-6 minutes, stirring constantly as ragi thickens quickly.",
        "Add the jaggery, cardamom, and ghee. Stir well, cook for 1 minute, and turn off heat. Serve lukewarm."
      ],
      ageAdjustment: "For toddlers (12-24 months): Keep the consistency pourable so they can sip it directly from a cup or straw, which is easier than spoon-feeding when they are irritable.",
      science: "Ragi is exceptionally rich in calcium, iron, and dietary fiber. It is a slow-burning carb that provides sustained energy to a weak child, and its warm, smooth texture comforts the throat."
    },
    preschool: {
      title: "Warm Almond-Oats Shorba",
      desc: "A rich, creamy, and soothing oat soup cooked with ground almonds. High in energy and very soothing for painful swallowing.",
      prepTime: "5 mins",
      cookTime: "12 mins",
      servings: "2 servings",
      rating: "4.8",
      reviews: [
        { name: "Shreya H. (Mom of 3-year-old)", rating: "5★", text: "Creamy, smooth shorba! My kid drank it warm and it coated his throat nicely. Very nourishing.", date: "3 days ago", avatarClass: "" }
      ],
      ingredients: [
        "3 tablespoons rolled oats (ground or powdered)",
        "1.5 tablespoons almond powder (blanched & skinless)",
        "2 cups water or milk",
        "1/2 teaspoon ghee",
        "A pinch of cardamom powder",
        "1 teaspoon honey or jaggery"
      ],
      steps: [
        "Heat ghee in a saucepan. Add the powdered oats and saute on low heat for 2 minutes.",
        "Add the almond powder and mix.",
        "Slowly pour in the water/milk while whisking to avoid lumps.",
        "Bring to a gentle boil, then simmer on low heat for 5 minutes until creamy.",
        "Add cardamom powder. Let it cool slightly, then stir in honey/jaggery. Serve warm."
      ],
      ageAdjustment: "For 2-4 years: You can blend it after cooking if the child wants it completely smooth. Almonds should be skinless to avoid throat tickling.",
      science: "Oats contain beta-glucans which boost immune function, while blanched almonds provide healthy fats and proteins to rebuild strength when appetite is poor. Ghee coats the throat."
    }
  },

  // --- CONSTIPATION & BLOATING ---
  constipation: {
    infant: {
      title: "Soothing Pear & Prune Puree",
      desc: "Laxative-rich and high in dietary fiber. Prunes and pears contain sorbitol, which naturally draws water into the colon, relieving dry bowels.",
      prepTime: "10 mins",
      cookTime: "10 mins",
      servings: "1-2 small servings",
      rating: "4.9",
      reviews: [
        { name: "Rashi G. (Mom of 10-month-old)", rating: "5★", text: "This worked in just a few hours! Highly recommend pear-prune mash for baby constipation.", date: "2 days ago", avatarClass: "orange" }
      ],
      ingredients: [
        "1 small soft ripe pear (peeled & cored)",
        "2 dried prunes (pitted)",
        "1/2 cup water"
      ],
      steps: [
        "Chop the pear into small pieces.",
        "Boil the prunes and pear pieces in water in a small pan for 8-10 minutes on a low flame until soft.",
        "Cool slightly, then blend in a mixer or mash with a fork to form a silky, smooth puree. Feed lukewarm."
      ],
      ageAdjustment: "For infants (6-12 months): Ensure prunes are completely pitted. Do not add any sweeteners; prunes are naturally very sweet.",
      science: "Prunes are rich in sorbitol, a sugar alcohol that acts as a natural laxative. Pears are high in pectin, which helps soften stools and ease passage."
    },
    toddler: {
      title: "Mashed Papaya & Cumin Cup",
      desc: "A soft, easy-to-digest bowl of fresh papaya, sprinkled with digestive cumin. Papaya contains digestive enzymes that speed up intestinal clearing.",
      prepTime: "5 mins",
      cookTime: "0 mins",
      servings: "1 serving",
      rating: "4.7",
      reviews: [
        { name: "Lata D. (Mom of 18-month-old)", rating: "5★", text: "My toddler loved it. Papaya always helps him pass motion easily, and the cumin stops gas.", date: "4 days ago", avatarClass: "green" }
      ],
      ingredients: [
        "1/2 cup ripe orange papaya (peeled & seeded)",
        "A tiny pinch of roasted cumin powder",
        "A drop of lime juice"
      ],
      steps: [
        "Ensure all black seeds are removed from the papaya.",
        "Mash the papaya pieces thoroughly using a fork until it is soft and paste-like.",
        "Sprinkle a tiny pinch of roasted cumin powder and a drop of fresh lime juice. Mix well and serve immediately."
      ],
      ageAdjustment: "For toddlers (12-24 months): Make sure the papaya is completely ripe and soft. Do not serve large chunks to prevent choking.",
      science: "Papaya contains papain, a proteolytic enzyme that breaks down proteins and relieves bloating. Cumin powder relieves gas associated with backing up of stools."
    },
    preschool: {
      title: "Warm Oats & Chia Seed Porridge",
      desc: "A fiber-loaded, hydrating porridge. Oats provide soluble fibers, while chia seeds expand in the gut to bulk and lubricate stools.",
      prepTime: "5 mins",
      cookTime: "8 mins",
      servings: "1-2 servings",
      rating: "4.8",
      reviews: [
        { name: "Neha P. (Mom of 3-year-old)", rating: "4★", text: "Great fiber boost. Chia seeds really helped make bowel movements regular for my son.", date: "Yesterday", avatarClass: "purple" }
      ],
      ingredients: [
        "3 tablespoons rolled oats",
        "1/2 teaspoon chia seeds (soaked in water for 15 mins)",
        "1.5 cups water or milk",
        "1 teaspoon jaggery or honey"
      ],
      steps: [
        "Bring the water/milk to a boil in a saucepan. Add the oats.",
        "Cook on medium heat for 5-6 minutes, stirring frequently until soft.",
        "Stir in the pre-soaked chia seeds (they should look like gelatinous beads).",
        "Remove from heat, mix in jaggery/honey, and serve warm."
      ],
      ageAdjustment: "For 2-4 years: Always soak chia seeds before adding them. Dry chia seeds can absorb fluid inside the throat and present a swallowing hazard.",
      science: "Oats are rich in beta-glucan fiber, which holds water in the gut. Chia seeds absorb up to 12 times their weight in water, acting as a lubricant to ease constipation."
    }
  },

  // --- TEETHING / MOUTH ULCERS ---
  teething: {
    infant: {
      title: "Frozen Watermelon-Coconut Slush",
      desc: "A cool, soothing, and hydrating slush. Cold temperatures naturally numb sore gums, while coconut milk provides a protective layer.",
      prepTime: "10 mins",
      cookTime: "0 mins",
      servings: "1 serving",
      rating: "4.9",
      reviews: [
        { name: "Mini A. (Mom of 9-month-old)", rating: "5★", text: "A lifesaver during teething! The cold slush really numbed her sore red gums, and she sucked it up instantly.", date: "Yesterday", avatarClass: "" }
      ],
      ingredients: [
        "1/2 cup fresh seedless watermelon cubes",
        "2 tablespoons fresh thick coconut milk"
      ],
      steps: [
        "Puree the watermelon cubes in a blender and strain to ensure no stray seeds remain.",
        "Mix in the thick coconut milk.",
        "Pour the mixture into a shallow steel plate and freeze for 1 hour until semi-solid (slush consistency).",
        "Scrape with a spoon and feed to the teething baby lukewarm/cool. Do not make it rock hard."
      ],
      ageAdjustment: "For infants (6-12 months): Double check for seeds. Keep it in a slushy, melt-in-mouth state. Do not offer large solid ice chunks.",
      science: "Cold temperatures cause mild vasoconstriction, which reduces swelling and numbs pain in teething gums. Coconut milk contains lauric acid, which has mild antimicrobial actions."
    },
    toddler: {
      title: "Sweet Cardamom Curd Lassi",
      desc: "A cooling, probiotic-rich lassi. The smooth, cold texture coats raw mouth ulcers, providing immediate relief from burning sensations.",
      prepTime: "5 mins",
      cookTime: "0 mins",
      servings: "1 cup",
      rating: "4.8",
      reviews: [
        { name: "Tanya M. (Mom of 2-year-old)", rating: "5★", text: "My toddler had painful mouth ulcers and refused all food. This lassi was soothing and kept him hydrated.", date: "3 days ago", avatarClass: "purple" }
      ],
      ingredients: [
        "1/2 cup fresh sweet curd (not sour)",
        "1/4 cup chilled water",
        "1 teaspoon sugar or jaggery",
        "A pinch of cardamom powder (elaichi)"
      ],
      steps: [
        "In a blender or using a hand whisk, blend the curd, chilled water, sugar, and cardamom powder together.",
        "Whisk until frothy and smooth. Serve chilled in a cup with a straw."
      ],
      ageAdjustment: "For toddlers (12-24 months): Ensure the curd is fully sweet and fresh. Sour curd contains lactic acid which can sting mouth ulcers.",
      science: "Curd is a natural coolant that helps lower body heat (associated with ulcers). Cardamom reduces oral inflammation and freshens the mouth."
    },
    preschool: {
      title: "Creamy Cardamom Mashed Paneer",
      desc: "A soft, no-chew, and calorie-dense dessert. Provides highly absorbable protein to children who refuse to eat solid food due to mouth pain.",
      prepTime: "5 mins",
      cookTime: "0 mins",
      servings: "1-2 servings",
      rating: "4.9",
      reviews: [
        { name: "Priti G. (Mom of 3-year-old)", rating: "5★", text: "So soft and high in protein! He didn't have to chew it at all, and it kept his energy up during teething.", date: "5 days ago", avatarClass: "orange" }
      ],
      ingredients: [
        "1/2 cup fresh soft cottage cheese (paneer)",
        "1 teaspoon honey or jaggery powder",
        "A tiny pinch of cardamom powder",
        "1 tablespoon milk (to soften)"
      ],
      steps: [
        "Crumble the paneer thoroughly using clean hands.",
        "Add the honey/jaggery, cardamom powder, and milk.",
        "Mash vigorously with a spoon or blend in a mixer for 1 minute until it forms a smooth, whipped, whipped-cream consistency. Serve cool."
      ],
      ageAdjustment: "For 2-4 years: Use fresh homemade paneer if possible, as it is much softer than store-bought. Cardamom adds flavor without throat-tickling spice.",
      science: "Paneer is rich in casein protein and calcium, helping rebuild oral tissues. Cardamom acts as an antiseptic, and the soft whipped texture requires zero chewing."
    }
  },

  // --- VOMITING & NAUSEA ---
  vomiting: {
    infant: {
      title: "Clear Apple Starch Water",
      desc: "Highly hydrating and easy to absorb. Strained apple water provides electrolytes and glucose to prevent dehydration without burdening the stomach.",
      prepTime: "5 mins",
      cookTime: "10 mins",
      servings: "1-2 small servings",
      rating: "4.9",
      reviews: [
        { name: "Megha S. (Mom of 10-month-old)", rating: "5★", text: "After two vomiting episodes, my baby couldn't keep anything down. This apple water worked like a charm.", date: "3 days ago", avatarClass: "green" }
      ],
      ingredients: [
        "1/2 sweet red apple (peeled & cored)",
        "1.5 cups water",
        "A microscopic pinch of salt"
      ],
      steps: [
        "Chop the peeled apple into tiny bits.",
        "Boil the apple in 1.5 cups of water for 10 minutes until the water reduces slightly and absorbs the apple juices.",
        "Strain the liquid completely through a fine mesh, discarding the pulp.",
        "Let the clear water cool to room temperature. Feed in small sips (1-2 teaspoons every 15 minutes)."
      ],
      ageAdjustment: "For infants (6-12 months): Do not add sugar. Straining the pulp is critical because fibers require digestive work which can trigger vomiting.",
      science: "Apple water contains natural glucose and potassium. Small, frequent sips bypass the vomiting reflex, allowing the stomach to absorb fluids easily."
    },
    toddler: {
      title: "Salted Kanji Starch Broth",
      desc: "Watery rice starch containing salt. Helps replenish sodium lost during vomiting and forms a settling layer in the stomach.",
      prepTime: "5 mins",
      cookTime: "15 mins",
      servings: "1 cup",
      rating: "4.8",
      reviews: [
        { name: "Harpreet V. (Mom of 18-month-old)", rating: "5★", text: "Salted kanji is Dadi's gold standard. My toddler stopped vomiting and his energy came back after sipping this.", date: "1 week ago", avatarClass: "purple" }
      ],
      ingredients: [
        "2 tablespoons rice",
        "2.5 cups water",
        "1/8 teaspoon salt",
        "A dot of ghee (less than 1/8 tsp)"
      ],
      steps: [
        "Boil the rice with water and salt in a pressure cooker or pan until the rice is overcooked and watery.",
        "Mash the rice in the pot, then strain the watery broth (kanji) into a cup.",
        "Stir in a tiny dot of ghee. Feed warm in small sips."
      ],
      ageAdjustment: "For toddlers (12-24 months): Keep the broth extremely thin. Do not feed solid rice particles until the child has gone 4 hours without vomiting.",
      science: "Rice starch water is hypoallergenic and easily tolerated. The addition of salt helps restore the sodium balance in the body, keeping dehydration at bay."
    },
    preschool: {
      title: "Bland Tapioca (Sabudana) Soup",
      desc: "A completely bland, fat-free starch soup. Sabudana settles nausea and provides quick energy without triggering the stomach's gag reflex.",
      prepTime: "10 mins",
      cookTime: "15 mins",
      servings: "1 bowl",
      rating: "4.7",
      reviews: [
        { name: "Nisha T. (Mom of 3-year-old)", rating: "4★", text: "Very bland and gel-like. She was able to keep this down when she had a stomach bug.", date: "Yesterday", avatarClass: "" }
      ],
      ingredients: [
        "2 tablespoons sabudana (tapioca pearls, soaked for 1 hour)",
        "1.5 cups water",
        "A pinch of salt",
        "A pinch of roasted cumin powder"
      ],
      steps: [
        "Add the soaked sabudana and water to a pan.",
        "Boil on medium heat, stirring continuously, until the tapioca pearls turn completely translucent and transparent.",
        "Add salt and a tiny pinch of cumin powder.",
        "Allow it to cool to lukewarm. The soup will have a thin, gel-like texture. Feed in small spoonfuls."
      ],
      ageAdjustment: "For 2-4 years: Make sure the pearls are completely transparent and soft (raw centers can cause stomach aches). Keep spices microscopic.",
      science: "Tapioca is pure starch and holds zero fats or fibers, making it the easiest carbohydrate for a nauseated stomach to process and turn into immediate energy."
    }
  },

  // --- COLIC & GAS ---
  colic: {
    infant: {
      title: "Saunf-Jeera Warm Infusion",
      desc: "A mild, warm herbal tea. Fennel and cumin contain natural carminative oils that relax the intestinal muscles, helping release trapped gas.",
      prepTime: "5 mins",
      cookTime: "8 mins",
      servings: "1-2 small cups",
      rating: "4.9",
      reviews: [
        { name: "Radhika K. (Mom of 6-month-old)", rating: "5★", text: "My baby cried for hours from colic. Gave her 2 teaspoons of this warm saunf water and she fell asleep in 10 minutes.", date: "2 days ago", avatarClass: "orange" }
      ],
      ingredients: [
        "1/4 teaspoon fennel seeds (saunf)",
        "1/4 teaspoon cumin seeds (jeera)",
        "1.5 cups water"
      ],
      steps: [
        "Add saunf, jeera, and water to a small pan.",
        "Bring to a boil, then lower heat and simmer for 5-6 minutes until the water turns light yellow.",
        "Turn off heat and let it cool until lukewarm.",
        "Strain thoroughly. Feed 2-3 teaspoons to the baby using a dropper or spoon."
      ],
      ageAdjustment: "For infants (6-12 months): Serve plain and lukewarm. Never add honey, sugar, or salt. Limit to 3-4 teaspoons per gas episode.",
      science: "Fennel contains anethole, which acts as an antispasmodic to relax stomach linings. Cumin reduces gas bubbles and speeds up colic clearance."
    },
    toddler: {
      title: "Mashed Potato with Ajwain & Hing",
      desc: "Warm mashed potato tempered with carom seeds and asafoetida. An excellent anti-flatulence food for toddlers with bloated tummies.",
      prepTime: "10 mins",
      cookTime: "5 mins",
      servings: "1 bowl",
      rating: "4.8",
      reviews: [
        { name: "Pooja P. (Mom of 22-month-old)", rating: "5★", text: "The hing and ajwain work so quickly. Mashed potato is easy to feed and digests well.", date: "Yesterday", avatarClass: "green" }
      ],
      ingredients: [
        "1 medium potato (boiled and peeled)",
        "1/4 teaspoon ghee",
        "A tiny pinch of ajwain (carom seeds)",
        "A tiny pinch of hing (asafoetida)",
        "A pinch of salt"
      ],
      steps: [
        "Mash the boiled potato completely until there are zero lumps.",
        "In a tiny ladle, heat the ghee. Add the ajwain and hing. Let them sizzle for 5 seconds.",
        "Pour the hot tempered ghee over the mashed potato.",
        "Add salt, mix thoroughly, and feed to the toddler while warm."
      ],
      ageAdjustment: "For toddlers (12-24 months): Ensure the potato is mashed completely smooth. Use very little ghee so it remains light.",
      science: "Ajwain contains thymol, which has strong carminative properties that help expel gas. Hing is a traditional Indian anti-flatulent that prevents gas build-up."
    },
    preschool: {
      title: "Warm Mint-Fennel Dal Shorba",
      desc: "A comforting yellow lentil soup simmered with fresh mint and crushed fennel seeds to soothe intestinal spasms and bloating.",
      prepTime: "10 mins",
      cookTime: "15 mins",
      servings: "2 servings",
      rating: "4.8",
      reviews: [
        { name: "Sonali N. (Mom of 3-year-old)", rating: "5★", text: "Fennel shorba is very aromatic. My son drank a cup of it and got relief from his tummy ache.", date: "4 days ago", avatarClass: "purple" }
      ],
      ingredients: [
        "3 tablespoons yellow moong dal (washed)",
        "1/4 teaspoon crushed fennel seeds",
        "4-5 fresh mint leaves (pudina)",
        "2 cups water",
        "1/4 teaspoon ghee",
        "A pinch of turmeric and salt"
      ],
      steps: [
        "Pressure cook the moong dal with water, turmeric, salt, and mint leaves for 3 whistles.",
        "Whisk the cooked dal until completely smooth.",
        "Heat ghee in a ladle, add the crushed fennel seeds, and pour it into the dal shorba.",
        "Simmer for 2 minutes, strain to remove any mint leaf fibers, and serve warm."
      ],
      ageAdjustment: "For 2-4 years: Strain the shorba if your child is sensitive to bits of leaves or seeds. Feed warm.",
      science: "Mint contains menthol, which has a calming effect on the digestive tract muscles. Fennel prevents gas production and relieves abdominal cramping."
    }
  },

  // --- LOSS OF APPETITE ---
  appetite: {
    infant: {
      title: "Mild Cumin-Tomato Shorba",
      desc: "A tangy, clear tomato and lentil water seasoned with cumin. Instantly awakens sleeping taste buds and stimulates salivation.",
      prepTime: "5 mins",
      cookTime: "10 mins",
      servings: "1 bowl",
      rating: "4.8",
      reviews: [
        { name: "Divya N. (Mom of 9-month-old)", rating: "5★", text: "My baby refused all foods after recovery. This sour shorba really stimulated her appetite and she started eating again.", date: "3 days ago", avatarClass: "orange" }
      ],
      ingredients: [
        "1/2 ripe tomato (chopped)",
        "1 tablespoon yellow moong dal",
        "1.5 cups water",
        "A tiny pinch of turmeric",
        "A pinch of roasted cumin powder"
      ],
      steps: [
        "Boil the dal, chopped tomato, and turmeric in water for 10 minutes until mushy.",
        "Whisk the mixture thoroughly, then strain through a sieve to collect the clear, tangy liquid.",
        "Stir in the cumin powder and feed warm in small spoonfuls before the main feed."
      ],
      ageAdjustment: "For infants (6-12 months): Keep it completely fluid. Do not add salt or sugar. The natural tartness of the tomato stimulates saliva.",
      science: "The mild acidity of tomatoes combined with cumin triggers salivary glands and stimulates stomach acid secretion, which naturally sparks appetite."
    },
    toddler: {
      title: "Tangy Lemon & Coriander Poha",
      desc: "Light, fluffy beaten rice seasoned with coriander, cumin, and fresh lemon. The sour-savory flavor is highly appealing to children with flat taste buds.",
      prepTime: "10 mins",
      cookTime: "5 mins",
      servings: "1-2 servings",
      rating: "4.9",
      reviews: [
        { name: "Pooja K. (Mom of 2-year-old)", rating: "5★", text: "Light and tangy! The lemon flavor made it so tasty for him since his tongue was dry and bitter from illness.", date: "Yesterday", avatarClass: "green" }
      ],
      ingredients: [
        "3 tablespoons poha (beaten rice, washed & drained)",
        "1/2 teaspoon ghee",
        "A tiny pinch of mustard seeds",
        "A pinch of turmeric and cumin powder",
        "1 teaspoon fresh lemon juice",
        "1 tablespoon finely chopped fresh coriander leaves"
      ],
      steps: [
        "Wash the poha in a strainer and let it rest for 5 minutes to become soft.",
        "Heat ghee in a small pan, add mustard seeds and let them pop.",
        "Add the cumin powder, turmeric, and softened poha. Toss gently for 2 minutes on low heat.",
        "Remove from heat, drizzle fresh lemon juice and toss with coriander. Serve warm."
      ],
      ageAdjustment: "For toddlers (12-24 months): Ensure the poha is fully soft and moist (add a splash of water if dry). Do not add green chillies or hard peanuts.",
      science: "Lemon juice provides Vitamin C and citric acid, which cleanses the tongue palate and stimulates digestive secretions. Coriander acts as a natural digestion aid."
    },
    preschool: {
      title: "Apple-Amla Sweet & Sour Jam",
      desc: "A warm, sweet and tart relish made of Indian gooseberry (Amla) and sweet apple. High in vitamin C and digestive enzymes.",
      prepTime: "10 mins",
      cookTime: "12 mins",
      servings: "2-3 child-size portions",
      rating: "4.9",
      reviews: [
        { name: "Priya S. (Mom of 3.5-year-old)", rating: "5★", text: "The perfect sweet & sour chutney! Amla is usually so sour, but cooking it with apple makes it delicious. Really helped her appetite.", date: "4 days ago", avatarClass: "purple" }
      ],
      ingredients: [
        "1 amla (Indian gooseberry, deseeded)",
        "1/2 red apple (peeled & cored)",
        "1/2 cup water",
        "1.5 teaspoons jaggery powder",
        "A pinch of cardamom and ginger powder"
      ],
      steps: [
        "Steam the amla and apple slices in a small pressure cooker with 1/2 cup water for 2 whistles until fully soft.",
        "Mash them together into a smooth paste.",
        "Transfer to a pan, add jaggery, cardamom, and ginger powder.",
        "Cook on low heat for 3-4 minutes until it hits a jam-like chutney. Serve 1 teaspoon warm before meals."
      ],
      ageAdjustment: "For 2-4 years: Keep it smooth. The addition of ginger powder helps relieve nausea while jaggery masks the astringent taste of amla.",
      science: "Amla is one of the richest sources of Vitamin C and stimulates appetite and liver function. Ginger and cardamom activate digestive enzymes."
    }
  },

  // --- HEAT BOILS & RASHES ---
  rashes: {
    infant: {
      title: "Cooling Sago (Sabudana) Gruel",
      desc: "A completely cooling and hypoallergenic starch drink. Excellent for soothing body heat and calming skin rashes.",
      prepTime: "15 mins",
      cookTime: "12 mins",
      servings: "1-2 small bowls",
      rating: "4.7",
      reviews: [
        { name: "Kirti R. (Mom of 8-month-old)", rating: "5★", text: "My baby had severe summer heat boils. This sabudana gruel really helped cool down his system.", date: "Yesterday", avatarClass: "" }
      ],
      ingredients: [
        "1.5 tablespoons sabudana (tapioca pearls, soaked for 2 hours)",
        "1.5 cups water",
        "A tiny pinch of cardamom powder"
      ],
      steps: [
        "Add the soaked sabudana along with water in a pan.",
        "Boil on medium heat while stirring until the pearls are completely transparent and the liquid is thick and clear.",
        "Strain to get a smooth starch water, add a tiny pinch of cardamom, and cool. Serve at room temperature."
      ],
      ageAdjustment: "For infants (6-12 months): Keep it completely fluid and smooth. Do not add sweeteners. Serve cool, not hot.",
      science: "Tapioca is a traditional cooling starch in Ayurveda. It digests instantly without generating metabolic heat, helping lower overall body temperature."
    },
    toddler: {
      title: "Barley-Coconut Milk Soother",
      desc: "Cooked barley mashed with cooling, anti-inflammatory fresh coconut milk. Highly soothing for systemic heat and skin boils.",
      prepTime: "10 mins",
      cookTime: "20 mins",
      servings: "1-2 servings",
      rating: "4.8",
      reviews: [
        { name: "Megha P. (Mom of 15-month-old)", rating: "5★", text: "The coconut milk makes it so creamy and delicious. Her heat rashes cleared up in a few days.", date: "3 days ago", avatarClass: "orange" }
      ],
      ingredients: [
        "2 tablespoons pearl barley (washed & soaked)",
        "1.5 cups water",
        "3 tablespoons fresh coconut milk",
        "1/2 teaspoon jaggery"
      ],
      steps: [
        "Pressure cook the soaked barley in water for 4 whistles until extremely mushy.",
        "Mash the hot barley with a potato masher until paste-like, then let it cool to warm.",
        "Stir in the fresh coconut milk and jaggery. Serve at room temperature."
      ],
      ageAdjustment: "For toddlers (12-24 months): Ensure the barley is mashed completely so there is no choking risk. Use fresh coconut milk, not canned.",
      science: "Barley is a potent diuretic and cooling grain that cleanses toxins. Coconut milk contains anti-inflammatory lipids that soothe skin and tissues from the inside out."
    },
    preschool: {
      title: "Cooling Moong-Sattu Drink",
      desc: "A traditional cooling beverage made from roasted yellow moong flour, mint, and cumin. High in protein and hydration.",
      prepTime: "5 mins",
      cookTime: "0 mins",
      servings: "1 cup",
      rating: "4.9",
      reviews: [
        { name: "Anjali S. (Mom of 3-year-old)", rating: "5★", text: "Amazing drink for hot days! My toddler had heat boils and this cooling sattu drink was so refreshing.", date: "5 days ago", avatarClass: "purple" }
      ],
      ingredients: [
        "1.5 tablespoons roasted moong dal flour (moong sattu)",
        "1 cup cool water",
        "A pinch of roasted cumin powder",
        "3 fresh mint leaves (crushed)",
        "A tiny pinch of salt"
      ],
      steps: [
        "In a glass, mix the roasted moong flour with a few tablespoons of water and whisk into a smooth lump-free paste.",
        "Add the remaining water, cumin powder, crushed mint leaves, and salt.",
        "Whisk well, let it rest for 2 minutes to absorb the mint flavor, and serve cool."
      ],
      ageAdjustment: "For 2-4 years: Ensure the moong dal is thoroughly roasted before grinding to avoid gas. Serve cool but not ice-cold.",
      science: "Roasted moong flour is easy to digest and highly cooling. Mint and cumin act as heat-relieving agents, and the drink rapidly hydrates cells."
    }
  },

  // --- DIARRHEA ---
  diarrhea: {
    infant: {
      title: "Warm Rice & Moong Starch Pej",
      desc: "A traditional watery rice and lentil broth that is exceptionally gentle on inflamed baby intestines.",
      prepTime: "5 mins",
      cookTime: "15 mins",
      servings: "1-2 small bowls",
      rating: "4.8",
      reviews: [{ name: "Kiran R. (Mom of 7-month-old)", rating: "5★", text: "Stopped my baby's loose motions within half a day! Hydrating.", date: "2 days ago", avatarClass: "" }],
      ingredients: [
        "2 tablespoons broken rice (washed)",
        "1 tablespoon yellow moong dal (washed)",
        "3 cups water",
        "A pinch of roasted cumin powder"
      ],
      steps: [
        "Add washed rice, dal, and water to a small pressure cooker.",
        "Cook for 4 whistles until mushy and dissolved.",
        "Strain the thick liquid broth using a sieve, discarding solid grains for infants.",
        "Stir in cumin powder and serve warm in small sips."
      ],
      ageAdjustment: "For infants (6-12 months): Strictly exclude salt and sugar. Keep it thin, watery, and warm.",
      science: "Rice starch forms a protective lining on the intestinal walls, reducing the frequency of stools while cumin powder relieves digestive colic."
    },
    toddler: {
      title: "Dadi's Yogurt Curd Rice Mash",
      desc: "Creamy curd rice made with room-temperature, fresh yogurt, helping restore gut flora and soothing diarrhea.",
      prepTime: "5 mins",
      cookTime: "15 mins",
      servings: "1 bowl",
      rating: "4.9",
      reviews: [{ name: "Sonia G. (Mom of 16-month-old)", rating: "5★", text: "Probiotics really work! He loved the cool, creamy texture.", date: "Yesterday", avatarClass: "green" }],
      ingredients: [
        "1/4 cup rice",
        "1 cup water",
        "1/2 cup fresh sweet curd (not sour)",
        "A tiny pinch of salt",
        "A pinch of cumin powder"
      ],
      steps: [
        "Pressure cook the rice with water until very soft and mushy.",
        "Let the rice cool completely to room temperature.",
        "Whisk the curd and mix it with the mashed rice, salt, and cumin powder.",
        "Serve at room temperature."
      ],
      ageAdjustment: "For toddlers (12-24 months): Mash the rice completely. Do not add raw mustard seeds or curry leaves.",
      science: "Yogurt contains lactobacillus (probiotics) that fight off pathogens in the gut and restore a healthy microbiome."
    },
    preschool: {
      title: "Arrowroot Powder (Koova) Porridge",
      desc: "A traditional South Indian remedy for severe loose motions, made of pure arrowroot flour cooked in water.",
      prepTime: "5 mins",
      cookTime: "10 mins",
      servings: "1 bowl",
      rating: "4.9",
      reviews: [{ name: "Meera D. (Mom of 3-year-old)", rating: "5★", text: "Arrowroot works like magic. It completely stopped his diarrhea.", date: "3 days ago", avatarClass: "orange" }],
      ingredients: [
        "1.5 tablespoons arrowroot powder",
        "1.5 cups water",
        "1 teaspoon jaggery powder",
        "A pinch of cardamom powder"
      ],
      steps: [
        "In a bowl, mix arrowroot powder with 1/2 cup water until smooth.",
        "Boil the remaining 1 cup of water in a saucepan.",
        "Lower heat and pour the arrowroot slurry in while stirring continuously.",
        "Cook for 5 minutes until glossy and thick. Add jaggery and cardamom, then cool and serve."
      ],
      ageAdjustment: "For 2-4 years: Keep it slightly sweet with jaggery to encourage the child to eat it when weak.",
      science: "Arrowroot is a natural demulcent and bowel binder that reduces gastrointestinal irritation and firms up stools."
    }
  },

  // --- DEHYDRATION ---
  dehydration: {
    infant: {
      title: "Tender Coconut & Barley Water",
      desc: "An extremely hydrating drink combining cooling barley water and mineral-rich fresh coconut water.",
      prepTime: "5 mins",
      cookTime: "20 mins",
      servings: "1-2 cups",
      rating: "4.9",
      reviews: [{ name: "Anita R. (Mom of 11-month-old)", rating: "5★", text: "Excellent drink. Safe and keeps the hydration up during stomach bugs.", date: "Yesterday", avatarClass: "purple" }],
      ingredients: [
        "1.5 tablespoons pearl barley",
        "2 cups water",
        "1/2 cup fresh tender coconut water"
      ],
      steps: [
        "Boil barley in 2 cups of water for 20 minutes until the water reduces to 1 cup.",
        "Strain the barley water and let it cool completely.",
        "Mix the cooled barley water with tender coconut water.",
        "Serve in small sips throughout the day."
      ],
      ageAdjustment: "For infants (6-12 months): Do not add sugar or salt. Fresh coconut water contains natural sugars and electrolytes.",
      science: "Barley water provides light carbs, while coconut water is rich in potassium, sodium, and magnesium, mimicking natural ORS."
    },
    toddler: {
      title: "Fennel-Mint Whey Water (Paneer Water)",
      desc: "Clear whey water collected from fresh curdled milk, seasoned with cooling mint and digestive cumin.",
      prepTime: "5 mins",
      cookTime: "10 mins",
      servings: "1 cup",
      rating: "4.8",
      reviews: [{ name: "Jasmeet K. (Mom of 2-year-old)", rating: "5★", text: "Very easy to digest, and she liked the mint aroma. Kept her hydrated when she refused plain water.", date: "2 days ago", avatarClass: "" }],
      ingredients: [
        "1 cup whole milk",
        "1 teaspoon lemon juice",
        "A pinch of roasted cumin powder",
        "3 fresh mint leaves (crushed)"
      ],
      steps: [
        "Bring milk to a boil and add lemon juice to curdle it.",
        "Strain the curdled milk using a muslin cloth to collect the clear whey water.",
        "Add cumin powder and crushed mint to the warm whey water.",
        "Let it cool and serve in sips."
      ],
      ageAdjustment: "For toddlers (12-24 months): Whey water is extremely high in soluble lactalbumin protein and hydrates better than plain water.",
      science: "Whey water contains highly soluble milk proteins and natural electrolytes, which are very easy on a recovering gut."
    },
    preschool: {
      title: "Kokum-Jeera Hydrating Chaas",
      desc: "A refreshing, salty buttermilk drink seasoned with cooling cumin and kokum plum extract.",
      prepTime: "5 mins",
      cookTime: "0 mins",
      servings: "1 cup",
      rating: "4.9",
      reviews: [{ name: "Suresh P. (Dad of 3-year-old)", rating: "5★", text: "Super cooling drink. Sattu or chaas with kokum works best for hydration in summers.", date: "3 days ago", avatarClass: "green" }],
      ingredients: [
        "3 tablespoons fresh yogurt",
        "1 cup cool water",
        "1/2 teaspoon kokum extract (sour plum)",
        "A pinch of roasted cumin powder",
        "A tiny pinch of salt"
      ],
      steps: [
        "In a blender or pitcher, combine yogurt, cool water, cumin powder, and salt.",
        "Whisk or blend until frothy.",
        "Stir in the kokum extract for a tangy kick.",
        "Serve cool."
      ],
      ageAdjustment: "For 2-4 years: Keep it light and refreshing. Sour kokum cools down the body and stimulates thirst.",
      science: "Buttermilk contains electrolytes and water molecules bound to proteins, which are retained in the body longer than plain water."
    }
  },

  // --- IRON DEFICIENCY ANEMIA ---
  anemia: {
    infant: {
      title: "Iron-Rich Beetroot & Carrot Mash",
      desc: "A sweet, colorful, and iron-packed steamed puree of beetroot and carrots, finished with ghee.",
      prepTime: "10 mins",
      cookTime: "15 mins",
      servings: "1-2 small servings",
      rating: "4.8",
      reviews: [{ name: "Heena T. (Mom of 9-month-old)", rating: "5★", text: "The bright pink color is so attractive. My baby loves the natural sweetness.", date: "4 days ago", avatarClass: "orange" }],
      ingredients: [
        "1/2 medium carrot (peeled)",
        "1/4 beetroot (peeled)",
        "1 cup water",
        "1/4 teaspoon cow's ghee"
      ],
      steps: [
        "Chop the beetroot and carrot into small cubes.",
        "Steam or pressure cook with water for 3 whistles until very soft.",
        "Puree in a blender until silky smooth.",
        "Stir in cow's ghee and serve warm."
      ],
      ageAdjustment: "For infants (6-12 months): Do not add salt. Feed a few spoonfuls daily to boost iron absorption.",
      science: "Beetroot is rich in non-heme iron and folate, while carrots provide vitamin A, which helps the body utilize iron effectively."
    },
    toddler: {
      title: "Dates & Ragi Iron-Rich Porridge",
      desc: "A rich porridge combining iron-dense finger millet (ragi) with mashed sweet dates.",
      prepTime: "5 mins",
      cookTime: "12 mins",
      servings: "1 cup",
      rating: "4.9",
      reviews: [{ name: "Raksha G. (Mom of 18-month-old)", rating: "5★", text: "Dates add a great sweet taste naturally. Perfect breakfast for low iron levels.", date: "2 days ago", avatarClass: "" }],
      ingredients: [
        "1.5 tablespoons ragi flour",
        "2 soft seedless dates (chopped)",
        "1 cup water or milk",
        "1/4 teaspoon ghee"
      ],
      steps: [
        "Boil the dates in 1/2 cup water until soft, then mash into a paste.",
        "Dissolve ragi flour in 1/2 cup water/milk, stirring out all lumps.",
        "Cook the ragi mixture on low heat for 6 minutes until thick.",
        "Mix in the date paste and ghee, cook for 1 minute, and serve lukewarm."
      ],
      ageAdjustment: "For toddlers (12-24 months): Dates act as a natural sweetener, replacing refined sugar while adding essential iron.",
      science: "Ragi is one of the richest millet sources of iron. Combining it with dates multiplies the iron content, fighting anemia."
    },
    preschool: {
      title: "Iron-Boost Sesame Badam Sheera",
      desc: "A high-iron dessert made of semolina, almond flour, and dry-roasted black sesame seeds.",
      prepTime: "10 mins",
      cookTime: "15 mins",
      servings: "2 servings",
      rating: "4.9",
      reviews: [{ name: "Prerna V. (Mom of 3.5-year-old)", rating: "5★", text: "My daughter loves this sheera. Sesame and jaggery makes it so rich in iron.", date: "1 week ago", avatarClass: "purple" }],
      ingredients: [
        "2 tablespoons semolina (sooji)",
        "1 tablespoon black sesame seeds (dry-roasted & powdered)",
        "1.5 cups milk",
        "1 tablespoon jaggery",
        "1/2 teaspoon ghee",
        "5 almonds (powdered)"
      ],
      steps: [
        "Heat ghee in a pan, roast sooji for 3 minutes until aromatic.",
        "Add sesame powder and almond powder, stir for 1 minute.",
        "Slowly pour in milk while whisking to avoid lumps.",
        "Add jaggery, cook on low heat for 4 minutes until it forms a soft sheera consistency."
      ],
      ageAdjustment: "For 2-4 years: Sesame seeds are exceptionally rich in iron. Ensure they are fully powdered to avoid choking.",
      science: "Black sesame contains high concentration of iron and zinc. Jaggery is another rich iron source that activates hemoglobin production."
    }
  },

  // --- UNDERWEIGHT CHILD ---
  underweight: {
    infant: {
      title: "Rich Banana-Ragi Ghee Porridge",
      desc: "A high-calorie, nutrient-dense weaning food for infants containing finger millet, banana, and ghee.",
      prepTime: "5 mins",
      cookTime: "10 mins",
      servings: "1 bowl",
      rating: "4.9",
      reviews: [{ name: "Swati M. (Mom of 9-month-old)", rating: "5★", text: "Very filling and helped my baby gain weight steadily.", date: "4 days ago", avatarClass: "green" }],
      ingredients: [
        "1.5 tablespoons ragi flour",
        "1/2 ripe banana (mashed)",
        "1 cup water",
        "1/2 teaspoon ghee"
      ],
      steps: [
        "Mix ragi flour in water to make a smooth lump-free paste.",
        "Cook on low heat, stirring continuously for 6 minutes.",
        "Add the thoroughly mashed banana and ghee.",
        "Cook for 1 more minute until thick and serve warm."
      ],
      ageAdjustment: "For infants (6-12 months): The ghee adds healthy calorie density. Keep the porridge thick but smooth.",
      science: "Ragi is high in protein and calcium, while banana and ghee provide dense calories and healthy fats to support healthy weight gain."
    },
    toddler: {
      title: "Sweet Potato & Paneer Ghee Mash",
      desc: "A calorie-dense soft mash of sweet potatoes, fresh grated paneer, and cow's ghee.",
      prepTime: "10 mins",
      cookTime: "5 mins",
      servings: "1 bowl",
      rating: "4.8",
      reviews: [{ name: "Nisha D. (Mom of 15-month-old)", rating: "5★", text: "Super creamy. The paneer and sweet potato blend is delicious.", date: "Yesterday", avatarClass: "orange" }],
      ingredients: [
        "1/2 cup sweet potato (boiled & peeled)",
        "2 tablespoons fresh paneer (grated)",
        "1/2 teaspoon ghee",
        "A pinch of cardamom powder"
      ],
      steps: [
        "Mash the sweet potato and grated paneer together thoroughly.",
        "Heat ghee in a pan, add the sweet potato and paneer mix.",
        "Add cardamom powder and warm through for 2 minutes on low heat.",
        "Serve lukewarm."
      ],
      ageAdjustment: "For toddlers (12-24 months): Mash it soft. The combination of dairy fat and root veggie starch is highly palatable.",
      science: "Sweet potato provides complex carbs, paneer provides casein protein, and ghee delivers energy-dense medium chain triglycerides."
    },
    preschool: {
      title: "Almond & Makhana Nutri-Kheer",
      desc: "A rich pudding containing roasted foxnut (makhana) powder, almond flour, and whole milk.",
      prepTime: "10 mins",
      cookTime: "15 mins",
      servings: "2 servings",
      rating: "4.9",
      reviews: [{ name: "Garima K. (Mom of 3-year-old)", rating: "5★", text: "Healthy fats in makhana and badam make this a top weight-gain snack.", date: "5 days ago", avatarClass: "" }],
      ingredients: [
        "1/2 cup makhana (foxnuts)",
        "1 cup whole milk",
        "1 tablespoon almond powder",
        "1 tablespoon jaggery",
        "1/2 teaspoon ghee"
      ],
      steps: [
        "Dry roast makhana in ghee until crunchy, then grind into a coarse powder.",
        "Boil milk in a saucepan, add the makhana powder and almond powder.",
        "Simmer on low heat for 8 minutes until thick.",
        "Stir in jaggery, let it dissolve, and serve warm."
      ],
      ageAdjustment: "For 2-4 years: Makhana and almonds are powerhouses of healthy fats and protein. Serve warm as an evening snack.",
      science: "Foxnuts (Makhana) are rich in protein and low-GI carbs, which combined with whole milk and almonds, promote healthy muscle mass development."
    }
  },

  // --- POOR WEIGHT GAIN ---
  poorweight: {
    infant: {
      title: "Sago-Banana Mash in Coconut Milk",
      desc: "A creamy, dairy-free mash of cooked tapioca pearls and banana folded into fresh coconut milk.",
      prepTime: "15 mins",
      cookTime: "12 mins",
      servings: "1-2 small bowls",
      rating: "4.7",
      reviews: [{ name: "Priti L. (Mom of 10-month-old)", rating: "5★", text: "Coconut milk is so rich. Easy to digest and baby finished it all.", date: "Yesterday", avatarClass: "purple" }],
      ingredients: [
        "2 tablespoons sabudana (soaked)",
        "1 cup water",
        "3 tablespoons coconut milk",
        "1/2 ripe banana (mashed)"
      ],
      steps: [
        "Boil soaked sabudana in water until transparent.",
        "Mash the cooked pearls, then stir in mashed banana and coconut milk.",
        "Mix thoroughly and serve lukewarm."
      ],
      ageAdjustment: "For infants (6-12 months): Coconut milk provides healthy lauric acid fats, aiding weight gain without dairy allergens.",
      science: "Tapioca starch digests quickly, providing immediate energy, while coconut milk provides fats similar to breastmilk."
    },
    toddler: {
      title: "Potato-Paneer Double Ghee Mash",
      desc: "A simple, comforting, and high-calorie mash of potatoes, grated paneer, and a double serving of cow's ghee.",
      prepTime: "10 mins",
      cookTime: "5 mins",
      servings: "1 bowl",
      rating: "4.8",
      reviews: [{ name: "Suman H. (Mom of 2-year-old)", rating: "5★", text: "Classic home food. Paneer and potato is a great calorie booster.", date: "3 days ago", avatarClass: "" }],
      ingredients: [
        "1 medium potato (boiled)",
        "2 tablespoons paneer (mashed)",
        "1 teaspoon ghee",
        "A pinch of salt & pepper"
      ],
      steps: [
        "Mash the potato and paneer together until completely smooth.",
        "Heat ghee in a pan, add the mash, and stir for 2 minutes.",
        "Add salt, pepper, and mix well.",
        "Serve warm with another drop of ghee on top."
      ],
      ageAdjustment: "For toddlers (12-24 months): High-fat and high-carb density stimulates appetite and supports healthy weight.",
      science: "Potato starch combined with paneer protein and ghee creates a highly calorie-dense, easy-to-digest mass."
    },
    preschool: {
      title: "Sattu & Peanut Butter Nutri-Sheera",
      desc: "A rich sheera made of roasted chickpea flour (sattu), peanut butter, and jaggery.",
      prepTime: "10 mins",
      cookTime: "12 mins",
      servings: "2 servings",
      rating: "4.9",
      reviews: [{ name: "Deepak S. (Dad of 3-year-old)", rating: "5★", text: "Protein and calorie dense. Sattu is amazing for kids' muscle growth.", date: "Yesterday", avatarClass: "green" }],
      ingredients: [
        "2 tablespoons sattu flour (roasted gram)",
        "1 tablespoon peanut butter (creamy)",
        "1.5 cups milk",
        "1 tablespoon jaggery",
        "1/2 teaspoon ghee"
      ],
      steps: [
        "In a pan, warm the ghee, add sattu flour and roast for 1 minute.",
        "Add warm milk slowly while whisking to prevent lumps.",
        "Add the peanut butter and jaggery, cooking on low heat for 3 minutes until smooth.",
        "Serve warm."
      ],
      ageAdjustment: "For 2-4 years: Double check for peanut allergy. Sattu and peanut butter together offer massive protein and calories.",
      science: "Peanut butter contains monounsaturated fats, and sattu is high in plant protein and dietary fibers, assisting steady weight gain."
    }
  },

  // --- PROTEIN-ENERGY MALNUTRITION ---
  pem: {
    infant: {
      title: "High-Protein Sprouted Moong Puree",
      desc: "A highly nutritious puree of sprouted yellow moong dal, rich in amino acids and easy to digest.",
      prepTime: "10 mins",
      cookTime: "15 mins",
      servings: "1-2 small servings",
      rating: "4.9",
      reviews: [{ name: "Tripti P. (Mom of 11-month-old)", rating: "5★", text: "Sprouted dal is much lighter on the tummy. Highly recommend.", date: "Yesterday", avatarClass: "orange" }],
      ingredients: [
        "2 tablespoons sprouted yellow moong dal",
        "1 cup water",
        "1/4 teaspoon ghee",
        "A pinch of turmeric"
      ],
      steps: [
        "Wash sprouted moong dal thoroughly.",
        "Pressure cook with water and turmeric for 4 whistles until very soft.",
        "Blend into a very smooth, fine puree.",
        "Stir in ghee and serve lukewarm."
      ],
      ageAdjustment: "For infants (6-12 months): Sprouting breaks down complex starches, making the protein twice as easy to absorb.",
      science: "Sprouted lentils have increased bioavailability of protein, iron, and zinc, helping combat nutritional malnutrition."
    },
    toddler: {
      title: "Paneer-Dal High-Calorie Khichdi",
      desc: "A protein-heavy khichdi combining rice, yellow lentils, and grated cottage cheese.",
      prepTime: "10 mins",
      cookTime: "20 mins",
      servings: "2 servings",
      rating: "4.8",
      reviews: [{ name: "Rahul J. (Dad of 20-month-old)", rating: "5★", text: "Paneer in khichdi is an excellent way to feed protein to toddlers.", date: "5 days ago", avatarClass: "purple" }],
      ingredients: [
        "2 tablespoons rice",
        "2 tablespoons moong dal",
        "3 tablespoons fresh paneer (cubed)",
        "2 cups water",
        "1/2 teaspoon ghee",
        "A pinch of turmeric & salt"
      ],
      steps: [
        "Cook rice and dal in a pressure cooker with water and turmeric for 4 whistles.",
        "Mash the khichdi, then stir in grated paneer and salt.",
        "Simmer for 2 minutes, add ghee, and serve warm."
      ],
      ageAdjustment: "For toddlers (12-24 months): Ensure paneer is grated or mashed so it blends completely with the soft khichdi.",
      science: "Combining rice, lentils, and dairy paneer provides a complete spectrum of essential amino acids and lipids."
    },
    preschool: {
      title: "Triple-Protein Sattu Badam Shake",
      desc: "A rich beverage combining high-protein sattu, almond flour, and whole cow's milk.",
      prepTime: "5 mins",
      cookTime: "0 mins",
      servings: "1 cup",
      rating: "4.9",
      reviews: [{ name: "Renu B. (Mom of 4-year-old)", rating: "5★", text: "Best drink after playtime. Very filling and packed with protein.", date: "Yesterday", avatarClass: "" }],
      ingredients: [
        "2 tablespoons sattu powder",
        "1 cup whole milk",
        "5 almonds (ground)",
        "1 tablespoon jaggery",
        "1/2 teaspoon ghee"
      ],
      steps: [
        "In a blender, combine sattu, milk, ground almonds, and jaggery.",
        "Blend until smooth and frothy.",
        "Pour into a cup, add a drop of ghee, and serve warm or cool."
      ],
      ageAdjustment: "For 2-4 years: A liquid meal is easier to consume for malnourished children with low appetite.",
      science: "Sattu (chickpea flour) is a powerhouse of protein, combined with milk calcium and almond fats for rapid energy recovery."
    }
  },

  // --- VITAMIN D DEFICIENCY ---
  vitd: {
    infant: {
      title: "Egg Yolk & Breastmilk Mash",
      desc: "A smooth, creamy mash of hard-boiled egg yolk dissolved in breastmilk, naturally rich in Vitamin D3.",
      prepTime: "10 mins",
      cookTime: "10 mins",
      servings: "1 serving",
      rating: "4.9",
      reviews: [{ name: "Monika F. (Mom of 8-month-old)", rating: "5★", text: "Pediatrician recommended egg yolk. Mash with breastmilk makes it very smooth.", date: "4 days ago", avatarClass: "green" }],
      ingredients: [
        "1 hard-boiled egg yolk",
        "2 tablespoons breastmilk or formula"
      ],
      steps: [
        "Boil an egg until the yolk is completely hard-cooked.",
        "Separate the yolk (discard white for infants under 1 year).",
        "Mash the yolk with warm breastmilk or formula until it forms a creamy paste.",
        "Serve lukewarm."
      ],
      ageAdjustment: "For infants (6-12 months): Avoid feeding egg white, as it is a common allergen. Egg yolk is rich in natural Vitamin D.",
      science: "Egg yolk is one of the few natural dietary sources of Vitamin D3, essential for skeletal development and bone density."
    },
    toddler: {
      title: "Fortified Paneer & Mushroom Bhurji",
      desc: "A warm stir-fry of finely chopped button mushrooms and fresh paneer, providing calcium and vitamin D.",
      prepTime: "10 mins",
      cookTime: "8 mins",
      servings: "1-2 servings",
      rating: "4.8",
      reviews: [{ name: "Shikha L. (Mom of 2-year-old)", rating: "4★", text: "Great vegetarian recipe. Mushrooms are finely chopped so they are safe.", date: "Yesterday", avatarClass: "orange" }],
      ingredients: [
        "1/4 cup button mushrooms (finely chopped)",
        "1/4 cup fresh paneer (crumbled)",
        "1/2 teaspoon ghee",
        "A pinch of turmeric & cumin"
      ],
      steps: [
        "Heat ghee in a pan, add cumin and chopped mushrooms. Sauté for 3 minutes.",
        "Add crumbled paneer, turmeric, and a tiny pinch of salt.",
        "Sauté for 2 minutes until mushrooms are soft and paneer is warm. Serve mashed."
      ],
      ageAdjustment: "For toddlers (12-24 months): Mushrooms must be chopped extremely fine to ensure easy chewing.",
      science: "Mushrooms exposed to UV light are rich in Vitamin D2. Paneer provides calcium, which requires Vitamin D to be absorbed."
    },
    preschool: {
      title: "Sesame-Fortified Badam Milk",
      desc: "A traditional almond milk beverage boosted with sesame seeds and prepared with Vitamin D fortified milk.",
      prepTime: "10 mins",
      cookTime: "10 mins",
      servings: "1 cup",
      rating: "4.9",
      reviews: [{ name: "Aarti S. (Mom of 3-year-old)", rating: "5★", text: "My kid loves this almond milk. I use fortified milk as suggested.", date: "5 days ago", avatarClass: "purple" }],
      ingredients: [
        "1 cup fortified cow's milk (Vitamin D enriched)",
        "5 almonds (soaked & peeled)",
        "1 teaspoon white sesame seeds (powdered)",
        "1 teaspoon jaggery"
      ],
      steps: [
        "Grind soaked almonds into a fine paste with a little milk.",
        "Boil the remaining milk, then stir in almond paste and sesame powder.",
        "Simmer for 5 minutes. Add jaggery, cool to warm, and serve."
      ],
      ageAdjustment: "For 2-4 years: Using Vitamin D fortified milk ensures adequate absorption of sesame and almond calcium.",
      science: "Vitamin D is necessary for calcium absorption. Sesame seeds provide high calcium, while fortified milk supplies the vital Vitamin D."
    }
  },

  // --- CALCIUM DEFICIENCY ---
  calcium: {
    infant: {
      title: "Ragi-Coconut Milk Calcium Porridge",
      desc: "A dairy-free, calcium-dense porridge of finger millet (ragi) cooked in fresh coconut milk.",
      prepTime: "10 mins",
      cookTime: "8 mins",
      servings: "1 bowl",
      rating: "4.9",
      reviews: [{ name: "Jaspreet C. (Mom of 8-month-old)", rating: "5★", text: "Baby loves the coconut milk aroma. Ragi is great for calcium.", date: "3 days ago", avatarClass: "" }],
      ingredients: [
        "1.5 tablespoons ragi flour",
        "3 tablespoons coconut milk",
        "1 cup water",
        "A pinch of cardamom"
      ],
      steps: [
        "Whisk ragi flour in water until smooth.",
        "Cook on low heat for 6 minutes, stirring constantly.",
        "Stir in coconut milk and cardamom powder, simmer for 1 minute, and serve warm."
      ],
      ageAdjustment: "For infants (6-12 months): Ragi is the best non-dairy calcium source for weaning infants.",
      science: "Finger millet (Ragi) has 10 times more calcium than wheat or rice, aiding skeletal structure growth."
    },
    toddler: {
      title: "Sweet Cardamom Doi with Sesame",
      desc: "Creamy fresh yogurt sweetened with jaggery and boosted with high-calcium ground white sesame seeds.",
      prepTime: "5 mins",
      cookTime: "0 mins",
      servings: "1 bowl",
      rating: "4.8",
      reviews: [{ name: "Tanvi R. (Mom of 19-month-old)", rating: "5★", text: "My daughter loves sweet curd. Ground sesame mixes in invisibly.", date: "Yesterday", avatarClass: "purple" }],
      ingredients: [
        "1/2 cup thick fresh curd (yogurt)",
        "1 teaspoon powdered white sesame seeds",
        "1 teaspoon jaggery powder",
        "A pinch of cardamom"
      ],
      steps: [
        "Whisk curd, jaggery, and cardamom together until creamy.",
        "Stir in the powdered sesame seeds thoroughly.",
        "Serve cool as a snack."
      ],
      ageAdjustment: "For toddlers (12-24 months): Ensure sesame is ground to a very fine powder to prevent airway aspiration.",
      science: "Yogurt provides easily absorbable calcium and proteins, while sesame powder dramatically boosts the calcium density."
    },
    preschool: {
      title: "Crispy Sesame Paneer Cubes",
      desc: "Pan-seared fresh paneer cubes coated in roasted sesame seeds, providing a double calcium boost.",
      prepTime: "10 mins",
      cookTime: "5 mins",
      servings: "1 plate",
      rating: "4.9",
      reviews: [{ name: "Vineet G. (Dad of 3.5-year-old)", rating: "5★", text: "Perfect finger food. Crunchy sesame outer layer and soft paneer inside.", date: "Yesterday", avatarClass: "green" }],
      ingredients: [
        "50g fresh paneer (cut into small cubes)",
        "1 tablespoon sesame seeds",
        "1/2 teaspoon ghee",
        "A pinch of cumin & salt"
      ],
      steps: [
        "Roll the paneer cubes in sesame seeds, pressing gently so they stick.",
        "Heat ghee in a pan and lightly toss the paneer cubes until golden.",
        "Sprinkle cumin powder and a tiny pinch of salt. Serve warm."
      ],
      ageAdjustment: "For 2-4 years: Crispy paneer is a fun finger food that kids love, offering double calcium from dairy and sesame.",
      science: "Paneer and sesame are both top-tier calcium sources, supporting rapid bone growth and dental development in preschoolers."
    }
  },

  // --- WEAK IMMUNITY ---
  immunity: {
    infant: {
      title: "Mild Turmeric & Sweet Potato Mash",
      desc: "A warm, sweet mash of orange sweet potatoes seasoned with organic turmeric powder.",
      prepTime: "10 mins",
      cookTime: "10 mins",
      servings: "1-2 small servings",
      rating: "4.8",
      reviews: [{ name: "Heena T. (Mom of 7-month-old)", rating: "5★", text: "Turmeric is sweet potato's best friend. Very mild and healthy.", date: "4 days ago", avatarClass: "orange" }],
      ingredients: [
        "1/2 sweet potato",
        "1 cup water",
        "A tiny pinch of turmeric (haldi)",
        "1/4 teaspoon ghee"
      ],
      steps: [
        "Peel and cube the sweet potato.",
        "Steam with water and turmeric for 2 whistles until fully soft.",
        "Mash thoroughly, stir in ghee, and serve warm."
      ],
      ageAdjustment: "For infants (6-12 months): Turmeric helps build immune resistance from an early age. Keep the mash soft.",
      science: "Sweet potato provides beta-carotene (Vitamin A) for mucosal immunity, while turmeric curcumin reduces systemic inflammation."
    },
    toddler: {
      title: "Tulsi-Ginger Pear Puree",
      desc: "A warm pear puree infused with holy basil (tulsi) and a drop of fresh ginger juice.",
      prepTime: "10 mins",
      cookTime: "10 mins",
      servings: "1 bowl",
      rating: "4.9",
      reviews: [{ name: "Sita R. (Mom of 14-month-old)", rating: "5★", text: "Warm pear mash is very soothing on the throat and builds immunity.", date: "Yesterday", avatarClass: "" }],
      ingredients: [
        "1 ripe pear (peeled & cored)",
        "3 fresh tulsi leaves",
        "A tiny drop of ginger juice",
        "1/2 cup water"
      ],
      steps: [
        "Chop pear and place in a pan with water and tulsi leaves.",
        "Simmer for 8 minutes until pear is soft. Discard tulsi leaves.",
        "Mash the pear, stir in the ginger juice, and serve warm."
      ],
      ageAdjustment: "For toddlers (12-24 months): Ginger juice should be a tiny drop to keep it pleasant and not spicy.",
      science: "Tulsi has strong antiviral properties, and ginger enhances gut immunity, which represents 70% of the body's immune system."
    },
    preschool: {
      title: "Ginger-Garlic Immunity Shorba",
      desc: "A warm, thin yellow lentil shorba simmered with freshly minced garlic and ginger.",
      prepTime: "10 mins",
      cookTime: "15 mins",
      servings: "2 servings",
      rating: "4.8",
      reviews: [{ name: "Anju M. (Mom of 3-year-old)", rating: "5★", text: "Very aromatic shorba. Great for cold days to keep sickness away.", date: "5 days ago", avatarClass: "purple" }],
      ingredients: [
        "2 tablespoons yellow moong dal",
        "1 clove garlic (minced)",
        "A tiny sliver of ginger (grated)",
        "1.5 cups water",
        "1/4 teaspoon ghee",
        "A pinch of turmeric & salt"
      ],
      steps: [
        "Pressure cook dal, garlic, ginger, water, turmeric, and salt for 3 whistles.",
        "Blend or whisk until completely smooth.",
        "Heat ghee, pour into the shorba, simmer for 1 minute, and serve warm."
      ],
      ageAdjustment: "For 2-4 years: Garlic and ginger act as warming agents to ward off colds and boost defense cells.",
      science: "Garlic contains allicin, a bio-active compound that stimulates white blood cells to fight pathogens."
    }
  },

  // --- PICKY EATING ---
  picky: {
    infant: {
      title: "Tri-Color Veggie Mash",
      desc: "A colorful, appealing mash of orange carrots, sweet potatoes, and green peas.",
      prepTime: "10 mins",
      cookTime: "10 mins",
      servings: "1 bowl",
      rating: "4.8",
      reviews: [{ name: "Ritu K. (Mom of 8-month-old)", rating: "5★", text: "The bright orange and green colors really caught my baby's eye.", date: "4 days ago", avatarClass: "green" }],
      ingredients: [
        "1/4 cup carrot cubes",
        "1/4 cup sweet potato cubes",
        "2 tablespoons green peas",
        "1.5 cups water",
        "1/4 teaspoon ghee"
      ],
      steps: [
        "Boil all veggies in water until completely tender.",
        "Mash each color separately or blend together to create a bright orange-yellow mash.",
        "Drizzle ghee and serve warm."
      ],
      ageAdjustment: "For infants (6-12 months): Bright naturally-colored purees stimulate interest in babies exploring solids.",
      science: "Visual appeal triggers cephalic phase digestion, causing salivary and gastric juices to flow, making babies more receptive."
    },
    toddler: {
      title: "Mini Pink Beetroot Uttapam",
      desc: "Bright pink semolina pancakes naturally colored with beetroot juice, perfect as a finger food.",
      prepTime: "10 mins",
      cookTime: "8 mins",
      servings: "1 plate",
      rating: "4.9",
      reviews: [{ name: "Poonam H. (Mom of 2-year-old)", rating: "5★", text: "Bright pink uttapam! He ate 3 of these without any fuss.", date: "Yesterday", avatarClass: "orange" }],
      ingredients: [
        "1/2 cup semolina batter (sooji mixed with curd)",
        "2 tablespoons beetroot puree",
        "1/2 teaspoon ghee"
      ],
      steps: [
        "Mix the beetroot puree into the semolina batter to turn it bright pink.",
        "Heat a pan, smear ghee, and pour small silver-dollar sized pancakes.",
        "Cook both sides until soft and serve as finger food."
      ],
      ageAdjustment: "For toddlers (12-24 months): Small, colorful finger foods are easier and more fun for toddlers to feed themselves.",
      science: "Toddlers eat better when they have autonomy. The pink color is highly engaging and disguises healthy beets."
    },
    preschool: {
      title: "Mini Cheesy Spinach Paratha",
      desc: "Spinach-infused green parathas stuffed with gooey grated cheese.",
      prepTime: "15 mins",
      cookTime: "10 mins",
      servings: "2 servings",
      rating: "4.9",
      reviews: [{ name: "Nidhi S. (Mom of 3-year-old)", rating: "5★", text: "Sneaking spinach with cheese works every single time! Recommended.", date: "Yesterday", avatarClass: "purple" }],
      ingredients: [
        "1/2 cup whole wheat flour",
        "2 tablespoons spinach puree",
        "1 tablespoon grated cheese",
        "Ghee for cooking"
      ],
      steps: [
        "Knead wheat flour with spinach puree to make green dough.",
        "Roll into mini rotis, stuff with grated cheese, and fold.",
        "Cook on a griddle with ghee until soft and golden. Serve warm."
      ],
      ageAdjustment: "For 2-4 years: Cheese adds calcium and protein while masking the iron-rich spinach taste, appealing to picky eaters.",
      science: "Combining cheese (fat/protein) with spinach increases iron bioavailability and makes iron-dense greens tasty."
    }
  },

  // --- FOOD ALLERGY SUPPORT ---
  allergy: {
    infant: {
      title: "Hypoallergenic Pumpkin Puree",
      desc: "A single-ingredient sweet pumpkin mash that is extremely low-allergen and gentle on baby's digestive tract.",
      prepTime: "5 mins",
      cookTime: "10 mins",
      servings: "1 serving",
      rating: "4.8",
      reviews: [{ name: "Alpa N. (Mom of 7-month-old)", rating: "5★", text: "Great starter food for sensitive tummies. No reaction at all.", date: "Yesterday", avatarClass: "" }],
      ingredients: [
        "1/2 cup sweet pumpkin (peeled & chopped)",
        "1 cup water"
      ],
      steps: [
        "Boil pumpkin pieces in water for 10 minutes until mushy.",
        "Blend into a silky smooth puree.",
        "Serve lukewarm without any oil, dairy, or nuts."
      ],
      ageAdjustment: "For infants (6-12 months): Pumpkin is extremely low-allergen and soothing to baby guts.",
      science: "Pumpkin is rich in Vitamin A and highly digestible, making it the safest starter food for sensitive infants."
    },
    toddler: {
      title: "Allergen-Free Moong Dal Rice",
      desc: "A simple, soft-mashed rice and moong dal preparation, cooked without dairy, wheat, soy, or nuts.",
      prepTime: "5 mins",
      cookTime: "15 mins",
      servings: "1 bowl",
      rating: "4.8",
      reviews: [{ name: "Shalini P. (Mom of 18-month-old)", rating: "5★", text: "My toddler has multiple allergies. This simple khichdi is our safe haven.", date: "3 days ago", avatarClass: "orange" }],
      ingredients: [
        "2 tablespoons rice",
        "2 tablespoons yellow moong dal",
        "2 cups water",
        "A pinch of cumin powder"
      ],
      steps: [
        "Wash rice and dal. Pressure cook with water and cumin for 4 whistles.",
        "Mash thoroughly into a soft paste.",
        "Serve warm without dairy, nuts, wheat, or soy."
      ],
      ageAdjustment: "For toddlers (12-24 months): A safe, baseline recovery food when diagnosing food sensitivities.",
      science: "Moong dal and rice are naturally gluten-free and have the lowest known allergic response rates in infants."
    },
    preschool: {
      title: "Baked Sweet Potato Wedges",
      desc: "Warm baked sweet potato wedges tossed with a pinch of cumin and olive oil.",
      prepTime: "10 mins",
      cookTime: "15 mins",
      servings: "1 plate",
      rating: "4.9",
      reviews: [{ name: "Vikram R. (Dad of 3-year-old)", rating: "5★", text: "Healthy, wheat-free, dairy-free snack that mimics fries but is highly nutritious.", date: "5 days ago", avatarClass: "green" }],
      ingredients: [
        "1 sweet potato",
        "1/2 teaspoon olive oil",
        "A pinch of cumin & salt"
      ],
      steps: [
        "Peel and cut sweet potato into finger-thick wedges.",
        "Toss with olive oil, cumin, and salt.",
        "Bake or pan-cook on low heat until soft. Serve warm."
      ],
      ageAdjustment: "For 2-4 years: A healthy, wheat-free, dairy-free snack that mimics fries but is highly nutritious.",
      science: "Provides dense carbohydrates, dietary fibers, and minerals without triggering any common allergens."
    }
  },

  // --- LACTOSE INTOLERANCE ---
  lactose: {
    infant: {
      title: "Coconut Milk & Rice Starch Porridge",
      desc: "A lactose-free porridge of rice flour and fresh coconut milk, creamy and easy on the gut.",
      prepTime: "5 mins",
      cookTime: "8 mins",
      servings: "1 bowl",
      rating: "4.8",
      reviews: [{ name: "Nisha J. (Mom of 9-month-old)", rating: "5★", text: "My baby had heavy gas with dairy. This coconut milk porridge is safe.", date: "4 days ago", avatarClass: "purple" }],
      ingredients: [
        "2 tablespoons rice flour",
        "1 cup water",
        "3 tablespoons coconut milk"
      ],
      steps: [
        "Mix rice flour in water, boil on low heat for 5 minutes, stirring.",
        "Let it cool slightly, then stir in coconut milk.",
        "Serve lukewarm."
      ],
      ageAdjustment: "For infants (6-12 months): Safe, dairy-free alternative to traditional milk-based porridges.",
      science: "Rice and coconut milk are naturally lactose-free, preventing colic, diarrhea, and bloating in lactose-sensitive infants."
    },
    toddler: {
      title: "Almond Milk Ragi Porridge",
      desc: "A calcium-rich porridge of finger millet (ragi) cooked in unsweetened almond milk.",
      prepTime: "5 mins",
      cookTime: "10 mins",
      servings: "1 cup",
      rating: "4.8",
      reviews: [{ name: "Tanmay M. (Dad of 20-month-old)", rating: "5★", text: "Great recipe. Ragi and almond milk provide calcium without lactose.", date: "Yesterday", avatarClass: "" }],
      ingredients: [
        "1.5 tablespoons ragi flour",
        "1 cup unsweetened almond milk",
        "1 teaspoon jaggery",
        "1/4 teaspoon ghee"
      ],
      steps: [
        "Dissolve ragi flour in almond milk. Cook on low heat, stirring constantly.",
        "Simmer for 6 minutes until thick. Add jaggery and ghee.",
        "Serve warm."
      ],
      ageAdjustment: "For toddlers (12-24 months): Almond milk is dairy-free and provides high calcium to replace regular cow's milk.",
      science: "Almond milk combined with Ragi delivers double calcium without lactose, protecting the child's intestinal lining."
    },
    preschool: {
      title: "Dairy-Free Tofu Veggie Bhurji",
      desc: "A dairy-free, high-protein stir-fry of crumbled soya tofu and grated carrots.",
      prepTime: "10 mins",
      cookTime: "5 mins",
      servings: "2 servings",
      rating: "4.9",
      reviews: [{ name: "Suman T. (Mom of 3-year-old)", rating: "5★", text: "Tofu bhurji is delicious. He thinks it is paneer and eats it happily.", date: "Yesterday", avatarClass: "green" }],
      ingredients: [
        "1/2 cup firm tofu (soya paneer, crumbled)",
        "1 tablespoon carrot (grated)",
        "1/2 teaspoon ghee",
        "A pinch of turmeric & cumin"
      ],
      steps: [
        "Heat ghee in a pan, sauté grated carrot for 2 minutes.",
        "Add crumbled tofu, turmeric, cumin, and a tiny pinch of salt.",
        "Sauté for 2 minutes and serve warm."
      ],
      ageAdjustment: "For 2-4 years: Tofu mimics paneer perfectly but contains zero dairy, offering high protein.",
      science: "Soya tofu provides complete plant proteins and is completely free of lactose and milk proteins (casein)."
    }
  },

  // --- DIAPER RASH ---
  diaperrash: {
    infant: {
      title: "Cooling Barley & Fennel Drink",
      desc: "A soothing, clear hydration drink made of pearl barley and fennel seeds to reduce body heat.",
      prepTime: "5 mins",
      cookTime: "15 mins",
      servings: "1 cup",
      rating: "4.8",
      reviews: [{ name: "Payal G. (Mom of 9-month-old)", rating: "5★", text: "Diluting the urine really helped soothe his diaper rash irritation.", date: "Yesterday", avatarClass: "orange" }],
      ingredients: [
        "1 tablespoon pearl barley",
        "1/4 teaspoon fennel seeds",
        "2 cups water"
      ],
      steps: [
        "Boil barley and fennel seeds in water for 15 minutes.",
        "Strain the liquid, discarding the grains.",
        "Let it cool to room temperature and feed in sips."
      ],
      ageAdjustment: "For infants (6-12 months): Keep it completely unsweetened. Helps cool the body from the inside.",
      science: "Barley is a natural diuretic and coolant that dilutes acidic urine, reducing diaper rash irritation."
    },
    toddler: {
      title: "Hydrating Coconut & Mint Cooler",
      desc: "Fresh tender coconut water infused with crushed mint leaves to cool the child's digestive system.",
      prepTime: "5 mins",
      cookTime: "0 mins",
      servings: "1 cup",
      rating: "4.8",
      reviews: [{ name: "Shanti R. (Mom of 16-month-old)", rating: "5★", text: "Mint makes the coconut water very refreshing. Keeps urine dilute.", date: "4 days ago", avatarClass: "purple" }],
      ingredients: [
        "1/2 cup fresh tender coconut water",
        "3 fresh mint leaves (crushed)"
      ],
      steps: [
        "Mix coconut water with crushed mint leaves.",
        "Let it sit for 5 minutes, strain, and serve cool."
      ],
      ageAdjustment: "For toddlers (12-24 months): Highly refreshing drink to reduce urine acidity during rashes.",
      science: "Mint and coconut water act as systemic cooling agents, lowering the metabolic heat that worsens skin rashes."
    },
    preschool: {
      title: "Cooling Cucumber & Yogurt Raita",
      desc: "A cooling side dish of fresh sweet yogurt, grated cucumber, and roasted cumin powder.",
      prepTime: "10 mins",
      cookTime: "0 mins",
      servings: "2 servings",
      rating: "4.9",
      reviews: [{ name: "Dinesh K. (Dad of 3.5-year-old)", rating: "5★", text: "Cucumber yogurt is very cooling. He loved dipping paratha in it.", date: "Yesterday", avatarClass: "" }],
      ingredients: [
        "1/2 cup fresh yogurt",
        "2 tablespoons cucumber (grated)",
        "A pinch of roasted cumin powder",
        "A tiny pinch of salt"
      ],
      steps: [
        "Whisk yogurt until smooth.",
        "Add grated cucumber, cumin, and salt.",
        "Mix well and serve cool."
      ],
      ageAdjustment: "For 2-4 years: Serve cool as a side dish. Yogurt cools the gut and cucumber hydrates skin cells.",
      science: "Cucumber is 96% water, and yogurt probiotics neutralize acidic gut metabolites, relieving skin inflammation."
    }
  },

  // --- ECZEMA SUPPORT ---
  eczema: {
    infant: {
      title: "Avocado & Banana Creamy Mash",
      desc: "A raw, creamy mash of fresh avocado and sweet banana, loaded with skin-friendly Vitamin E.",
      prepTime: "5 mins",
      cookTime: "0 mins",
      servings: "1 serving",
      rating: "4.8",
      reviews: [{ name: "Pooja W. (Mom of 10-month-old)", rating: "5★", text: "Very smooth and creamy. My baby has dry eczema and loved this mash.", date: "Yesterday", avatarClass: "green" }],
      ingredients: [
        "1/4 ripe avocado",
        "1/2 ripe banana"
      ],
      steps: [
        "Scoop out the avocado flesh.",
        "Mash the avocado and banana together thoroughly until creamy and lump-free.",
        "Serve immediately."
      ],
      ageAdjustment: "For infants (6-12 months): Rich in healthy monounsaturated fats. No cooking required.",
      science: "Avocados are packed with Vitamin E and healthy lipids that nourish dry skin barrier from the inside."
    },
    toddler: {
      title: "Chia & Mango Coconut Pudding",
      desc: "A cooling dessert of soaked chia seeds, fresh coconut milk, and mango puree.",
      prepTime: "15 mins",
      cookTime: "0 mins",
      servings: "1 serving",
      rating: "4.8",
      reviews: [{ name: "Tanya S. (Mom of 22-month-old)", rating: "5★", text: "Healthy fats from chia really help soothe dry eczema flareups.", date: "3 days ago", avatarClass: "orange" }],
      ingredients: [
        "1/2 teaspoon chia seeds",
        "3 tablespoons coconut milk",
        "2 tablespoons mango puree",
        "2 tablespoons water"
      ],
      steps: [
        "Soak chia seeds in water for 15 minutes until gelatinous.",
        "Stir in coconut milk and mango puree.",
        "Mix well and serve cool."
      ],
      ageAdjustment: "For toddlers (12-24 months): Chia seeds must be fully soaked to prevent swallowing hazards.",
      science: "Chia seeds contain Omega-3 fatty acids, which reduce systemic skin inflammation and eczema flare-ups."
    },
    preschool: {
      title: "Walnut & Flaxseed Oats Porridge",
      desc: "A warm oatmeal porridge cooked with powdered walnuts and flaxseeds, rich in ALA Omega-3.",
      prepTime: "10 mins",
      cookTime: "8 mins",
      servings: "1-2 servings",
      rating: "4.9",
      reviews: [{ name: "Sunil D. (Dad of 3-year-old)", rating: "5★", text: "I powder walnuts as recommended. Highly nutritious oatmeal breakfast.", date: "5 days ago", avatarClass: "purple" }],
      ingredients: [
        "3 tablespoons rolled oats",
        "1/2 teaspoon flaxseed powder",
        "2 walnuts (powdered)",
        "1.5 cups milk or water",
        "1 teaspoon jaggery"
      ],
      steps: [
        "Cook oats in milk/water for 5 minutes until soft.",
        "Stir in flaxseed powder and powdered walnuts.",
        "Add jaggery, mix well, and serve warm."
      ],
      ageAdjustment: "For 2-4 years: Walnut must be finely powdered to prevent choking. Omega-3 fats support skin hydration.",
      science: "Walnuts and flaxseeds are rich in Alpha-Linolenic Acid (ALA), an Omega-3 fat that reduces dry, itchy eczema patches."
    }
  },

  // --- ACID REFLUX ---
  reflux: {
    infant: {
      title: "Thickened Rice Porridge",
      desc: "A slightly thickened rice flour porridge, adjusted with breastmilk or formula, designed to reduce baby spit-ups.",
      prepTime: "5 mins",
      cookTime: "8 mins",
      servings: "1 bowl",
      rating: "4.8",
      reviews: [{ name: "Deepali R. (Mom of 7-month-old)", rating: "5★", text: "Thickening his feeds really stopped his acid spit-ups. Highly recommend.", date: "4 days ago", avatarClass: "" }],
      ingredients: [
        "2 tablespoons rice flour",
        "1 cup water",
        "2 tablespoons breastmilk or formula"
      ],
      steps: [
        "Whisk rice flour in water and boil until it forms a thick porridge.",
        "Let it cool to warm, then stir in breastmilk/formula to adjust flavor.",
        "Serve warm."
      ],
      ageAdjustment: "For infants (6-12 months): Thickened feeds stay down in the stomach better, preventing spit-ups.",
      science: "Thicker viscosity foods reduce the volume of gastroesophageal reflux compared to thin liquids."
    },
    toddler: {
      title: "Bland room-temp Curd Rice",
      desc: "A spice-free, oil-free preparation of room-temperature curd rice, soothing the esophagus.",
      prepTime: "10 mins",
      cookTime: "15 mins",
      servings: "1 bowl",
      rating: "4.8",
      reviews: [{ name: "Geeta S. (Mom of 18-month-old)", rating: "5★", text: "Extremely bland but very soothing. It instantly settled her reflux.", date: "Yesterday", avatarClass: "green" }],
      ingredients: [
        "1/4 cup rice",
        "1 cup water",
        "1/2 cup fresh curd (yogurt, not sour)"
      ],
      steps: [
        "Cook rice with water until mushy. Let it cool completely.",
        "Mix with curd (do not add salt, oil, or spices).",
        "Serve at room temp in small portions."
      ],
      ageAdjustment: "For toddlers (12-24 months): Spiceless, oil-free curd rice settles stomach acids instantly.",
      science: "Probiotic yogurt neutralizes stomach acids and cools the esophagus, preventing acid reflux irritation."
    },
    preschool: {
      title: "Fennel Oats Porridge",
      desc: "Oatmeal cooked in strained fennel water, neutralizing excess stomach acids.",
      prepTime: "10 mins",
      cookTime: "10 mins",
      servings: "1-2 servings",
      rating: "4.9",
      reviews: [{ name: "Rajesh T. (Dad of 3-year-old)", rating: "5★", text: "Fennel water is amazing for acidity. This oatmeal recipe is very gentle.", date: "5 days ago", avatarClass: "orange" }],
      ingredients: [
        "3 tablespoons rolled oats",
        "1/4 teaspoon fennel seeds",
        "1.5 cups water",
        "1/2 teaspoon jaggery"
      ],
      steps: [
        "Boil fennel seeds in water for 5 minutes, then strain to collect the fennel water.",
        "Cook oats in the fennel water for 5 minutes until soft.",
        "Add jaggery and serve warm."
      ],
      ageAdjustment: "For 2-4 years: Avoid dairy or fats, as they delay gastric emptying and worsen reflux.",
      science: "Fennel has carminative properties that relax the digestive tract, and oats absorb excess acid, reducing reflux."
    }
  }
};

// 2. Active Application State
let selectedAge = '';
let selectedIllnesses = [];
let timerInterval = null;
let activeTimerIndex = null;
let timerTotalSeconds = 0;
let timerSecondsRemaining = 0;

// Illness priority map for multi-selection recovery prioritization
const illnessPriorities = {
  diarrhea: 100,
  dehydration: 95,
  vomiting: 90,
  stomach: 85,
  colic: 80,
  reflux: 75,
  fever: 70,
  cold: 60,
  throat: 55,
  teething: 50,
  constipation: 45,
  rashes: 40,
  diaperrash: 35,
  eczema: 30,
  appetite: 25,
  picky: 20,
  immunity: 15,
  allergy: 14,
  lactose: 13,
  anemia: 12,
  underweight: 11,
  poorweight: 10,
  pem: 9,
  vitd: 8,
  calcium: 7
};

// Category tags mapping
const tags = {
  fever: "Fever Recovery",
  cold: "Cough & Cold Soother",
  stomach: "Tummy Soother",
  throat: "Sore Throat Nourisher",
  constipation: "Constipation Reliever",
  teething: "Gum Coolant",
  vomiting: "Nausea Relief",
  colic: "Anti-Colic Remedy",
  appetite: "Appetite Stimulant",
  rashes: "Rashes Cooler",
  diarrhea: "Diarrhea Soother",
  dehydration: "Hydration Booster",
  anemia: "Iron Rich Bowl",
  underweight: "Calorie Dense",
  poorweight: "Growth Booster",
  pem: "High Protein",
  vitd: "Vitamin D Boost",
  calcium: "Calcium Rich",
  immunity: "Immunity Booster",
  picky: "Kid Approved",
  allergy: "Allergen Safe",
  lactose: "Dairy Free",
  diaperrash: "Cooling Recovery",
  eczema: "Skin Soother",
  reflux: "Reflux Relief"
};

// 3. Selection Handlers
function setAge(age) {
  selectedAge = age;
  
  // Update UI active states
  document.querySelectorAll('.age-options .option-card').forEach(card => {
    card.classList.remove('active');
  });
  document.getElementById(`age-${age}`).classList.add('active');
  
  checkAndDisplayRecipe();
}

function setIllness(illness) {
  const index = selectedIllnesses.indexOf(illness);
  if (index > -1) {
    // Already selected, toggle off
    selectedIllnesses.splice(index, 1);
    document.getElementById(`illness-${illness}`).classList.remove('active');
  } else {
    // Toggle on
    selectedIllnesses.push(illness);
    document.getElementById(`illness-${illness}`).classList.add('active');
  }
  
  updateSelectionIndicator();
  checkAndDisplayRecipe();
}

// Clear all selected symptoms and restore recommendation view smoothly
function clearSelectedSymptoms() {
  selectedIllnesses = [];
  document.querySelectorAll('.illness-options .illness-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  updateSelectionIndicator();
  checkAndDisplayRecipe();
}

function updateSelectionIndicator() {
  const wrap = document.getElementById('selection-indicator-wrap');
  const badge = document.getElementById('selected-count-badge');
  const clearBtn = document.getElementById('clear-selection-btn');
  if (!wrap || !badge || !clearBtn) return;
  
  const count = selectedIllnesses.length;
  if (count > 0) {
    wrap.classList.add('visible');
    badge.textContent = `Selected: ${count}`;
    clearBtn.removeAttribute('disabled');
    if (count > 3) {
      badge.classList.add('alert-badge');
    } else {
      badge.classList.remove('alert-badge');
    }
  } else {
    wrap.classList.remove('visible');
    badge.textContent = 'Selected: 0';
    clearBtn.setAttribute('disabled', 'true');
    badge.classList.remove('alert-badge');
  }
}

function checkAndDisplayRecipe() {
  const container = document.getElementById('recipe-output-container');
  if (selectedAge && selectedIllnesses.length > 0) {
    displayRecipes();
  } else {
    if (container) {
      container.style.display = 'none';
      container.innerHTML = '';
    }
  }
}

// Helper to generate individual recipe card HTML
function getRecipeCardHtml(recipe, index, cookMinutes, tagText, harmonyHtml = '') {
  const ingredientsHtml = recipe.ingredients.map(ing => `<li>${ing}</li>`).join('');
  const stepsHtml = recipe.steps.map(step => `<li>${step}</li>`).join('');

  return `
    <div class="recipe-card" style="margin-bottom: 3rem; animation: fadeIn 0.5s ease-out;">
      <!-- Visuals Panel -->
      <div class="recipe-visuals">
        <div class="recipe-meta-top">
          <div class="badge-row">
            <span class="recipe-tag">${tagText}</span>
            <span class="rating-chip">${recipe.rating} ★</span>
          </div>
          <h3 class="recipe-header-title">${recipe.title}</h3>
          <p class="recipe-desc">${recipe.desc}</p>
        </div>
        
        <div>
          <div class="recipe-meta-grid">
            <div class="meta-item">
              <i>⏱️</i>
              <div>
                <span class="meta-label">Prep Time</span>
                <span class="meta-value">${recipe.prepTime}</span>
              </div>
            </div>
            <div class="meta-item">
              <i>🔥</i>
              <div>
                <span class="meta-label">Cook Time</span>
                <span class="meta-value">${recipe.cookTime}</span>
              </div>
            </div>
            <div class="meta-item" style="grid-column: span 2;">
              <i>🥣</i>
              <div>
                <span class="meta-label">Suggested Portion</span>
                <span class="meta-value">${recipe.servings}</span>
              </div>
            </div>
          </div>

          <!-- Integrated Cooking Timer -->
          <div class="cooking-timer">
            <div class="timer-row">
              <span class="timer-title">⏰ Active Cooking Helper:</span>
              <span class="timer-clock" id="timer-display-${index}">${cookMinutes}:00</span>
            </div>
            <div class="timer-progress-bar">
              <div class="timer-progress-fill" id="timer-progress-${index}"></div>
            </div>
            <div class="timer-controls">
              <button class="timer-btn start" id="btn-timer-start-${index}" onclick="startTimer(${index}, ${cookMinutes})">Start Helper</button>
              <button class="timer-btn reset" onclick="resetTimer(${index}, ${cookMinutes})">Reset</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Recipe Content Panel -->
      <div class="recipe-content">
        ${harmonyHtml}

        <!-- Ingredients -->
        <div class="recipe-section">
          <h4>📋 Ingredients Checklist</h4>
          <ul class="ingredients-list">
            ${ingredientsHtml}
          </ul>
        </div>

        <!-- Instructions -->
        <div class="recipe-section">
          <h4>👩‍🍳 Cooking Directions</h4>
          <ol class="steps-list">
            ${stepsHtml}
          </ol>
        </div>

        <!-- Age Specific Modifications -->
        <div class="age-adjustment-box">
          <h5>👶 Age-Specific Safety Advice</h5>
          <p>${recipe.ageAdjustment}</p>
        </div>

        <!-- Scientific & Healing properties -->
        <div class="healing-science-box">
          <h5>🔬 The Science Behind the Ingredients</h5>
          <p>${recipe.science}</p>
        </div>
      </div>
    </div>
  `;
}

// 4. Render Single Recipe based on priority matching
function displayRecipes() {
  const container = document.getElementById('recipe-output-container');
  
  if (selectedIllnesses.length > 3) {
    container.innerHTML = `
      <h2 class="section-title" style="margin-bottom: 2.5rem;">Medical Evaluation Recommended</h2>
      <div class="doctor-warning-card">
        <div class="warning-icon">⚠️</div>
        <div class="warning-content">
          <h3>Please Consult Your Pediatrician</h3>
          <p>You have selected <strong>${selectedIllnesses.length} conditions</strong>. If your child is experiencing more than 3 symptoms or illnesses simultaneously, we strongly advise consulting your pediatrician immediately.</p>
          <p>Home remedies and nutritional recovery recipes are meant to support individual, mild conditions and should not delay professional medical diagnosis and care when multiple symptoms are present.</p>
          <div class="emergency-badge">🚨 Pediatric Emergency Advice: Seek immediate medical attention if your child has difficulty breathing, persistent high fever, extreme lethargy, or refuses all fluids.</div>
        </div>
      </div>
    `;
    container.style.display = 'block';
    container.scrollIntoView({ behavior: 'smooth', block: 'start' });
    return;
  }
  
  // Sort illnesses by priority to pick the primary/highest priority one
  const sortedIllnesses = [...selectedIllnesses].sort((a, b) => {
    const priorityA = illnessPriorities[a] || 0;
    const priorityB = illnessPriorities[b] || 0;
    return priorityB - priorityA;
  });
  
  const primaryIllness = sortedIllnesses[0];
  const recipe = recipes[primaryIllness][selectedAge];
  
  if (recipe) {
    const cookMinutes = parseInt(recipe.cookTime) || 10;
    const tagText = tags[primaryIllness] || "Comfort Food";
    
    // Generate harmony description if multiple illnesses are selected
    let harmonyHtml = '';
    if (selectedIllnesses.length > 1) {
      const diseaseNamesList = selectedIllnesses.map(item => tags[item] || item);
      let symptomsText = "";
      if (diseaseNamesList.length === 2) {
        symptomsText = `<strong>${diseaseNamesList[0]}</strong> and <strong>${diseaseNamesList[1]}</strong>`;
      } else {
        symptomsText = `<strong>${diseaseNamesList.slice(0, -1).join(', ')}</strong>, and <strong>${diseaseNamesList[diseaseNamesList.length - 1]}</strong>`;
      }
      
      harmonyHtml = `
        <div class="harmony-box">
          <strong>💡 Multi-Symptom Harmony:</strong> Since your child is experiencing a combination of ${symptomsText}, we have recommended <strong>${recipe.title}</strong> as the optimal healing bowl. It addresses the highest priority nutritional needs while remaining safe, gentle, and highly digestible for all selected conditions.
        </div>
      `;
    }
    
    let htmlContent = `<h2 class="section-title" style="margin-bottom: 2.5rem;">Recommended Healing Bowl</h2>`;
    htmlContent += getRecipeCardHtml(recipe, 0, cookMinutes, tagText, harmonyHtml);
    
    container.innerHTML = htmlContent;
    container.style.display = 'block';
    container.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// 5. Active Cooking Timer (Multi-instance compatible)
function setupTimer(index, seconds) {
  if (activeTimerIndex === index) {
    resetTimer(index, seconds / 60);
    return;
  }
  
  // Stop existing timer interval if another timer is chosen
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
  
  activeTimerIndex = index;
  timerTotalSeconds = seconds;
  timerSecondsRemaining = seconds;
  updateTimerUI(index);
}

function updateTimerUI(index) {
  const displayEl = document.getElementById(`timer-display-${index}`);
  const progressEl = document.getElementById(`timer-progress-${index}`);
  if (!displayEl || !progressEl) return;
  
  const mins = Math.floor(timerSecondsRemaining / 60);
  const secs = timerSecondsRemaining % 60;
  displayEl.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  
  const percentage = ((timerTotalSeconds - timerSecondsRemaining) / timerTotalSeconds) * 100;
  progressEl.style.width = `${percentage}%`;
}

function startTimer(index, cookMinutes) {
  // If active timer isn't set up for this index, set it up
  if (activeTimerIndex !== index) {
    setupTimer(index, cookMinutes * 60);
  }
  
  if (timerInterval) return;
  
  const startBtn = document.getElementById(`btn-timer-start-${index}`);
  if (startBtn) {
    startBtn.textContent = 'Pause';
    startBtn.className = 'timer-btn pause';
    startBtn.onclick = () => pauseTimer(index, cookMinutes);
  }
  
  timerInterval = setInterval(() => {
    if (timerSecondsRemaining > 0) {
      timerSecondsRemaining--;
      updateTimerUI(index);
    } else {
      clearInterval(timerInterval);
      timerInterval = null;
      triggerTimerFinish(index);
    }
  }, 1000);
}

function pauseTimer(index, cookMinutes) {
  if (activeTimerIndex !== index) return;
  clearInterval(timerInterval);
  timerInterval = null;
  
  const startBtn = document.getElementById(`btn-timer-start-${index}`);
  if (startBtn) {
    startBtn.textContent = 'Resume';
    startBtn.className = 'timer-btn start';
    startBtn.onclick = () => startTimer(index, cookMinutes);
  }
}

function resetTimer(index, cookMinutes) {
  if (activeTimerIndex === index) {
    clearInterval(timerInterval);
    timerInterval = null;
    timerSecondsRemaining = cookMinutes * 60;
    updateTimerUI(index);
  } else {
    setupTimer(index, cookMinutes * 60);
  }
  
  const startBtn = document.getElementById(`btn-timer-start-${index}`);
  if (startBtn) {
    startBtn.textContent = 'Start Helper';
    startBtn.className = 'timer-btn start';
    startBtn.onclick = () => startTimer(index, cookMinutes);
  }
}

function triggerTimerFinish(index) {
  const clock = document.getElementById(`timer-display-${index}`);
  if (clock) {
    clock.style.color = 'var(--secondary-color)';
    clock.textContent = "Done! 🎉";
  }
  
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(440, audioCtx.currentTime);
    gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 1);
  } catch(e) {
    console.log("Audio feedback not supported or blocked");
  }
}

// Interactive 3D Cursor Tilt for Age Group Cards
function initCardTilt() {
  const cards = document.querySelectorAll('.option-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const rotateX = -(y / (rect.height / 2)) * 7;
      const rotateY = (x / (rect.width / 2)) * 7;
      const isSelected = card.classList.contains('active');
      const lift = isSelected ? '-2px' : '-6px';
      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(${lift})`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

// Expose functions globally for onclick bindings in dynamic HTML
window.startTimer = startTimer;
window.resetTimer = resetTimer;
window.clearSelectedSymptoms = clearSelectedSymptoms;
window.updateSelectionIndicator = updateSelectionIndicator;

// Page initialized binds
window.addEventListener('DOMContentLoaded', () => {
  // Initialize 3D Card Tilt
  initCardTilt();
  
  // Initialize selection indicator state
  updateSelectionIndicator();

  // Age options
  document.getElementById('age-infant').onclick = () => setAge('infant');
  document.getElementById('age-toddler').onclick = () => setAge('toddler');
  document.getElementById('age-preschool').onclick = () => setAge('preschool');
  
  // 25 Illness options
  document.getElementById('illness-fever').onclick = () => setIllness('fever');
  document.getElementById('illness-cold').onclick = () => setIllness('cold');
  document.getElementById('illness-stomach').onclick = () => setIllness('stomach');
  document.getElementById('illness-throat').onclick = () => setIllness('throat');
  document.getElementById('illness-constipation').onclick = () => setIllness('constipation');
  document.getElementById('illness-teething').onclick = () => setIllness('teething');
  document.getElementById('illness-vomiting').onclick = () => setIllness('vomiting');
  document.getElementById('illness-colic').onclick = () => setIllness('colic');
  document.getElementById('illness-appetite').onclick = () => setIllness('appetite');
  document.getElementById('illness-rashes').onclick = () => setIllness('rashes');
  document.getElementById('illness-diarrhea').onclick = () => setIllness('diarrhea');
  document.getElementById('illness-dehydration').onclick = () => setIllness('dehydration');
  document.getElementById('illness-anemia').onclick = () => setIllness('anemia');
  document.getElementById('illness-underweight').onclick = () => setIllness('underweight');
  document.getElementById('illness-poorweight').onclick = () => setIllness('poorweight');
  document.getElementById('illness-pem').onclick = () => setIllness('pem');
  document.getElementById('illness-vitd').onclick = () => setIllness('vitd');
  document.getElementById('illness-calcium').onclick = () => setIllness('calcium');
  document.getElementById('illness-immunity').onclick = () => setIllness('immunity');
  document.getElementById('illness-picky').onclick = () => setIllness('picky');
  document.getElementById('illness-allergy').onclick = () => setIllness('allergy');
  document.getElementById('illness-lactose').onclick = () => setIllness('lactose');
  document.getElementById('illness-diaperrash').onclick = () => setIllness('diaperrash');
  document.getElementById('illness-eczema').onclick = () => setIllness('eczema');
  document.getElementById('illness-reflux').onclick = () => setIllness('reflux');
});
