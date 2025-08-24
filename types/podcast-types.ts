// types/podcast-types.ts
export interface Podcast {
  _id: string;
  _type: 'podcast';
  title: string;
  slug: {
    current: string;
  };
  shortDescription: string;
  longDescription: string;
  image: {
    asset: {
      _ref: string;
      url?: string;
    };
    alt?: string;
  };
  promoAudio: {
    audioType: 'upload' | 'direct' | 'embed';
    audioFile?: {
      asset: {
        _ref: string;
        url?: string;
      };
    };
    audioUrl?: string;
    embedCode?: string;
    duration?: number;
  };
  producer: string;
  host: string;
  categories: Array<{
    _id: string;
    title: string;
    color?: string;
  }>;
  tags?: Array<{
    _id: string;
    title: string;
  }>;
  startDate: string;
  status: 'active' | 'completed' | 'paused' | 'upcoming';
  language: 'persian' | 'dari' | 'pashto' | 'german' | 'english' | 'arabic' | 'other';
  totalEpisodes: number;
  averageEpisodeDuration?: number;
  releaseSchedule: 'daily' | 'weekly' | 'biweekly' | 'monthly' | 'irregular';
  isActive: boolean;
  featured: boolean;
  heroShow: boolean;
  socialLinks?: {
    spotify?: string;
    soundcloud?: string;
    applePodcasts?: string;
    googlePodcasts?: string;
    castbox?: string;
    website?: string;
  };
  notes?: string;
  _createdAt: string;
  _updatedAt: string;
}

export interface PodcastEpisode {
  _id: string;
  _type: 'podcastEpisode';
  podcast: {
    _id: string;
    title: string;
    image?: {
      asset: {
        _ref: string;
        url?: string;
      };
    };
  };
  episodeNumber: number;
  title: string;
  slug: {
    current: string;
  };
  description: string;
  audio: {
    audioType: 'upload' | 'direct' | 'embed';
    audioFile?: {
      asset: {
        _ref: string;
        url?: string;
      };
    };
    audioUrl?: string;
    embedCode?: string;
    duration: number;
    fileSize?: number;
    quality: '128' | '192' | '320' | 'flac';
  };
  image: {
    asset: {
      _ref: string;
      url?: string;
    };
    alt?: string;
  };
  guests?: Array<{
    name: string;
    role?: string;
    bio?: string;
    photo?: {
      asset: {
        _ref: string;
        url?: string;
      };
    };
    socialLinks?: {
      website?: string;
      instagram?: string;
      twitter?: string;
      linkedin?: string;
    };
  }>;
  publishedAt: string;
  status: 'draft' | 'published' | 'scheduled' | 'archived';
  tags?: Array<{
    _id: string;
    title: string;
  }>;
  transcript?: string;
  chapters?: Array<{
    title: string;
    startTime: number;
    description?: string;
  }>;
  playCount: number;
  downloadCount: number;
  rating?: number;
  featured: boolean;
  heroShow: boolean;
  isActive: boolean;
  notes?: string;
  _createdAt: string;
  _updatedAt: string;
}

export interface PodcastGuest {
  name: string;
  role?: string;
  bio?: string;
  photo?: {
    asset: {
      _ref: string;
      url?: string;
    };
  };
  socialLinks?: {
    website?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
  };
}

export interface PodcastChapter {
  title: string;
  startTime: number; // in seconds
  description?: string;
}

export interface AudioFile {
  audioType: 'upload' | 'direct' | 'embed';
  audioFile?: {
    asset: {
      _ref: string;
      url?: string;
    };
  };
  audioUrl?: string;
  embedCode?: string;
  duration: number; // in minutes for podcast, seconds for promo
  fileSize?: number; // in MB
  quality?: '128' | '192' | '320' | 'flac';
}

// Query types for fetching podcasts
export interface PodcastListQuery {
  category?: string;
  status?: 'active' | 'completed' | 'paused' | 'upcoming';
  featured?: boolean;
  limit?: number;
  offset?: number;
  sortBy?: 'newest' | 'oldest' | 'title' | 'episodes';
}

export interface PodcastEpisodeListQuery {
  podcast?: string;
  status?: 'draft' | 'published' | 'scheduled' | 'archived';
  featured?: boolean;
  limit?: number;
  offset?: number;
  sortBy?: 'newest' | 'oldest' | 'episode-number' | 'plays' | 'rating';
}

// Sanity GROQ query strings
export const PODCAST_QUERY = `
  *[_type == "podcast" && isActive == true] | order(_createdAt desc) {
    _id,
    _type,
    title,
    slug,
    shortDescription,
    image,
    producer,
    host,
    categories[]->{
      _id,
      title,
      color
    },
    startDate,
    status,
    totalEpisodes,
    featured,
    heroShow,
    _createdAt,
    _updatedAt
  }
`;

export const PODCAST_EPISODE_QUERY = `
  *[_type == "podcastEpisode" && isActive == true] | order(publishedAt desc) {
    _id,
    _type,
    title,
    slug,
    description,
    episodeNumber,
    podcast->{
      _id,
      title,
      image
    },
    audio,
    image,
    guests,
    publishedAt,
    status,
    playCount,
    downloadCount,
    rating,
    featured,
    heroShow,
    _createdAt,
    _updatedAt
  }
`;

export const SINGLE_PODCAST_QUERY = (slug: string) => `
  *[_type == "podcast" && slug.current == "${slug}"][0] {
    _id,
    _type,
    title,
    slug,
    shortDescription,
    longDescription,
    image,
    promoAudio,
    producer,
    host,
    categories[]->{
      _id,
      title,
      color
    },
    tags[]->{
      _id,
      title
    },
    startDate,
    status,
    language,
    totalEpisodes,
    averageEpisodeDuration,
    releaseSchedule,
    socialLinks,
    featured,
    heroShow,
    "episodes": *[_type == "podcastEpisode" && podcast._ref == ^._id && isActive == true] | order(episodeNumber desc) {
      _id,
      title,
      slug,
      episodeNumber,
      audio.duration,
      publishedAt,
      status,
      image
    },
    _createdAt,
    _updatedAt
  }
`;

export const SINGLE_PODCAST_EPISODE_QUERY = (slug: string) => `
  *[_type == "podcastEpisode" && slug.current == "${slug}"][0] {
    _id,
    _type,
    title,
    slug,
    description,
    episodeNumber,
    podcast->{
      _id,
      title,
      slug,
      image,
      producer,
      host
    },
    audio,
    image,
    guests,
    publishedAt,
    status,
    tags[]->{
      _id,
      title
    },
    transcript,
    chapters,
    playCount,
    downloadCount,
    rating,
    _createdAt,
    _updatedAt
  }
`;

// Helper functions for time formatting
export const formatDuration = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  if (hours > 0) {
    return `${hours}:${mins.toString().padStart(2, '0')}`;
  }
  return `${mins} دقیقه`;
};

export const formatChapterTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};