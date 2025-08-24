// studio-eramtv/schemaTypes/timeFolderType.ts
import {defineField, defineType} from 'sanity'

export const timeFolderType = defineType({
  name: 'timeFolder',
  title: 'فولدر زمانی',
  type: 'document',
  fields: [
    defineField({
      name: 'year',
      title: 'سال',
      type: 'number',
      validation: (rule) => rule.required().min(2020).max(2030),
      description: 'سال میلادی (مثل 2025)',
    }),
    
    defineField({
      name: 'month',
      title: 'ماه',
      type: 'number',
      validation: (rule) => rule.required().min(1).max(12),
      description: 'شماره ماه (1 تا 12)',
    }),
    
    defineField({
      name: 'weekOfMonth',
      title: 'هفته از ماه',
      type: 'number',
      validation: (rule) => rule.required().min(1).max(5),
      description: 'هفته چندم از ماه (1 تا 5)',
    }),
    
    defineField({
      name: 'dayOfWeek',
      title: 'روز از هفته',
      type: 'number',
      validation: (rule) => rule.min(1).max(7),
      description: 'روز چندم از هفته (1=یکشنبه تا 7=شنبه) - اختیاری',
    }),
    
    defineField({
      name: 'persianDate',
      title: 'تاریخ شمسی',
      type: 'object',
      fields: [
        {
          name: 'year',
          title: 'سال شمسی',
          type: 'number',
          validation: (rule) => rule.min(1400).max(1410),
        },
        {
          name: 'month',
          title: 'ماه شمسی',
          type: 'number',
          validation: (rule) => rule.min(1).max(12),
        },
        {
          name: 'monthName',
          title: 'نام ماه',
          type: 'string',
          options: {
            list: [
              {title: 'فروردین', value: 'فروردین'},
              {title: 'اردیبهشت', value: 'اردیبهشت'},
              {title: 'خرداد', value: 'خرداد'},
              {title: 'تیر', value: 'تیر'},
              {title: 'مرداد', value: 'مرداد'},
              {title: 'شهریور', value: 'شهریور'},
              {title: 'مهر', value: 'مهر'},
              {title: 'آبان', value: 'آبان'},
              {title: 'آذر', value: 'آذر'},
              {title: 'دی', value: 'دی'},
              {title: 'بهمن', value: 'بهمن'},
              {title: 'اسفند', value: 'اسفند'},
            ]
          }
        }
      ]
    }),
    
    defineField({
      name: 'folderPath',
      title: 'مسیر فولدر',
      type: 'string',
      description: 'مسیر کامل فولدر (خودکار محاسبه می‌شود)',
      readOnly: true,
    }),
    
    defineField({
      name: 'description',
      title: 'توضیحات',
      type: 'text',
      description: 'توضیح اختیاری برای این دوره زمانی',
      rows: 2,
    }),
    
    defineField({
      name: 'isActive',
      title: 'فعال',
      type: 'boolean',
      description: 'آیا این فولدر فعال است؟',
      initialValue: true,
    }),
    
    defineField({
      name: 'postCount',
      title: 'تعداد پست‌ها',
      type: 'number',
      description: 'تعداد پست‌های موجود در این فولدر (خودکار محاسبه می‌شود)',
      readOnly: true,
      initialValue: 0,
    }),
  ],
  
  preview: {
    select: {
      year: 'year',
      month: 'month',
      weekOfMonth: 'weekOfMonth',
      dayOfWeek: 'dayOfWeek',
      persianYear: 'persianDate.year',
      persianMonth: 'persianDate.monthName',
      postCount: 'postCount',
      isActive: 'isActive',
    },
    prepare({year, month, weekOfMonth, dayOfWeek, persianYear, persianMonth, postCount, isActive}) {
      const monthNames = [
        '', 'ژانویه', 'فوریه', 'مارس', 'آپریل', 'می', 'ژوئن',
        'ژوئیه', 'آگوست', 'سپتامبر', 'اکتبر', 'نوامبر', 'دسامبر'
      ];
      
      const dayNames = ['', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه', 'شنبه'];
      
      let title = `${year} - ${monthNames[month]} - هفته ${weekOfMonth}`;
      if (dayOfWeek) {
        title += ` - ${dayNames[dayOfWeek]}`;
      }
      
      let subtitle = `${postCount || 0} پست`;
      if (persianYear && persianMonth) {
        subtitle += ` | ${persianYear} ${persianMonth}`;
      }
      if (!isActive) {
        subtitle += ' | غیرفعال';
      }
      
      return {
        title: title,
        subtitle: subtitle,
      };
    },
  },
  
  orderings: [
    {
      title: 'جدیدترین',
      name: 'newest',
      by: [
        {field: 'year', direction: 'desc'},
        {field: 'month', direction: 'desc'},
        {field: 'weekOfMonth', direction: 'desc'},
        {field: 'dayOfWeek', direction: 'desc'}
      ]
    },
    {
      title: 'قدیمی‌ترین',
      name: 'oldest',
      by: [
        {field: 'year', direction: 'asc'},
        {field: 'month', direction: 'asc'},
        {field: 'weekOfMonth', direction: 'asc'},
        {field: 'dayOfWeek', direction: 'asc'}
      ]
    }
  ]
});

// ==============================================================
// تغییرات در postType برای افزودن فولدر زمانی
// ==============================================================

// اضافه کردن این فیلد به postType.ts موجود:
export const timeFolderField = defineField({
  name: 'timeFolder',
  title: 'فولدر زمانی',
  type: 'reference',
  to: [{type: 'timeFolder'}],
  description: 'فولدر زمانی که این پست در آن قرار می‌گیرد',
  validation: (rule) => rule.required(),
  
  // فیلتر کردن فولدرهای قابل انتخاب بر اساس تاریخ پست
  options: {
    filter: ({document}: any) => {
      if (!document?.publishedAt) return {}; // اگر تاریخ انتشار نداریم، همه فولدرها را نشان بده
      
      const publishDate = new Date(document.publishedAt);
      const year = publishDate.getFullYear();
      const month = publishDate.getMonth() + 1;
      
      return {
        filter: 'year == $year && month == $month',
        params: {year, month}
      };
    }
  }
});

// ==============================================================
// یوتیلیتی برای ایجاد خودکار فولدرها
// ==============================================================

export interface TimeFolder {
  year: number;
  month: number;
  weekOfMonth: number;
  dayOfWeek?: number;
  persianDate?: {
    year: number;
    month: number;
    monthName: string;
  };
}

/**
 * محاسبه فولدر زمانی برای یک تاریخ
 */
export function calculateTimeFolder(date: Date): TimeFolder {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const dayOfWeek = date.getDay() + 1; // JavaScript: 0=یکشنبه، ما: 1=یکشنبه
  
  // محاسبه هفته از ماه
  const firstDayOfMonth = new Date(year, date.getMonth(), 1);
  const firstDayOfWeek = firstDayOfMonth.getDay();
  const weekOfMonth = Math.ceil((day + firstDayOfWeek) / 7);
  
  return {
    year,
    month,
    weekOfMonth,
    dayOfWeek,
  };
}

/**
 * تبدیل تاریخ میلادی به شمسی (ساده)
 */
export function toPersianDate(date: Date): {year: number; month: number; monthName: string} {
  // این یک تبدیل ساده است - برای دقت بیشتر از کتابخانه moment-jalaali استفاده کنید
  const gregorianYear = date.getFullYear();
  const gregorianMonth = date.getMonth() + 1;
  
  // تقریبی: سال شمسی = سال میلادی - 621
  const persianYear = gregorianYear - 621;
  
  const monthNames = [
    '', 'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
    'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'
  ];
  
  // تقریبی برای تبدیل ماه
  let persianMonth = gregorianMonth - 3;
  if (persianMonth <= 0) {
    persianMonth += 12;
  }
  
  return {
    year: persianYear,
    month: persianMonth,
    monthName: monthNames[persianMonth]
  };
}

/**
 * تولید مسیر فولدر
 */
export function generateFolderPath(timeFolder: TimeFolder): string {
  const {year, month, weekOfMonth, dayOfWeek} = timeFolder;
  
  let path = `${year}/${month.toString().padStart(2, '0')}/Week-${weekOfMonth}`;
  
  if (dayOfWeek) {
    const dayNames = ['', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    path += `/${dayNames[dayOfWeek]}`;
  }
  
  return path;
}

/**
 * ایجاد خودکار فولدر برای تاریخ مشخص
 */
export async function createTimeFolderForDate(client: any, date: Date): Promise<string> {
  const timeFolder = calculateTimeFolder(date);
  const persianDate = toPersianDate(date);
  const folderPath = generateFolderPath(timeFolder);
  
  // بررسی وجود فولدر
  const existingFolder = await client.fetch(`
    *[_type == "timeFolder" && year == $year && month == $month && weekOfMonth == $weekOfMonth][0]
  `, {
    year: timeFolder.year,
    month: timeFolder.month,
    weekOfMonth: timeFolder.weekOfMonth
  });
  
  if (existingFolder) {
    return existingFolder._id;
  }
  
  // ایجاد فولدر جدید
  const newFolder = await client.create({
    _type: 'timeFolder',
    year: timeFolder.year,
    month: timeFolder.month,
    weekOfMonth: timeFolder.weekOfMonth,
    persianDate: persianDate,
    folderPath: folderPath,
    isActive: true,
    postCount: 0
  });
  
  return newFolder._id;
}

// ==============================================================
// Query برای نمایش فولدربندی شده
// ==============================================================

/**
 * Query برای دریافت فولدرها به صورت هیرارشیک
 */
export const hierarchicalFoldersQuery = `
{
  "years": *[_type == "timeFolder"] | order(year desc) {
    year,
    "months": *[_type == "timeFolder" && year == ^.year] | order(month desc) {
      month,
      "weeks": *[_type == "timeFolder" && year == ^.year && month == ^.month] | order(weekOfMonth desc) {
        _id,
        weekOfMonth,
        persianDate,
        postCount,
        isActive,
        "posts": *[_type == "post" && timeFolder._ref == ^._id] | order(publishedAt desc) {
          _id,
          title,
          "trackingId": slug.current,
          publishedAt,
          image,
          important,
          heroShow,
          category->{title, color}
        }
      }
    }
  } [count(months) > 0]
} [count(years) > 0]`;

/**
 * Query برای دریافت پست‌های یک فولدر خاص
 */
export const folderPostsQuery = (folderId: string) => `
*[_type == "post" && timeFolder._ref == "${folderId}"] | order(publishedAt desc) {
  _id,
  title,
  "trackingId": slug.current,
  publishedAt,
  _updatedAt,
  image,
  important,
  heroShow,
  category->{title, slug, color},
  region->{title, slug},
  topic->{title, slug, color},
  tags[]->{title, slug},
  author,
  "status": select(
    publishedAt != null && publishedAt <= now() => "published",
    publishedAt != null && publishedAt > now() => "scheduled",
    "draft"
  ),
  "isExpired": expireAt != null && expireAt <= now()
}`;

/**
 * Query برای آمار فولدرها
 */
export const folderStatisticsQuery = `
{
  "totalFolders": count(*[_type == "timeFolder"]),
  "activeFolders": count(*[_type == "timeFolder" && isActive == true]),
  "totalPosts": count(*[_type == "post"]),
  "postsWithFolder": count(*[_type == "post" && defined(timeFolder)]),
  "postsWithoutFolder": count(*[_type == "post" && !defined(timeFolder)]),
  "currentYearFolders": count(*[_type == "timeFolder" && year == ${new Date().getFullYear()}]),
  "currentMonthFolders": count(*[_type == "timeFolder" && year == ${new Date().getFullYear()} && month == ${new Date().getMonth() + 1}])
}`;