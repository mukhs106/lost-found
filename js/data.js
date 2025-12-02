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
    src: "images/2023/morning_ritual.jpg",
    title: "Morning coffee ritual",
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
    src: "images/2020/social_media_selfie.jpg",
    title: "Curated self-portrait",
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
    src: "images/2007/childhood_insects.jpg",
    title: "Ladybug observation",
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
  }

  // NOTE: This is a starter file with 3 sample entries
  // You need to add 109 more entries (img_004 through img_112)
  // Follow the same structure above
  // Mix compliance levels, themes, performance types, and audiences
  // Include pre-guideline images (pre-2016) with overall_score: null
  // Vary aspect_ratios: "1:1", "3:2", "2:3", "16:9", "9:16", etc.
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = imageData;
}
