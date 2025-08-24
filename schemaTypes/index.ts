// studio-eramtv/schemaTypes/index.ts
import {postType} from './postType'
import {categoryType} from './categoryType'
import {tagType} from './tagType'
import {regionType} from './regionType'
import {topicType} from './topicType'

// Import show-related schemas
import {showCategoryType} from './showCategoryType'
import {showType} from './showType'
import {seasonType} from './seasonType'
import {episodeType} from './episodeType'

// Import podcast-related schemas - اینها را اضافه کنید
import {podcastType} from './podcastType'
import {podcastEpisodeType} from './podcastEpisodeType'

// Import homepage sections schema
import {homepageSectionType} from './homepageSectionType'

// Import advertisement schema
import {advertisementType} from './advertisementType'

// Import time folder schema
import {timeFolderType} from './timeFolderType'

export const schemaTypes = [
  // Existing schemas for posts/news
  categoryType, 
  tagType, 
  regionType, 
  topicType, 
  postType,
  
  // TV show schemas
  showCategoryType,
  showType,
  seasonType,
  episodeType,

  // Podcast schemas - این دو خط را اضافه کنید
  podcastType,
  podcastEpisodeType,

  // Homepage and utility schemas
  homepageSectionType,
  advertisementType,
  timeFolderType,
]