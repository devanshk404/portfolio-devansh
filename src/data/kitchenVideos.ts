export type KitchenVideo = {
  postUrl: string;
  title?: string;
  showPostLink?: boolean;
  // Add media after confirming the player in X Publish’s Embedded Video preview.
  media?: {
    width: number;
    height: number;
    poster?: string;
  };
};

export const kitchenVideos: readonly KitchenVideo[] = [
  {
    postUrl: "https://x.com/SuperteamEarn/status/2108178225910481213",
    title: "What’s live on Earn",
    media: {
      width: 480,
      height: 852,
      poster: "https://pbs.twimg.com/amplify_video_thumb/2108178162836463617/img/BZns0uhgavaL0zlo.jpg",
    },
  },
  {
    postUrl: "https://x.com/SuperteamEarn/status/2100558381857882554",
    title: "Crypto World’s Fair Sidetracks",
    media: {
      width: 1280,
      height: 720,
      poster: "https://pbs.twimg.com/amplify_video_thumb/2100558322013458432/img/IltHL2cNKmds7qxp.jpg",
    },
  },
  {
    postUrl: "https://x.com/SuperteamEarn/status/2082832414381080601",
    title: "Great work takes time",
    media: {
      width: 480,
      height: 852,
      poster: "https://pbs.twimg.com/amplify_video_thumb/2082832387541704704/img/-aNSkBDHac5R80E4.jpg",
    },
  },
  {
    postUrl: "https://x.com/SuperteamEarn/status/2077004757768802795",
    title: "Making money online",
    media: {
      width: 964,
      height: 720,
      poster: "https://pbs.twimg.com/amplify_video_thumb/2077004498397253632/img/ZYnmfAETCOlsXvtO.jpg",
    },
  },
  {
    postUrl: "https://x.com/SuperteamEarn/status/2074761269429842026",
    title: "World Cup Hackathon",
    media: {
      width: 1280,
      height: 720,
      poster: "https://pbs.twimg.com/amplify_video_thumb/2074761199867355136/img/JS-8xEB5PQ-1_xX3.jpg",
    },
  },
  {
    postUrl: "https://x.com/SuperteamEarn/status/2029186212830048557",
    title: "TokenTon26",
    media: {
      width: 1280,
      height: 720,
      poster: "https://pbs.twimg.com/amplify_video_thumb/2029186157079384064/img/pQOC0AL5dKoOSyQ3.jpg",
    },
  },
  {
    postUrl: "https://x.com/SuperteamEarn/status/2057465865264914711",
    title: "Fifteen minutes on Earn",
    media: {
      width: 1280,
      height: 720,
      poster: "https://pbs.twimg.com/amplify_video_thumb/2057465814291464192/img/Dv5DNVxNeHk2PytZ.jpg",
    },
  },
];
