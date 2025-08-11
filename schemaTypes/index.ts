// studio-eramtv/schemaTypes/index.ts
import {postType} from './postType'
import {categoryType} from './categoryType'
import {tagType} from './tagType'
import {regionType} from './regionType'
import {topicType} from './topicType'

// Import new show-related schemas
import {showCategoryType} from './showCategoryType'
import {showType} from './showType'
import {seasonType} from './seasonType'
import {episodeType} from './episodeType'

export const schemaTypes = [
  // Existing schemas for posts/news
  categoryType, 
  tagType, 
  regionType, 
  topicType, 
  postType,
  
  // New schemas for TV shows
  showCategoryType,
  showType,
  seasonType,
  episodeType,
]