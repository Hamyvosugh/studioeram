// types/homepage-sections.ts
export interface HomepageSection {
  _id: string;
  title: string;
  isActive: boolean;
  order: number;
  contentType: 'posts' | 'shows' | 'episodes' | 'mixed';
  displayStyle: 'horizontal-card' | 'vertical-card' | 'simple-list' | 'grid' | 'slider' | 'hero';
  itemsToShow: number;
  
  filterSettings: {
    timeFilter?: {
      enabled: boolean;
      timeRange?: string;
      customStartDate?: string;
      customEndDate?: string;
    };
    categoryFilter?: {
      enabled: boolean;
      categories?: Array<{_id: string; title: string}>;
      showCategories?: Array<{_id: string; title: string}>;
    };
    tagFilter?: {
      enabled: boolean;
      tags?: Array<{_id: string; title: string}>;
    };
    topicFilter?: {
      enabled: boolean;
      topics?: Array<{_id: string; title: string}>;
    };
    regionFilter?: {
      enabled: boolean;
      regions?: Array<{_id: string; title: string}>;
    };
    featuredFilter?: {
      enabled: boolean;
      showOnlyFeatured?: boolean;
    };
    statusFilter?: {
      enabled: boolean;
      postStatus?: string[];
      showStatus?: string[];
    };
    manualSelection?: {
      enabled: boolean;
      selectedPosts?: Array<{_id: string}>;
      selectedShows?: Array<{_id: string}>;
      selectedEpisodes?: Array<{_id: string}>;
    };
  };

  sortSettings: {
    sortBy: 'newest' | 'oldest' | 'most-viewed' | 'highest-rated' | 'random' | 'manual';
    randomSeed?: string;
  };

  displaySettings: {
    showTitle: boolean;
    showDescription: boolean;
    description?: string;
    showMoreLink: boolean;
    moreLink?: {
      text: string;
      url: string;
    };
    backgroundColor: string;
    customBackgroundColor?: string;
    spacing: 'small' | 'medium' | 'large';
  };

  responsiveSettings: {
    mobile: {
      itemsPerRow: number;
      showScrollbar: boolean;
    };
    tablet: {
      itemsPerRow: number;
    };
    desktop: {
      itemsPerRow: number;
    };
  };

  cacheSettings: {
    cacheDuration: number;
    enableRealtime: boolean;
  };

  notes?: string;
}

export interface SectionContent {
  posts?: any[];
  shows?: any[];
  episodes?: any[];
  total: number;
}