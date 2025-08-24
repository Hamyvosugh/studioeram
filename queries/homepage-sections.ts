// queries/homepage-sections.ts
export const homepageSectionsQuery = `
*[_type == "homepageSection" && isActive == true] | order(order asc) {
  _id,
  title,
  isActive,
  order,
  contentType,
  displayStyle,
  itemsToShow,
  filterSettings,
  sortSettings,
  displaySettings,
  responsiveSettings,
  cacheSettings,
  notes
}`;

// Query برای دریافت محتوای یک بخش خاص
export const sectionContentQuery = (sectionId: string) => `
*[_type == "homepageSection" && _id == "${sectionId}"][0] {
  ...,
  "content": {
    "posts": *[_type == "post" && defined(publishedAt)] | order(publishedAt desc)[0...50] {
      _id,
      title,
      slug,
      publishedAt,
      image,
      shortDescription,
      category->{title, slug, color},
      topic->{title, slug, color},
      region->{title, slug},
      tags[]->{title, slug},
      important,
      heroShow,
      featured
    },
    "shows": *[_type == "show" && isActive == true] | order(_createdAt desc)[0...50] {
      _id,
      title,
      slug,
      shortDescription,
      poster,
      categories[]->{title, slug, color},
      startYear,
      endYear,
      status,
      ageRating,
      totalEpisodes,
      featured,
      heroShow
    },
    "episodes": *[_type == "episode" && isActive == true] | order(publishedAt desc)[0...50] {
      _id,
      title,
      slug,
      shortDescription,
      thumbnail,
      show->{title, slug},
      season->{seasonNumber},
      episodeNumber,
      duration,
      publishedAt,
      airDate,
      status,
      featured,
      heroShow
    }
  }
}`;