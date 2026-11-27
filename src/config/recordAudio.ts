export type RecordTrack = {
  id: string;
  title: string;
  artist?: string;
  artwork?: string;
  src: string;
};

export const recordAudioConfig: { autoplay: boolean; tracks: readonly RecordTrack[] } = {
  autoplay: true,
  // Supply direct browser-playable audio files and artwork you have permission to use.
  // Use a root-relative file path (under public/) or an HTTPS media URL for each src.
  tracks: ["001", "002", "003", "004", "005", "006", "007", "008", "010"].map((number) => ({
    id: `old-${number}`,
    title: `Track ${number}`,
    src: `/music/old/${number}.mp3`,
    artwork: `/music/old/${number}.jpg`,
  })),
};
