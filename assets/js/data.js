/**
 * DATA.JS - Image Collection & Metadata
 *
 * This is the central data store for all memories in the archive.
 * Each entry represents one image with its associated metadata.
 *
 * To add new images:
 * 1. Add SVG file to assets/images/ (e.g., image031.svg)
 * 2. Create new entry object following the structure below
 * 3. Refresh the page - the image will appear in the archive
 *
 * Memory State: "lost" = distant/fragmented, "found" = present/integrated
 */

const MEMORIES = [
    {
        id: 1,
        title: "First Light",
        filename: "image001.svg",
        year: 1990,
        themes: ["moments", "childhood"],
        entry: "The earliest memory, barely there. A rectangle of sunlight on a wall. The feeling of being small.",
        memoryState: "lost",
        noteContent: null
    },
    {
        id: 2,
        title: "Notes on Disappearing",
        filename: "image002.svg",
        year: 2024,
        themes: ["notes", "limbo"],
        entry: "Written in the space between knowing and forgetting.",
        memoryState: "found",
        noteContent: "Sometimes I write to remember. Sometimes I write to forget. The act of putting words on a page feels like building a bridge to nowhere—or maybe building a bridge is the point, not the destination. These notes are attempts at capturing what slips away the moment I try to hold it."
    },
    {
        id: 3,
        title: "Mother's Hands",
        filename: "image003.svg",
        year: 1995,
        themes: ["faces", "belonging"],
        entry: "I don't remember her face clearly anymore, but I remember her hands. How they moved when she spoke.",
        memoryState: "lost",
        noteContent: null
    },
    {
        id: 4,
        title: "The Blue Bicycle",
        filename: "image004.svg",
        year: 1998,
        themes: ["play", "nostalgia"],
        entry: "Training wheels off. The terrifying freedom of balance. The whole street stretched out like possibility.",
        memoryState: "found",
        noteContent: null
    },
    {
        id: 5,
        title: "Waiting Room",
        filename: "image005.svg",
        year: 2003,
        themes: ["limbo", "moments"],
        entry: "Fluorescent lights. Magazines from three years ago. The particular silence of places where people wait for news.",
        memoryState: "lost",
        noteContent: null
    },
    {
        id: 6,
        title: "First Kiss (or Something Like It)",
        filename: "image006.svg",
        year: 2005,
        themes: ["moments", "change"],
        entry: "Awkward and brief. Behind the gym. The smell of cut grass and nervousness.",
        memoryState: "found",
        noteContent: null
    },
    {
        id: 7,
        title: "Grandmother's Kitchen",
        filename: "image007.svg",
        year: 1993,
        themes: ["nostalgia", "belonging"],
        entry: "The yellow linoleum. The radio always on. How certain rooms become entire worlds when you're young.",
        memoryState: "lost",
        noteContent: null
    },
    {
        id: 8,
        title: "Moving Day",
        filename: "image008.svg",
        year: 2010,
        themes: ["change", "limbo"],
        entry: "Everything you own in boxes. The strange emptiness of rooms you thought you knew.",
        memoryState: "found",
        noteContent: null
    },
    {
        id: 9,
        title: "Self-Portrait in a Hotel Mirror",
        filename: "image009.svg",
        year: 2015,
        themes: ["faces", "limbo"],
        entry: "Traveling for work. Staring at a version of myself that looked like a stranger. The unsettling anonymity of identical rooms.",
        memoryState: "found",
        noteContent: null
    },
    {
        id: 10,
        title: "The Last Day of School",
        filename: "image010.svg",
        year: 2001,
        themes: ["play", "nostalgia", "change"],
        entry: "Yearbooks signed with promises we'd never keep. The particular sweetness of endings before you understand what they mean.",
        memoryState: "lost",
        noteContent: null
    },
    {
        id: 11,
        title: "Insomnia Notes",
        filename: "image011.svg",
        year: 2022,
        themes: ["notes", "limbo"],
        entry: "3am thoughts, barely legible.",
        memoryState: "found",
        noteContent: "The ceiling fan makes a clicking sound I never notice during the day. At night it's deafening. I think about all the versions of myself I've been—the child, the teenager, the adult pretending to have answers. Are they all still in here somewhere? Or did I leave them behind like old clothes that don't fit anymore?"
    },
    {
        id: 12,
        title: "Father, Distant",
        filename: "image012.svg",
        year: 1997,
        themes: ["faces", "nostalgia"],
        entry: "Standing in the doorway, backlit. A silhouette more than a person. I don't remember what we talked about.",
        memoryState: "lost",
        noteContent: null
    },
    {
        id: 13,
        title: "Dancing Alone",
        filename: "image013.svg",
        year: 2018,
        themes: ["play", "moments"],
        entry: "Kitchen. Late afternoon. Song I'd forgotten I loved. The joy of being unobserved.",
        memoryState: "found",
        noteContent: null
    },
    {
        id: 14,
        title: "The Breakup",
        filename: "image014.svg",
        year: 2012,
        themes: ["change", "moments"],
        entry: "Coffee shop. Two hours of careful words. The relief and devastation arriving at the same time.",
        memoryState: "found",
        noteContent: null
    },
    {
        id: 15,
        title: "Snow Day",
        filename: "image015.svg",
        year: 2000,
        themes: ["play", "nostalgia"],
        entry: "School cancelled. The city transformed overnight. Building forts that would melt by tomorrow.",
        memoryState: "lost",
        noteContent: null
    },
    {
        id: 16,
        title: "Job Interview",
        filename: "image016.svg",
        year: 2014,
        themes: ["limbo", "change"],
        entry: "Waiting room. Twenty-third floor. Rehearsing answers to questions I'd been asked before. Pretending to be the person they wanted.",
        memoryState: "found",
        noteContent: null
    },
    {
        id: 17,
        title: "Family Dinner (Thanksgiving)",
        filename: "image017.svg",
        year: 2008,
        themes: ["belonging", "faces"],
        entry: "The table too small for everyone. Conversations overlapping. The particular chaos of people who know each other too well.",
        memoryState: "found",
        noteContent: null
    },
    {
        id: 18,
        title: "Driving at Night",
        filename: "image018.svg",
        year: 2016,
        themes: ["moments", "limbo"],
        entry: "Highway empty. Radio static between stations. That feeling of being between one place and another, one version of yourself and the next.",
        memoryState: "found",
        noteContent: null
    },
    {
        id: 19,
        title: "Grief Notes",
        filename: "image019.svg",
        year: 2019,
        themes: ["notes", "change"],
        entry: "Written in the weeks after. An attempt to make sense of absence.",
        memoryState: "found",
        noteContent: "Loss isn't one moment. It's a thousand small moments stretched across time. The first time you reach for the phone to call them and remember you can't. The way certain songs become unbearable. How their absence is more present than their presence ever was. I'm writing this down because I'm afraid of forgetting, and afraid of remembering."
    },
    {
        id: 20,
        title: "Birthday, Age 7",
        filename: "image020.svg",
        year: 1994,
        themes: ["play", "nostalgia", "belonging"],
        entry: "Backyard. Cake with too much frosting. Friends whose names I can't quite remember. The year I learned to make wishes.",
        memoryState: "lost",
        noteContent: null
    },
    {
        id: 21,
        title: "Airport Terminal",
        filename: "image021.svg",
        year: 2017,
        themes: ["limbo", "moments"],
        entry: "Delayed flight. Strangers sleeping on the floor. The strange intimacy of shared inconvenience.",
        memoryState: "found",
        noteContent: null
    },
    {
        id: 22,
        title: "Sibling, Younger",
        filename: "image022.svg",
        year: 1996,
        themes: ["faces", "belonging"],
        entry: "The day they were born I became someone else. An older version of myself I didn't know how to be yet.",
        memoryState: "lost",
        noteContent: null
    },
    {
        id: 23,
        title: "College Dorm",
        filename: "image023.svg",
        year: 2006,
        themes: ["change", "belonging"],
        entry: "First week. Trying to seem like the kind of person who belonged there. Everything unfamiliar except the loneliness.",
        memoryState: "found",
        noteContent: null
    },
    {
        id: 24,
        title: "Summer, Endless",
        filename: "image024.svg",
        year: 1999,
        themes: ["play", "nostalgia"],
        entry: "Before summers started feeling short. When three months felt like forever. Bare feet on hot pavement.",
        memoryState: "lost",
        noteContent: null
    },
    {
        id: 25,
        title: "Phone Call at 2am",
        filename: "image025.svg",
        year: 2013,
        themes: ["moments", "change"],
        entry: "The kind of news that divides time into before and after. The sound of my voice trying to stay steady.",
        memoryState: "found",
        noteContent: null
    },
    {
        id: 26,
        title: "Mirror Notes",
        filename: "image026.svg",
        year: 2021,
        themes: ["notes", "faces"],
        entry: "Observations on aging. On becoming.",
        memoryState: "found",
        noteContent: "Every year I look less like the person I thought I'd become and more like someone I'm slowly learning to recognize. The lines around my eyes aren't from smiling, exactly—they're from squinting at things far away, trying to bring them into focus. I'm writing this down because I want to remember that becoming isn't a straight line. It's a series of tiny adjustments, recalibrations, moments of recognition and disorientation."
    },
    {
        id: 27,
        title: "First Apartment",
        filename: "image027.svg",
        year: 2009,
        themes: ["belonging", "change"],
        entry: "Unfurnished. Echo-y. The first place that was entirely mine. The terrifying freedom of empty rooms.",
        memoryState: "found",
        noteContent: null
    },
    {
        id: 28,
        title: "Playground, Abandoned",
        filename: "image028.svg",
        year: 2020,
        themes: ["nostalgia", "limbo"],
        entry: "Went back to the old neighborhood. Swings still there. Chains rusted. The impossible smallness of places you remember as vast.",
        memoryState: "found",
        noteContent: null
    },
    {
        id: 29,
        title: "New Year's Eve, Alone",
        filename: "image029.svg",
        year: 2011,
        themes: ["limbo", "moments"],
        entry: "Intentionally. Not sadly. Watching fireworks from the window. Toasting to the person I might become.",
        memoryState: "found",
        noteContent: null
    },
    {
        id: 30,
        title: "Today",
        filename: "image030.svg",
        year: 2024,
        themes: ["moments", "belonging"],
        entry: "This morning. Coffee. Light through the window. The ordinary made precious by attention.",
        memoryState: "found",
        noteContent: null
    }
];

// Quick Jump Preset Definitions
const QUICK_JUMP_PRESETS = {
    'notes-to-self': {
        themes: ['notes'],
        memoryState: 'both'
    },
    'small-joys': {
        themes: ['play'],
        memoryState: 'found'
    },
    'heavy-shelf': {
        themes: ['change', 'limbo'],
        memoryState: 'both'
    },
    'before-me': {
        timelineRange: { start: 1990, end: 2000 },
        memoryState: 'both'
    },
    'recently-found': {
        memoryState: 'found',
        timelineRange: { start: 2020, end: 2024 }
    },
    'firsts-lasts': {
        themes: ['change', 'moments'],
        memoryState: 'both'
    }
};
