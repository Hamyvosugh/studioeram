// studio-eramtv/schemaTypes/seasonType.ts
import {defineField, defineType} from 'sanity'

export const seasonType = defineType({
  name: 'season',
  title: 'فصل',
  type: 'document',
  fields: [
    defineField({
      name: 'show',
      title: 'برنامه مربوطه',
      type: 'reference',
      to: [{type: 'show'}],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'seasonNumber',
      title: 'شماره فصل',
      type: 'number',
      validation: (rule) => rule.required().min(1).max(100),
      description: 'شماره فصل (مثل 1، 2، 3 و...)',
    }),
    defineField({
      name: 'title',
      title: 'عنوان فصل (اختیاری)',
      type: 'string',
      description: 'عنوان خاص برای این فصل - اگر ندارید خالی بگذارید',
    }),
    defineField({
      name: 'slug',
      title: 'اسلاگ',
      type: 'slug',
      options: {
        source: (doc: any, options: any) => {
          const seasonNumber = doc.seasonNumber;
          const showTitle = doc.show?.title || 'show';
          const customTitle = doc.title;
          
          if (customTitle) {
            return `${showTitle}-season-${seasonNumber}-${customTitle}`;
          }
          return `${showTitle}-season-${seasonNumber}`;
        },
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'توضیحات فصل',
      type: 'text',
      description: 'توضیح کوتاه درباره این فصل',
      rows: 4,
    }),
    defineField({
      name: 'releaseYear',
      title: 'سال انتشار فصل',
      type: 'number',
      validation: (rule) => rule.required().min(1900).max(new Date().getFullYear() + 2),
    }),
    defineField({
      name: 'poster',
      title: 'پوستر فصل',
      type: 'image',
      description: 'پوستر اختصاصی برای این فصل (اختیاری)',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'trailer',
      title: 'تریلر فصل',
      type: 'object',
      description: 'تریلر اختصاصی برای این فصل (اختیاری)',
      options: {
        collapsible: true,
        collapsed: true,
      },
      fields: [
        {
          name: 'videoType',
          title: 'نوع ویدیو',
          type: 'string',
          options: {
            list: [
              {title: 'آپلود فایل', value: 'upload'},
              {title: 'لینک یوتیوب', value: 'youtube'},
              {title: 'لینک ویمیو', value: 'vimeo'},
              {title: 'لینک مستقیم', value: 'direct'},
            ],
            layout: 'radio',
          },
          initialValue: 'youtube',
        },
        {
          name: 'videoFile',
          title: 'فایل ویدیو',
          type: 'file',
          options: {
            accept: 'video/*',
          },
          hidden: ({parent}) => parent?.videoType !== 'upload',
        },
        {
          name: 'videoUrl',
          title: 'لینک ویدیو',
          type: 'url',
          hidden: ({parent}) => parent?.videoType === 'upload',
        },
        {
          name: 'duration',
          title: 'مدت زمان (ثانیه)',
          type: 'number',
          validation: (rule) => rule.min(1).max(1800),
        },
      ],
    }),
    defineField({
      name: 'totalEpisodes',
      title: 'تعداد کل اپیزودهای این فصل',
      type: 'number',
      description: 'تعداد اپیزودهای موجود در این فصل',
      validation: (rule) => rule.min(0).max(500),
    }),
    defineField({
      name: 'status',
      title: 'وضعیت فصل',
      type: 'string',
      options: {
        list: [
          {title: 'در حال پخش', value: 'airing'},
          {title: 'تمام شده', value: 'completed'},
          {title: 'در انتظار شروع', value: 'upcoming'},
          {title: 'متوقف شده', value: 'cancelled'},
        ],
        layout: 'radio',
      },
      initialValue: 'upcoming',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'startDate',
      title: 'تاریخ شروع پخش',
      type: 'date',
      description: 'تاریخ شروع پخش اولین اپیزود این فصل',
    }),
    defineField({
      name: 'endDate',
      title: 'تاریخ پایان پخش',
      type: 'date',
      description: 'تاریخ پخش آخرین اپیزود این فصل',
      validation: (rule) => 
        rule.custom((endDate, context) => {
          const startDate = (context.parent as any)?.startDate;
          if (endDate && startDate && new Date(endDate) < new Date(startDate)) {
            return 'تاریخ پایان نمی‌تواند قبل از تاریخ شروع باشد';
          }
          return true;
        }),
    }),
    defineField({
      name: 'featured',
      title: 'فصل ویژه',
      type: 'boolean',
      description: 'آیا این فصل در بخش ویژه نمایش داده شود؟',
      initialValue: false,
    }),
    defineField({
      name: 'isActive',
      title: 'فعال',
      type: 'boolean',
      description: 'آیا این فصل در سایت نمایش داده شود؟',
      initialValue: true,
    }),
    defineField({
      name: 'order',
      title: 'ترتیب نمایش',
      type: 'number',
      description: 'ترتیب نمایش این فصل (معمولاً همان شماره فصل)',
      initialValue: ({document}: any) => document?.seasonNumber || 1,
    }),
  ],
  preview: {
    select: {
      show: 'show.title',
      seasonNumber: 'seasonNumber',
      title: 'title',
      releaseYear: 'releaseYear',
      totalEpisodes: 'totalEpisodes',
      status: 'status',
      media: 'poster',
      isActive: 'isActive',
      featured: 'featured',
    },
    prepare({show, seasonNumber, title, releaseYear, totalEpisodes, status, media, isActive, featured}) {
      const statusLabels: {[key: string]: string} = {
        airing: 'در حال پخش',
        completed: 'تمام شده',
        upcoming: 'در انتظار شروع',
        cancelled: 'متوقف شده',
      };
      
      const statusText = statusLabels[status] || status;
      const episodeText = totalEpisodes ? `${totalEpisodes} اپیزود` : 'تعداد نامشخص';
      
      let displayTitle = `فصل ${seasonNumber}`;
      if (title) {
        displayTitle += `: ${title}`;
      }
      if (show) {
        displayTitle = `${show} - ${displayTitle}`;
      }
      
      let subtitle = `${releaseYear} | ${statusText} | ${episodeText}`;
      if (!isActive) {
        subtitle += ' | غیرفعال';
      }
      if (featured) {
        subtitle += ' | ویژه';
      }
      
      return {
        title: displayTitle,
        subtitle: subtitle,
        media: media,
      }
    },
  },
  orderings: [
    {
      title: 'بر اساس برنامه و شماره فصل',
      name: 'byShowAndSeason',
      by: [
        {field: 'show.title', direction: 'asc'},
        {field: 'seasonNumber', direction: 'asc'}
      ]
    },
    {
      title: 'جدیدترین فصل‌ها',
      name: 'byReleaseYear',
      by: [
        {field: 'releaseYear', direction: 'desc'},
        {field: 'seasonNumber', direction: 'desc'}
      ]
    },
    {
      title: 'بر اساس ترتیب نمایش',
      name: 'byOrder',
      by: [
        {field: 'order', direction: 'asc'}
      ]
    }
  ]
})