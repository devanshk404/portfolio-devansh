export type Experiment = {
  id: string;
  title: string;
  type: string;
  concept: string;
  image: string;
  video?: string;
  tools: string[];
  notes: string;
  status: string;
};

/** These entries describe concepts. No finished output or particular tool usage is claimed. */
export const experiments: Experiment[] = [
  {
    id: "crystal-ball",
    title: "The Wizard's Crystal Ball",
    type: "Cinematic experiment",
    concept:
      "An imagined world built around a wizard's crystal ball. A study in atmosphere, mystery, and visual storytelling.",
    image: "/placeholders/lab-crystal.svg",
    tools: ["Production tools to be added"],
    notes:
      "Concept supplied; finished media and production details are pending. This illustration is a placeholder, not a frame from a finished film.",
    status: "Draft / media pending",
  },
  {
    id: "indian-wedding",
    title: "Experimental Indian Wedding Film",
    type: "Film concept",
    concept:
      "An experimental take on the visual language of an Indian wedding, explored through cinematic imagery.",
    image: "/placeholders/lab-wedding.svg",
    tools: ["Production tools to be added"],
    notes:
      "Add the actual film, concept notes, credits, and process here. Current artwork is placeholder media.",
    status: "Draft / media pending",
  },
  {
    id: "gaming-club",
    title: "Underground Gaming Club",
    type: "World-building experiment",
    concept:
      "A gaming-club concept exploring the atmosphere of shared screens, late nights, and underground spaces.",
    image: "/placeholders/lab-gaming.svg",
    tools: ["Production tools to be added"],
    notes:
      "Add the real output and the process behind it. No finished film, event, or operating club is implied.",
    status: "Draft / media pending",
  },
  {
    id: "world-cup-anime",
    title: "World Cup Anime",
    type: "Visual storytelling concept",
    concept:
      "A World Cup concept through the heightened visual language of anime. An independent creative exploration.",
    image: "/placeholders/lab-anime.svg",
    tools: ["Production tools to be added"],
    notes:
      "Original output and development notes are pending. This is not an official sports campaign or a commissioned brand project.",
    status: "Draft / media pending",
  },
  {
    id: "arjuna",
    title: "Arjuna Cinematic Concept",
    type: "Cinematic experiment",
    concept:
      "An Arjuna-inspired visual concept exploring scale, character, and cinematic atmosphere.",
    image: "/placeholders/lab-arjuna.svg",
    tools: ["Production tools to be added"],
    notes:
      "Add the experiment's actual visuals, context, and production process. Current illustration is a placeholder.",
    status: "Draft / media pending",
  },
  {
    id: "characters",
    title: "AI Character Experiments",
    type: "Character exploration",
    concept:
      "A space for experiments in character development, visual identity, and AI-assisted creative production.",
    image: "/placeholders/lab-character.svg",
    tools: ["Production tools to be added"],
    notes:
      "Selected characters and process notes have not been supplied. Add original work and identify the tools actually used.",
    status: "Draft / media pending",
  },
  {
    id: "creative-agents",
    title: "Autonomous Creative Agent Experiments",
    type: "Creative technology",
    concept:
      "Explorations around creative workflows and autonomous agents. A place to question what useful collaboration with tools could look like.",
    image: "/placeholders/lab-agent.svg",
    tools: ["Development tools to be added"],
    notes:
      "Prototype details, code, and results are pending. No working autonomous system or finished capability is claimed.",
    status: "Draft / details pending",
  },
  {
    id: "technical-prototypes",
    title: "Technical Prototypes",
    type: "Engineering playground",
    concept:
      "A small archive for technical experiments, from earlier engineering explorations to future creative tools.",
    image: "/placeholders/lab-code.svg",
    tools: ["Development tools to be added"],
    notes:
      "Add individual prototypes, screenshots, repositories, and honest development status. Current image is placeholder artwork.",
    status: "Draft / details pending",
  },
];
