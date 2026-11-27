export type Project = {
  slug: string;
  number: string;
  client: string;
  title: string;
  role: string;
  period: string;
  categories: string[];
  description: string;
  image: string;
  imageAlt?: string;
  /** Omitted means draft. Set false only after replacing and reviewing real content. */
  isDraft?: boolean;
  media?: {
    src: string;
    alt: string;
    caption: string;
    type: "image" | "video";
    poster?: string;
  }[];
  theme: "lime" | "rust" | "blue" | "violet";
  featured: boolean;
  overview: string;
  challenge: string;
  approach: string[];
  execution: string[];
  deliverables: string[];
  outcomes: string;
  reflection: string;
  campaigns: string[];
};

/** All case studies are editable drafts. Illustrations are placeholders, not client deliverables. */
export const projects: Project[] = [
  {
    slug: "superteam-earn",
    number: "01",
    client: "Superteam Earn",
    title: "Making the internet a place where talent gets paid.",
    role: "Social Media Manager / Creative Marketing",
    period: "2024–Present",
    categories: ["Social storytelling", "Creative marketing", "Community"],
    description:
      "Content, campaigns, and social storytelling for a platform connecting global talent with paid opportunities.",
    image: "/placeholders/earn.svg",
    theme: "lime",
    featured: true,
    overview:
      "At Superteam Earn, my work spans social storytelling, content strategy, community engagement, campaign communication, and creative production. This case study will bring together selected contributions across that work.",
    challenge:
      "A platform can offer useful opportunities and still need a clear story around them. The creative question is how to help people understand what is available, why it matters, and where they can take part. Specific campaign briefs will be added here.",
    approach: [
      "Make opportunity easy to understand: lead with the reason someone would care, then make the next step clear.",
      "Connect campaign communication with the language and context of the community.",
      "Editorial draft — add the actual brief, collaborators, constraints, and my contribution for each selected campaign.",
    ],
    execution: [
      "Social storytelling, content strategy, community communication, and creative production form the scope of my role.",
      "Campaign slots below are candidates for the archive. The exact deliverables and my involvement in each need to be confirmed before publication.",
    ],
    deliverables: [
      "Campaign screenshots — media pending",
      "Selected social posts — media pending",
      "Hackathon communication — contribution details pending",
      "Marketing videos — media pending",
      "Launch announcements — media pending",
    ],
    outcomes:
      "Verified performance results to be added. No platform-wide growth is attributed to one person here. Add campaign-specific results, timeframes, source links, and the team's context once confirmed.",
    reflection:
      "Draft reflection: clear communication should help someone find the next useful opportunity. Add a concrete lesson from a selected campaign here.",
    campaigns: [
      "Breakout Hackathon",
      "Cypherpunk Hackathon",
      "Frontier Hackathon",
      "Crypto World's Fair",
      "Earn Pro",
      "Product feature launches",
    ],
  },
  {
    slug: "creative-experiments",
    number: "02",
    client: "Independent experiments",
    title: "Making things that probably didn't need to exist.",
    role: "Creative Direction / Concept Development / AI-assisted Production",
    period: "Ongoing experiments",
    categories: ["Filmmaking", "Visual ideas", "Creative technology"],
    description:
      "Unusual visual ideas, imagined worlds, and cinematic experiments. Curiosity is the brief.",
    image: "/placeholders/experiments.svg",
    theme: "rust",
    featured: true,
    overview:
      "A collection of independent concepts exploring filmmaking, visual direction, storytelling, and AI-assisted creative production. These are personal experiments, rather than commissioned brand work.",
    challenge:
      "What does an idea look like once it leaves your head? This collection makes room to explore visual worlds and unexpected concepts without forcing every experiment into a commercial brief.",
    approach: [
      "Start with an image, a scene, or a question worth following.",
      "Explore the visual language and story before choosing production tools.",
      "Draft process — add original sketches, references, iterations, and credits when the work is ready to show.",
    ],
    execution: [
      "The collection includes concepts for The Wizard's Crystal Ball, an Indian Wedding Film, an Underground Gaming Club, World Cup Anime, and an Arjuna-inspired cinematic experiment.",
      "Finished media, production details, collaborators, and individual project status have not been supplied. The artwork shown here is a designed placeholder.",
    ],
    deliverables: [
      "Concept frames — media pending",
      "Selected film excerpts — media pending",
      "Storyboards and process notes — pending",
    ],
    outcomes:
      "An evolving personal archive. No client, audience, award, or performance claims are made. Add finished outputs and verified release details when available.",
    reflection:
      "Draft reflection: experimentation creates space to try a visual idea before knowing whether it will work. Replace this with a first-hand lesson from the production process.",
    campaigns: [
      "The Wizard's Crystal Ball",
      "Indian Wedding Film",
      "Underground Gaming Club",
      "World Cup Anime Concept",
      "Arjuna-inspired Cinematic Experiment",
    ],
  },
  {
    slug: "coindcx",
    number: "03",
    client: "CoinDCX · via One Hand Clap",
    title: "Making crypto conversations feel more human.",
    role: "Social Media / Content / Campaigns",
    period: "2024",
    categories: ["Social media", "Copywriting", "Campaigns"],
    description:
      "Social, content, and campaign work on the CoinDCX account during my time at One Hand Clap.",
    image: "/placeholders/coindcx.svg",
    theme: "blue",
    featured: true,
    overview:
      "I worked on the CoinDCX account during my time as a Junior Creative Associate at One Hand Clap. This is account and campaign work within that agency role, rather than a separate full-time position at CoinDCX.",
    challenge:
      "Crypto conversations can become technical quickly. The creative opportunity is to communicate in a way people can follow without losing the substance. The specific client briefs and audience context will be added here.",
    approach: [
      "Look for an accessible angle into the topic and write for the person on the other side of the screen.",
      "Consider tone, cultural context, and the role of each social format.",
      "Draft approach — add the approved strategy, team credits, and exact responsibilities from the selected work.",
    ],
    execution: [
      "The archive is reserved for social campaigns, content strategy, campaign concepts, brand communication, and selected posts.",
      "Campaign names and individual deliverables will be included only after confirming attribution and permission to show the work.",
    ],
    deliverables: [
      "Social campaign artwork — media pending",
      "Selected copy and posts — media pending",
      "Campaign concepts — details pending",
      "Brand communication — approved examples pending",
    ],
    outcomes:
      "Results pending verification. Add only documented campaign outcomes, with dates and context. No client growth or financial performance claims are included.",
    reflection:
      "Draft reflection: a complex subject still needs a clear way in. Add a specific learning from the account work and credit the team involved.",
    campaigns: [],
  },
  {
    slug: "asgard-finance",
    number: "04",
    client: "Asgard Finance",
    title: "Building narratives around financial products.",
    role: "Growth / Marketing Contractor",
    period: "2025–Present",
    categories: ["Growth strategy", "Brand storytelling", "Marketing"],
    description:
      "Growth, marketing, and brand storytelling at the intersection of a financial product and its audience.",
    image: "/placeholders/asgard.svg",
    theme: "violet",
    featured: true,
    overview:
      "My role at Asgard Finance brings together growth, marketing, and brand storytelling. This case study is an editable home for selected campaigns, communication, and product narratives.",
    challenge:
      "A financial product needs an understandable story around what it does and who it is for. Specific product context, campaign briefs, and audience insights have not yet been supplied.",
    approach: [
      "Find a clear connection between product context and audience needs.",
      "Bring growth thinking and brand narrative into the same conversation.",
      "Draft approach — add the actual strategy, channels, testing process, and my responsibilities once confirmed.",
    ],
    execution: [
      "Selected marketing assets, campaign communication, and narrative work will be added to this archive.",
      "The visual shown here is a placeholder study, not approved Asgard Finance brand or campaign artwork.",
    ],
    deliverables: [
      "Campaign assets — media pending",
      "Product narrative examples — pending",
      "Marketing communication — approved examples pending",
    ],
    outcomes:
      "Verified results to be added. Include the relevant campaign, timeframe, measurement source, and team contribution rather than broad growth claims.",
    reflection:
      "Draft reflection: a useful product story should make the next question easier to ask. Add a concrete learning from this work before publication.",
    campaigns: [],
  },
  {
    slug: "vorld",
    number: "05",
    client: "VORLD",
    title: "Content with a community in mind.",
    role: "Content & Community",
    period: "December 2024–February 2025",
    categories: ["Content", "Community"],
    description:
      "Content and community work at VORLD. Selected contributions will be added to the archive.",
    image: "/placeholders/earn.svg",
    theme: "lime",
    featured: false,
    overview:
      "I worked in Content & Community at VORLD from December 2024 to February 2025. Detailed responsibilities and selected contributions are still to be added.",
    challenge:
      "Editable brief placeholder — add the community context and the communication problem the work addressed.",
    approach: [
      "Add the audience context, content approach, and contribution scope here.",
    ],
    execution: [
      "Add approved content examples and community initiatives, with collaborators credited.",
    ],
    deliverables: [
      "Selected content — media pending",
      "Community work — details pending",
    ],
    outcomes:
      "Verified outcomes have not been supplied. Add results only with appropriate sources and context.",
    reflection:
      "Reflection placeholder — add a first-hand learning from this role.",
    campaigns: [],
  },
  {
    slug: "one-hand-clap",
    number: "06",
    client: "One Hand Clap",
    title: "Finding my way into the creative room.",
    role: "Junior Creative Associate",
    period: "November 2023–May 2024",
    categories: ["Creative", "Agency", "Campaigns"],
    description:
      "Agency experience spanning creative and account work, including the CoinDCX account.",
    image: "/placeholders/coindcx.svg",
    theme: "blue",
    featured: false,
    overview:
      "I was a Junior Creative Associate at One Hand Clap from November 2023 to May 2024. My work included the CoinDCX account and campaign work during that period.",
    challenge:
      "Editable brief placeholder — add the specific agency projects and the creative questions they addressed.",
    approach: [
      "Add my contribution, team context, and the creative process for each approved example.",
    ],
    execution: [
      "The CoinDCX case study holds the account-specific work. Other agency contributions can be added once details and permissions are confirmed.",
    ],
    deliverables: [
      "Selected creative concepts — details pending",
      "Campaign work — approved media pending",
    ],
    outcomes:
      "No agency or client performance figures have been supplied. Add verified project-specific outcomes here.",
    reflection:
      "Reflection placeholder — add a lesson from working in a creative agency.",
    campaigns: [],
  },
  {
    slug: "technical-projects",
    number: "07",
    client: "Personal technical projects",
    title: "The engineering tabs are still open.",
    role: "Personal exploration",
    period: "Dates to be added",
    categories: ["Engineering", "Prototypes", "Creative technology"],
    description:
      "Earlier explorations in machine learning, blockchain, augmented reality, and software.",
    image: "/placeholders/asgard.svg",
    theme: "violet",
    featured: false,
    overview:
      "Before moving into creative marketing, I studied Computer Engineering and explored machine learning, blockchain, augmented reality, and software projects.",
    challenge:
      "Project details pending — add a specific technical question and the constraints of the prototype.",
    approach: [
      "Add the problem, technical approach, tools, and the part I built once a project is selected.",
    ],
    execution: [
      "Project names, screenshots, repositories, and demo links will be added when available.",
    ],
    deliverables: [
      "Prototype screenshots — media pending",
      "Repository and demo — links pending",
    ],
    outcomes: "Prototype status and verified outcomes have not been supplied.",
    reflection:
      "Reflection placeholder — add what building the prototype taught me.",
    campaigns: [],
  },
  {
    slug: "independent-concepts",
    number: "08",
    client: "Independent creative concepts",
    title: "Ideas without a client attached.",
    role: "Independent creative exploration",
    period: "Dates to be added",
    categories: ["Concepts", "Storytelling", "Independent"],
    description:
      "A home for uncommissioned ideas and creative directions that deserve a little room.",
    image: "/placeholders/experiments.svg",
    theme: "rust",
    featured: false,
    overview:
      "A space for independent creative concepts. These are not commissioned campaigns or implied endorsements from brands.",
    challenge:
      "Concept brief pending — add the question or observation that started the idea.",
    approach: [
      "Add the premise, intended audience, and creative direction for the selected concept.",
    ],
    execution: [
      "Concept artwork, sketches, and process notes will be added here. Current imagery is placeholder artwork.",
    ],
    deliverables: [
      "Concept artwork — media pending",
      "Process notes — pending",
    ],
    outcomes:
      "No finished release or audience results are claimed. Add the concept's actual status when ready.",
    reflection:
      "Reflection placeholder — add what was interesting or unexpected about developing the idea.",
    campaigns: [],
  },
];
