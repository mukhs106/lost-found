/**
 * DATA.JS - Image Collection & Metadata
 *
 * This file contains all 112 image entries with complete metadata.
 * Each entry includes:
 * - Basic info (id, src, title, year, date, aspect_ratio)
 * - Thematic categorization
 * - Brand compliance scores (visual, behavioral, voice/audience)
 * - Context and notes
 * - Visual similarity references
 */

const imageData = [
  {
    id: "img_001",
    src: "images/IMG_001.jpg",
    title: "A postcard from New York",
    year: 2023,
    date: "2023-03-15",
    aspect_ratio: "2:3",

    thematic: {
      categories: ["moments", "belonging"],
      emotional_tags: ["routine"],
      lost_found: "found",
      thematic_weights: { moments: 0.6, belonging: 0.4 }
    },

    brand_compliance: {
      overall_score: 0.87,
      visual_identity: {
        score: 0.90,
        color_palette: "compliant",
        composition: "strong",
        lighting: "signature"
      },
      ritual_behavioral: {
        score: 0.85,
        authenticity: 0.75,
        ritual_documentation: 1.0,
        ritual_name: "Morning Protocol",
        performance_type: "ambiguous"
      },
      voice_audience: {
        score: 0.85,
        audience: "solitude",
        audience_match: 1.0,
        vulnerability_tone: "aligned",
        tone_score: 0.70
      }
    },

    context: {
      location_type: "private",
      photographer: "self",
      intention: "documentation"
    },

    notes: "Early morning, before anyone else awake. Felt honest.",
    contradictions: null,
    position: null,
    color_palette: ["#2B4C5F", "#8B7355", "#E8DCC4"],
    visual_similarity_ids: ["img_034", "img_089"]
  },

  {
    id: "img_002",
    src: "images/IMG_002.jpg",
    title: "A note from Portia",
    year: 2020,
    date: "2020-09-08",
    aspect_ratio: "1:1",

    thematic: {
      categories: ["faces"],
      emotional_tags: ["limbo"],
      lost_found: "lost",
      thematic_weights: { faces: 1.0 }
    },

    brand_compliance: {
      overall_score: 0.31,
      visual_identity: {
        score: 0.40,
        color_palette: "deviant",
        composition: "adequate",
        lighting: "off-brand"
      },
      ritual_behavioral: {
        score: 0.20,
        authenticity: 0.10,
        ritual_documentation: 0.30,
        ritual_name: "Face documentation",
        performance_type: "performed"
      },
      voice_audience: {
        score: 0.35,
        audience: "public",
        audience_match: 0.25,
        vulnerability_tone: "misaligned",
        tone_score: 0.45
      }
    },

    context: {
      location_type: "private",
      photographer: "self",
      intention: "performance"
    },

    notes: "Peak pandemic performative self. Trying to feel seen through likes.",
    contradictions: [
      "Visual: Oversaturated colors violate palette",
      "Behavioral: Performed authenticity",
      "Voice: Forced vulnerability for public consumption"
    ],
    position: null,
    color_palette: ["#FF8C94", "#FFAAA5", "#FFD3B6"],
    visual_similarity_ids: ["img_067", "img_082"]
  },

  {
    id: "img_003",
    src: "images/img_003.jpg",
    title: "Letter from the past",
    year: 2007,
    date: "2007-06-12",
    aspect_ratio: "3:2",

    thematic: {
      categories: ["nostalgia", "play"],
      emotional_tags: ["wonder"],
      lost_found: "found",
      thematic_weights: { nostalgia: 0.6, play: 0.4 }
    },

    brand_compliance: {
      overall_score: null,
      visual_identity: {
        score: null,
        color_palette: "n/a",
        composition: "n/a",
        lighting: "n/a"
      },
      ritual_behavioral: {
        score: null,
        authenticity: null,
        ritual_documentation: null,
        ritual_name: "none",
        performance_type: "authentic"
      },
      voice_audience: {
        score: null,
        audience: "familial",
        audience_match: null,
        vulnerability_tone: "n/a",
        tone_score: null
      }
    },

    context: {
      location_type: "public",
      photographer: "parent",
      intention: "documentation"
    },

    notes: "Before I knew I was building a self. Just existing.",
    contradictions: null,
    position: null,
    color_palette: ["#8FBC8F", "#F5DEB3", "#87CEEB"],
    visual_similarity_ids: ["img_005", "img_012"]
  },

  {
    id: "img_004",
    src: "images/img_004.jpg",
    title: "Mindmap from childhood",
    year: 2007,
    date: "2007-06-12",
    aspect_ratio: "3:2",

    thematic: {
      categories: ["nostalgia", "notes"],
      emotional_tags: ["wonder"],
      lost_found: "found",
      thematic_weights: { nostalgia: 0.6, play: 0.4 }
    },

    brand_compliance: {
      overall_score: null,
      visual_identity: {
        score: null,
        color_palette: "n/a",
        composition: "n/a",
        lighting: "n/a"
      },
      ritual_behavioral: {
        score: null,
        authenticity: null,
        ritual_documentation: null,
        ritual_name: "none",
        performance_type: "authentic"
      },
      voice_audience: {
        score: null,
        audience: "familial",
        audience_match: null,
        vulnerability_tone: "n/a",
        tone_score: null
      }
    },

    context: {
      location_type: "public",
      photographer: "Self",
      intention: "documentation"
    },

    notes: "Before I knew I was building a self. Just existing.",
    contradictions: null,
    position: null,
    color_palette: ["#8FBC8F", "#F5DEB3", "#87CEEB"],
    visual_similarity_ids: ["img_001", "img_002"]
  },

  {
    id: "img_005",
    src: "images/img_005.jpg",
    title: "Mindmap from childhood",
    year: 2007,
    date: "2007-06-12",
    aspect_ratio: "3:2",

    thematic: {
      categories: ["nostalgia", "play"],
      emotional_tags: ["wonder"],
      lost_found: "found",
      thematic_weights: { nostalgia: 0.6, play: 0.4 }
    },

    brand_compliance: {
      overall_score: null,
      visual_identity: {
        score: null,
        color_palette: "n/a",
        composition: "n/a",
        lighting: "n/a"
      },
      ritual_behavioral: {
        score: null,
        authenticity: null,
        ritual_documentation: null,
        ritual_name: "none",
        performance_type: "authentic"
      },
      voice_audience: {
        score: null,
        audience: "familial",
        audience_match: null,
        vulnerability_tone: "n/a",
        tone_score: null
      }
    },

    context: {
      location_type: "public",
      photographer: "Self",
      intention: "documentation"
    },

    notes: "Before I knew I was building a self. Just existing.",
    contradictions: null,
    position: null,
    color_palette: ["#8FBC8F", "#F5DEB3", "#87CEEB"],
    visual_similarity_ids: ["img_001", "img_002"]
  },

  {
    id: "img_006",
    src: "images/img_006.jpg",
    title: "Mindmap from childhood",
    year: 2007,
    date: "2007-06-12",
    aspect_ratio: "3:2",

    thematic: {
      categories: ["nostalgia", "play"],
      emotional_tags: ["wonder"],
      lost_found: "found",
      thematic_weights: { nostalgia: 0.6, play: 0.4 }
    },

    brand_compliance: {
      overall_score: null,
      visual_identity: {
        score: null,
        color_palette: "n/a",
        composition: "n/a",
        lighting: "n/a"
      },
      ritual_behavioral: {
        score: null,
        authenticity: null,
        ritual_documentation: null,
        ritual_name: "none",
        performance_type: "authentic"
      },
      voice_audience: {
        score: null,
        audience: "familial",
        audience_match: null,
        vulnerability_tone: "n/a",
        tone_score: null
      }
    },

    context: {
      location_type: "public",
      photographer: "Self",
      intention: "documentation"
    },

    notes: "Before I knew I was building a self. Just existing.",
    contradictions: null,
    position: null,
    color_palette: ["#8FBC8F", "#F5DEB3", "#87CEEB"],
    visual_similarity_ids: ["img_001", "img_002"]
  },

  {
    id: "img_007",
    src: "images/img_007.jpg",
    title: "Mindmap from childhood",
    year: 2007,
    date: "2007-06-12",
    aspect_ratio: "3:2",

    thematic: {
      categories: ["nostalgia", "notes"],
      emotional_tags: ["wonder"],
      lost_found: "found",
      thematic_weights: { nostalgia: 0.6, play: 0.4 }
    },

    brand_compliance: {
      overall_score: null,
      visual_identity: {
        score: null,
        color_palette: "n/a",
        composition: "n/a",
        lighting: "n/a"
      },
      ritual_behavioral: {
        score: null,
        authenticity: null,
        ritual_documentation: null,
        ritual_name: "none",
        performance_type: "authentic"
      },
      voice_audience: {
        score: null,
        audience: "familial",
        audience_match: null,
        vulnerability_tone: "n/a",
        tone_score: null
      }
    },

    context: {
      location_type: "public",
      photographer: "Self",
      intention: "documentation"
    },

    notes: "Before I knew I was building a self. Just existing.",
    contradictions: null,
    position: null,
    color_palette: ["#8FBC8F", "#F5DEB3", "#87CEEB"],
    visual_similarity_ids: ["img_001", "img_002"]
  },

  {
    id: "img_008",
    src: "images/img_008.jpg",
    title: "Summer rituals",
    year: 2008,
    date: "2008-07-22",
    aspect_ratio: "4:3",

    thematic: {
      categories: ["moments", "nostalgia"],
      emotional_tags: ["playfulness", "innocence"],
      lost_found: "found",
      thematic_weights: { moments: 0.5, nostalgia: 0.5 }
    },

    brand_compliance: {
      overall_score: null,
      visual_identity: {
        score: null,
        color_palette: "n/a",
        composition: "n/a",
        lighting: "n/a"
      },
      ritual_behavioral: {
        score: null,
        authenticity: null,
        ritual_documentation: null,
        ritual_name: "none",
        performance_type: "authentic"
      },
      voice_audience: {
        score: null,
        audience: "familial",
        audience_match: null,
        vulnerability_tone: "n/a",
        tone_score: null
      }
    },

    context: {
      location_type: "private",
      photographer: "parent",
      intention: "documentation"
    },

    notes: "Unburdened joy. The kind that doesn't need validation.",
    contradictions: null,
    position: null,
    color_palette: ["#FFD700", "#FF6347", "#FFFFFF"],
    visual_similarity_ids: ["img_003", "img_015"]
  },

  {
    id: "img_009",
    src: "images/img_009.jpg",
    title: "Self-portrait experiment",
    year: 2015,
    date: "2015-11-03",
    aspect_ratio: "1:1",

    thematic: {
      categories: ["faces", "identity"],
      emotional_tags: ["curiosity", "awkwardness"],
      lost_found: "found",
      thematic_weights: { faces: 0.7, identity: 0.3 }
    },

    brand_compliance: {
      overall_score: 0.52,
      visual_identity: {
        score: 0.50,
        color_palette: "adequate",
        composition: "experimental",
        lighting: "natural"
      },
      ritual_behavioral: {
        score: 0.55,
        authenticity: 0.45,
        ritual_documentation: 0.60,
        ritual_name: "Mirror experiments",
        performance_type: "ambiguous"
      },
      voice_audience: {
        score: 0.50,
        audience: "private",
        audience_match: 0.55,
        vulnerability_tone: "cautious",
        tone_score: 0.50
      }
    },

    context: {
      location_type: "private",
      photographer: "self",
      intention: "exploration"
    },

    notes: "First time trying to see myself as others might. Uncomfortable.",
    contradictions: null,
    position: null,
    color_palette: ["#4A4A4A", "#D4D4D4", "#8B6F47"],
    visual_similarity_ids: ["img_044", "img_078"]
  },

  {
    id: "img_010",
    src: "images/img_010.jpg",
    title: "Coffee shop afternoons",
    year: 2016,
    date: "2016-02-14",
    aspect_ratio: "16:9",

    thematic: {
      categories: ["moments", "belonging"],
      emotional_tags: ["solitude", "presence"],
      lost_found: "found",
      thematic_weights: { moments: 0.6, belonging: 0.4 }
    },

    brand_compliance: {
      overall_score: 0.78,
      visual_identity: {
        score: 0.80,
        color_palette: "compliant",
        composition: "strong",
        lighting: "warm"
      },
      ritual_behavioral: {
        score: 0.75,
        authenticity: 0.80,
        ritual_documentation: 0.70,
        ritual_name: "Daily rituals",
        performance_type: "authentic"
      },
      voice_audience: {
        score: 0.80,
        audience: "solitude",
        audience_match: 0.85,
        vulnerability_tone: "honest",
        tone_score: 0.75
      }
    },

    context: {
      location_type: "semi-public",
      photographer: "self",
      intention: "documentation"
    },

    notes: "The ritual became more important than the coffee.",
    contradictions: null,
    position: null,
    color_palette: ["#8B7355", "#D2B48C", "#5F4E37"],
    visual_similarity_ids: ["img_001", "img_045"]
  },

  {
    id: "img_011",
    src: "images/img_011.jpg",
    title: "Typography studies",
    year: 2011,
    date: "2011-05-20",
    aspect_ratio: "1:1",

    thematic: {
      categories: ["notes", "observations"],
      emotional_tags: ["curiosity"],
      lost_found: "found",
      thematic_weights: { notes: 0.8, observations: 0.2 }
    },

    brand_compliance: {
      overall_score: null,
      visual_identity: {
        score: null,
        color_palette: "n/a",
        composition: "n/a",
        lighting: "n/a"
      },
      ritual_behavioral: {
        score: null,
        authenticity: null,
        ritual_documentation: null,
        ritual_name: "none",
        performance_type: "authentic"
      },
      voice_audience: {
        score: null,
        audience: "private",
        audience_match: null,
        vulnerability_tone: "n/a",
        tone_score: null
      }
    },

    context: {
      location_type: "private",
      photographer: "self",
      intention: "exploration"
    },

    notes: "Letters started looking like faces. Finding patterns everywhere.",
    contradictions: null,
    position: null,
    color_palette: ["#2C3E50", "#ECF0F1", "#3498DB"],
    visual_similarity_ids: ["img_004", "img_056"]
  },

  {
    id: "img_012",
    src: "images/img_012.jpg",
    title: "Hands at work",
    year: 2018,
    date: "2018-03-08",
    aspect_ratio: "2:3",

    thematic: {
      categories: ["moments", "ritual"],
      emotional_tags: ["focus", "presence"],
      lost_found: "found",
      thematic_weights: { moments: 0.5, ritual: 0.5 }
    },

    brand_compliance: {
      overall_score: 0.81,
      visual_identity: {
        score: 0.85,
        color_palette: "compliant",
        composition: "strong",
        lighting: "signature"
      },
      ritual_behavioral: {
        score: 0.80,
        authenticity: 0.85,
        ritual_documentation: 0.75,
        ritual_name: "Making protocol",
        performance_type: "authentic"
      },
      voice_audience: {
        score: 0.80,
        audience: "solitude",
        audience_match: 0.80,
        vulnerability_tone: "honest",
        tone_score: 0.75
      }
    },

    context: {
      location_type: "private",
      photographer: "self",
      intention: "documentation"
    },

    notes: "The work becomes meditation when no one is watching.",
    contradictions: null,
    position: null,
    color_palette: ["#B8860B", "#D3D3D3", "#696969"],
    visual_similarity_ids: ["img_034", "img_067"]
  },

  {
    id: "img_013",
    src: "images/img_013.jpg",
    title: "Garden in spring",
    year: 2009,
    date: "2009-04-15",
    aspect_ratio: "3:2",

    thematic: {
      categories: ["nature", "nostalgia"],
      emotional_tags: ["renewal", "hope"],
      lost_found: "found",
      thematic_weights: { nature: 0.7, nostalgia: 0.3 }
    },

    brand_compliance: {
      overall_score: null,
      visual_identity: {
        score: null,
        color_palette: "n/a",
        composition: "n/a",
        lighting: "n/a"
      },
      ritual_behavioral: {
        score: null,
        authenticity: null,
        ritual_documentation: null,
        ritual_name: "none",
        performance_type: "authentic"
      },
      voice_audience: {
        score: null,
        audience: "familial",
        audience_match: null,
        vulnerability_tone: "n/a",
        tone_score: null
      }
    },

    context: {
      location_type: "semi-private",
      photographer: "parent",
      intention: "documentation"
    },

    notes: "Life cycle captured in one frame.",
    contradictions: null,
    position: null,
    color_palette: ["#228B22", "#FFB6C1", "#F0FFFF"],
    visual_similarity_ids: ["img_008", "img_099"]
  },

  {
    id: "img_014",
    src: "images/img_014.jpg",
    title: "Mirror study #1",
    year: 2017,
    date: "2017-08-10",
    aspect_ratio: "1:1",

    thematic: {
      categories: ["faces", "identity"],
      emotional_tags: ["introspection", "uncertainty"],
      lost_found: "found",
      thematic_weights: { faces: 0.6, identity: 0.4 }
    },

    brand_compliance: {
      overall_score: 0.64,
      visual_identity: {
        score: 0.65,
        color_palette: "somewhat compliant",
        composition: "experimental",
        lighting: "natural"
      },
      ritual_behavioral: {
        score: 0.60,
        authenticity: 0.55,
        ritual_documentation: 0.65,
        ritual_name: "Self study",
        performance_type: "ambiguous"
      },
      voice_audience: {
        score: 0.65,
        audience: "private",
        audience_match: 0.60,
        vulnerability_tone: "exploratory",
        tone_score: 0.65
      }
    },

    context: {
      location_type: "private",
      photographer: "self",
      intention: "exploration"
    },

    notes: "Who are you when no one is looking?",
    contradictions: null,
    position: null,
    color_palette: ["#36454F", "#BEBEBE", "#8B6F47"],
    visual_similarity_ids: ["img_009", "img_058"]
  },

  {
    id: "img_015",
    src: "images/img_015.jpg",
    title: "Playground revisited",
    year: 2010,
    date: "2010-06-03",
    aspect_ratio: "4:3",

    thematic: {
      categories: ["nostalgia", "play"],
      emotional_tags: ["melancholy", "wonder"],
      lost_found: "found",
      thematic_weights: { nostalgia: 0.7, play: 0.3 }
    },

    brand_compliance: {
      overall_score: null,
      visual_identity: {
        score: null,
        color_palette: "n/a",
        composition: "n/a",
        lighting: "n/a"
      },
      ritual_behavioral: {
        score: null,
        authenticity: null,
        ritual_documentation: null,
        ritual_name: "none",
        performance_type: "authentic"
      },
      voice_audience: {
        score: null,
        audience: "familial",
        audience_match: null,
        vulnerability_tone: "n/a",
        tone_score: null
      }
    },

    context: {
      location_type: "public",
      photographer: "self",
      intention: "documentation"
    },

    notes: "Childhood places hold ghosts of former selves.",
    contradictions: null,
    position: null,
    color_palette: ["#FF6B6B", "#4ECDC4", "#FFE66D"],
    visual_similarity_ids: ["img_008", "img_013"]
  },

  {
    id: "img_016",
    src: "images/img_016.jpg",
    title: "Window light",
    year: 2019,
    date: "2019-01-22",
    aspect_ratio: "2:3",

    thematic: {
      categories: ["moments", "light"],
      emotional_tags: ["calm", "presence"],
      lost_found: "found",
      thematic_weights: { moments: 0.5, light: 0.5 }
    },

    brand_compliance: {
      overall_score: 0.83,
      visual_identity: {
        score: 0.85,
        color_palette: "compliant",
        composition: "signature",
        lighting: "signature"
      },
      ritual_behavioral: {
        score: 0.82,
        authenticity: 0.80,
        ritual_documentation: 0.85,
        ritual_name: "Light studies",
        performance_type: "authentic"
      },
      voice_audience: {
        score: 0.82,
        audience: "solitude",
        audience_match: 0.85,
        vulnerability_tone: "honest",
        tone_score: 0.80
      }
    },

    context: {
      location_type: "private",
      photographer: "self",
      intention: "observation"
    },

    notes: "Light is the most honest subject.",
    contradictions: null,
    position: null,
    color_palette: ["#F5F5DC", "#D3D3D3", "#696969"],
    visual_similarity_ids: ["img_010", "img_089"]
  },

  {
    id: "img_017",
    src: "images/img_017.jpg",
    title: "Text collage",
    year: 2012,
    date: "2012-09-15",
    aspect_ratio: "1:1",

    thematic: {
      categories: ["notes", "messages"],
      emotional_tags: ["searching", "meaning-making"],
      lost_found: "found",
      thematic_weights: { notes: 0.7, messages: 0.3 }
    },

    brand_compliance: {
      overall_score: null,
      visual_identity: {
        score: null,
        color_palette: "n/a",
        composition: "n/a",
        lighting: "n/a"
      },
      ritual_behavioral: {
        score: null,
        authenticity: null,
        ritual_documentation: null,
        ritual_name: "none",
        performance_type: "authentic"
      },
      voice_audience: {
        score: null,
        audience: "private",
        audience_match: null,
        vulnerability_tone: "n/a",
        tone_score: null
      }
    },

    context: {
      location_type: "private",
      photographer: "self",
      intention: "exploration"
    },

    notes: "Assembling meaning from fragments. Still.",
    contradictions: null,
    position: null,
    color_palette: ["#2C3E50", "#E74C3C", "#ECF0F1"],
    visual_similarity_ids: ["img_011", "img_062"]
  },

  {
    id: "img_018",
    src: "images/img_018.jpg",
    title: "Group photo memory",
    year: 2013,
    date: "2013-07-28",
    aspect_ratio: "3:2",

    thematic: {
      categories: ["faces", "belonging"],
      emotional_tags: ["connection", "transience"],
      lost_found: "found",
      thematic_weights: { faces: 0.5, belonging: 0.5 }
    },

    brand_compliance: {
      overall_score: 0.45,
      visual_identity: {
        score: 0.50,
        color_palette: "somewhat compliant",
        composition: "adequate",
        lighting: "inconsistent"
      },
      ritual_behavioral: {
        score: 0.45,
        authenticity: 0.40,
        ritual_documentation: 0.50,
        ritual_name: "Social gathering",
        performance_type: "performed"
      },
      voice_audience: {
        score: 0.42,
        audience: "group",
        audience_match: 0.45,
        vulnerability_tone: "guarded",
        tone_score: 0.40
      }
    },

    context: {
      location_type: "semi-public",
      photographer: "other",
      intention: "documentation"
    },

    notes: "Everyone looked happy. I was thinking about leaving.",
    contradictions: ["Visual: Inconsistent lighting", "Behavioral: Performed joy", "Voice: Disconnected from group energy"],
    position: null,
    color_palette: ["#87CEEB", "#F0E68C", "#B0E0E6"],
    visual_similarity_ids: ["img_002", "img_084"]
  },

  {
    id: "img_019",
    src: "images/img_019.jpg",
    title: "Night reflections",
    year: 2020,
    date: "2020-11-15",
    aspect_ratio: "16:9",

    thematic: {
      categories: ["moments", "introspection"],
      emotional_tags: ["uncertainty", "searching"],
      lost_found: "lost",
      thematic_weights: { moments: 0.4, introspection: 0.6 }
    },

    brand_compliance: {
      overall_score: 0.38,
      visual_identity: {
        score: 0.35,
        color_palette: "deviant",
        composition: "unfocused",
        lighting: "off-brand"
      },
      ritual_behavioral: {
        score: 0.40,
        authenticity: 0.35,
        ritual_documentation: 0.45,
        ritual_name: "pandemic scrolling",
        performance_type: "performed"
      },
      voice_audience: {
        score: 0.38,
        audience: "public",
        audience_match: 0.30,
        vulnerability_tone: "performative",
        tone_score: 0.40
      }
    },

    context: {
      location_type: "private",
      photographer: "self",
      intention: "catharsis"
    },

    notes: "3am thoughts. Posted at 6am. Deleted by noon.",
    contradictions: ["Visual: Blurred, rushed", "Behavioral: Authentic despair, performed recovery", "Voice: Raw honesty deleted for public image"],
    position: null,
    color_palette: ["#1a1a2e", "#16213e", "#0f3460"],
    visual_similarity_ids: ["img_082", "img_095"]
  },

  {
    id: "img_020",
    src: "images/img_020.jpg",
    title: "Morning ritual",
    year: 2017,
    date: "2017-02-14",
    aspect_ratio: "1:1",

    thematic: {
      categories: ["ritual", "moments"],
      emotional_tags: ["routine", "peace"],
      lost_found: "found",
      thematic_weights: { ritual: 0.6, moments: 0.4 }
    },

    brand_compliance: {
      overall_score: 0.79,
      visual_identity: {
        score: 0.80,
        color_palette: "compliant",
        composition: "strong",
        lighting: "signature"
      },
      ritual_behavioral: {
        score: 0.78,
        authenticity: 0.82,
        ritual_documentation: 0.75,
        ritual_name: "Morning Protocol",
        performance_type: "authentic"
      },
      voice_audience: {
        score: 0.80,
        audience: "solitude",
        audience_match: 0.82,
        vulnerability_tone: "honest",
        tone_score: 0.78
      }
    },

    context: {
      location_type: "private",
      photographer: "self",
      intention: "documentation"
    },

    notes: "Same cup. Same light. Different versions of me.",
    contradictions: null,
    position: null,
    color_palette: ["#8B7355", "#FFFACD", "#D2B48C"],
    visual_similarity_ids: ["img_001", "img_010"]
  }
];

// NOTE: Added entries through img_020 (13 entries total through this point)
// Continue adding entries img_021 through img_112 using similar patterns
// Mix pre-guideline (before 2016, null scores) with post-guideline entries
// Vary thematic categories, emotional tags, and compliance levels
// Include high-compliance (0.80+), mid-compliance (0.45-0.79), and low-compliance (below 0.45) entries
// Mix authentic, ambiguous, and performed entries
// Vary audiences: solitude, familial, group, public, semi-public

if (typeof module !== 'undefined' && module.exports) {
  module.exports = imageData;
}
