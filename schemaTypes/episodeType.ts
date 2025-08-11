// studio-eramtv/schemaTypes/episodeType.ts
import {defineField, defineType} from 'sanity'

export const episodeType = defineType({
  name: 'episode',
  title: 'اپیزود',
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
      name: 'season',
      title: 'فصل مربوطه',
      type: 'reference',
      to: [{type: 'season'}],
      validation: (rule) => rule.required(),
      options: {
        filter: ({document}: any) => {
          // فقط فصل‌های مربوط به برنامه انتخاب شده نمایش داده شوند
          return {
            filter: 'show._ref == $showId',
            params: {showId: document?.show?._ref}
          }
        }
      }
    }),
    defineField({
      name: 'episodeNumber',
      title: 'شماره اپیزود',
      type: 'number',
      validation: (rule) => rule.required().min(1).max(1000),
      description: 'شماره اپیزود در فصل (مثل 1، 2، 3 و...)',
    }),
    defineField({
      name: 'title',
      title: 'عنوان اپیزود',
      type: 'string',
      validation: (rule) => rule.required(),
      description: 'عنوان اختصاصی این اپیزود',
    }),
    defineField({
      name: 'slug',
      title: 'اسلاگ',
      type: 'slug',
      options: {
        source: (doc: any) => {
          const showTitle = doc.show?.title || 'show';
          const seasonNumber = doc.season?.seasonNumber || 'season';
          const episodeNumber = doc.episodeNumber || 'episode';
          const episodeTitle = doc.title || '';
          
          return `${showTitle}-s${seasonNumber}e${episodeNumber}-${episodeTitle}`;
        },
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'shortDescription',
      title: 'خلاصه اپیزود',
      type: 'text',
      description: 'خلاصه کوتاه از محتوای این اپیزود',
      validation: (rule) => rule.required().max(300),
      rows: 3,
    }),
    defineField({
      name: 'longDescription',
      title: 'توضیحات کامل',
      type: 'text',
      description: 'توضیح کامل درباره محتوای اپیزود',
      rows: 6,
    }),
    defineField({
      name: 'thumbnail',
      title: 'تامبنیل اپیزود',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
      description: 'تصویر شاخص این اپیزود',
    }),
    defineField({
      name: 'video',
      title: 'ویدیو اپیزود',
      type: 'object',
      validation: (rule) => rule.required(),
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
              {title: 'آدرس استریم', value: 'stream'},
            ],
            layout: 'radio',
          },
          initialValue: 'youtube',
          validation: (rule) => rule.required(),
        },
        {
          name: 'videoFile',
          title: 'فایل ویدیو',
          type: 'file',
          options: {
            accept: 'video/*',
          },
          hidden: ({parent}) => parent?.videoType !== 'upload',
          validation: (rule) => rule.custom((value, context) => {
            const videoType = (context.parent as any)?.videoType;
            if (videoType === 'upload' && !value) {
              return 'فایل ویدیو الزامی است';
            }
            return true;
          }),
        },
        {
          name: 'videoUrl',
          title: 'لینک ویدیو',
          type: 'url',
          hidden: ({parent}) => parent?.videoType === 'upload',
          validation: (rule) => rule.custom((value, context) => {
            const videoType = (context.parent as any)?.videoType;
            if (videoType !== 'upload' && !value) {
              return 'لینک ویدیو الزامی است';
            }
            return true;
          }),
        },
        {
          name: 'quality',
          title: 'کیفیت ویدیو',
          type: 'string',
          options: {
            list: [
              {title: 'SD (480p)', value: '480p'},
              {title: 'HD (720p)', value: '720p'},
              {title: 'Full HD (1080p)', value: '1080p'},
              {title: '4K (2160p)', value: '2160p'},
            ],
            layout: 'dropdown',
          },
          initialValue: '1080p',
        },
        {
          name: 'subtitles',
          title: 'زیرنویس‌ها',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'language',
                  title: 'زبان',
                  type: 'string',
                  options: {
                    list: [
                      {title: 'فارسی', value: 'persian'},
                      {title: 'دری', value: 'dari'},
                      {title: 'پشتو', value: 'pashto'},
                      {title: 'انگلیسی', value: 'english'},
                      {title: 'آلمانی', value: 'german'},
                      {title: 'عربی', value: 'arabic'},
                    ],
                  },
                  validation: (rule) => rule.required(),
                },
                {
                  name: 'subtitleFile',
                  title: 'فایل زیرنویس',
                  type: 'file',
                  options: {
                    accept: '.srt,.vtt,.ass',
                  },
                },
                {
                  name: 'isDefault',
                  title: 'پیش‌فرض',
                  type: 'boolean',
                  description: 'آیا این زیرنویس به صورت پیش‌فرض نمایش داده شود؟',
                  initialValue: false,
                },
              ],
              preview: {
                select: {
                  language: 'language',
                  isDefault: 'isDefault',
                },
                prepare({language, isDefault}) {
                  return {
                    title: language,
                    subtitle: isDefault ? 'پیش‌فرض' : '',
                  }
                },
              },
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'duration',
      title: 'مدت زمان (دقیقه)',
      type: 'number',
      validation: (rule) => rule.required().min(1).max(600),
      description: 'مدت زمان دقیق اپیزود به دقیقه',
    }),
    defineField({
      name: 'airDate',
      title: 'تاریخ پخش اصلی',
      type: 'datetime',
      description: 'تاریخ و زمان پخش اصلی این اپیزود',
    }),
    defineField({
      name: 'publishedAt',
      title: 'تاریخ انتشار در سایت',
      type: 'datetime',
      description: 'زمان انتشار در وب‌سایت (می‌تواند متفاوت از تاریخ پخش باشد)',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'وضعیت اپیزود',
      type: 'string',
      options: {
        list: [
          {title: 'پیش‌نویس', value: 'draft'},
          {title: 'منتشر شده', value: 'published'},
          {title: 'برنامه‌ریزی شده', value: 'scheduled'},
          {title: 'بایگانی شده', value: 'archived'},
        ],
        layout: 'radio',
      },
      initialValue: 'draft',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'guests',
      title: 'مهمان‌ها',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'نام مهمان',
              type: 'string',
              validation: (rule) => rule.required(),
            },
            {
              name: 'role',
              title: 'نقش/سمت',
              type: 'string',
              description: 'مثل: کارشناس، هنرمند، ورزشکار',
            },
            {
              name: 'bio',
              title: 'معرفی کوتاه',
              type: 'text',
              rows: 2,
            },
            {
              name: 'photo',
              title: 'عکس',
              type: 'image',
              options: {
                hotspot: true,
              },
            },
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'role',
              media: 'photo',
            },
          },
        },
      ],
      description: 'لیست مهمان‌های این اپیزود',
    }),
    defineField({
      name: 'tags',
      title: 'برچسب‌ها',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'tag'}],
        },
      ],
      description: 'برچسب‌های مخصوص این اپیزود',
    }),
    defineField({
      name: 'viewCount',
      title: 'تعداد بازدید',
      type: 'number',
      description: 'تعداد بازدید این اپیزود (خودکار محاسبه می‌شود)',
      readOnly: true,
      initialValue: 0,
    }),
    defineField({
      name: 'rating',
      title: 'امتیاز',
      type: 'number',
      description: 'امتیاز کاربران (از 1 تا 5)',
      validation: (rule) => rule.min(1).max(5),
    }),
    defineField({
      name: 'featured',
      title: 'اپیزود ویژه',
      type: 'boolean',
      description: 'آیا این اپیزود در بخش ویژه نمایش داده شود؟',
      initialValue: false,
    }),
    defineField({
      name: 'isActive',
      title: 'فعال',
      type: 'boolean',
      description: 'آیا این اپیزود در سایت نمایش داده شود؟',
      initialValue: true,
    }),
    defineField({
      name: 'notes',
      title: 'یادداشت‌های داخلی',
      type: 'text',
      description: 'یادداشت‌هایی برای تیم تولید (نمایش داده نمی‌شود)',
      rows: 3,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      show: 'show.title',
      seasonNumber: 'season.seasonNumber',
      episodeNumber: 'episodeNumber',
      duration: 'duration',
      status: 'status',
      media: 'thumbnail',
      isActive: 'isActive',
      featured: 'featured',
      airDate: 'airDate',
    },
    prepare({title, show, seasonNumber, episodeNumber, duration, status, media, isActive, featured, airDate}) {
      const statusLabels: {[key: string]: string} = {
        draft: 'پیش‌نویس',
        published: 'منتشر شده',
        scheduled: 'برنامه‌ریزی شده',
        archived: 'بایگانی شده',
      };
      
      const statusText = statusLabels[status] || status;
      const durationText = duration ? `${duration} دقیقه` : '';
      
      let displayTitle = `${title}`;
      if (show && seasonNumber && episodeNumber) {
        displayTitle = `${show} - S${seasonNumber}E${episodeNumber}: ${title}`;
      }
      
      let subtitle = statusText;
      if (durationText) {
        subtitle += ` | ${durationText}`;
      }
      if (airDate) {
        const airDateFormatted = new Date(airDate).toLocaleDateString('fa-IR');
        subtitle += ` | ${airDateFormatted}`;
      }
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
      title: 'بر اساس برنامه و اپیزود',
      name: 'byShowAndEpisode',
      by: [
        {field: 'show.title', direction: 'asc'},
        {field: 'season.seasonNumber', direction: 'asc'},
        {field: 'episodeNumber', direction: 'asc'}
      ]
    },
    {
      title: 'جدیدترین اپیزودها',
      name: 'byPublishedDate',
      by: [
        {field: 'publishedAt', direction: 'desc'}
      ]
    },
    {
      title: 'بر اساس تاریخ پخش',
      name: 'byAirDate',
      by: [
        {field: 'airDate', direction: 'desc'}
      ]
    },
    {
      title: 'محبوب‌ترین',
      name: 'byViewCount',
      by: [
        {field: 'viewCount', direction: 'desc'}
      ]
    }
  ]
})