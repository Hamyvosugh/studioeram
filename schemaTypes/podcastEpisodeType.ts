// studio-eramtv/schemaTypes/podcastEpisodeType.ts
import {defineField, defineType} from 'sanity'

export const podcastEpisodeType = defineType({
  name: 'podcastEpisode',
  title: 'اپیزود پادکست',
  type: 'document',
  fields: [
    defineField({
      name: 'podcast',
      title: 'برنامه پادکست',
      type: 'reference',
      to: [{type: 'podcast'}],
      validation: (rule) => rule.required(),
      description: 'برنامه پادکستی که این اپیزود متعلق به آن است',
    }),
    defineField({
      name: 'episodeNumber',
      title: 'شماره اپیزود',
      type: 'number',
      validation: (rule) => rule.required().min(1).max(10000),
      description: 'شماره اپیزود در کل برنامه (مثل 1، 2، 3 و...)',
    }),
    defineField({
      name: 'title',
      title: 'تیتر اپیزود',
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
          const podcastTitle = doc.podcast?.title || 'podcast'
          const episodeNumber = doc.episodeNumber || 'episode'
          const episodeTitle = doc.title || ''
          return `${podcastTitle}-ep${episodeNumber}-${episodeTitle}`
        },
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'توضیحات',
      type: 'text',
      description: 'توضیح کامل درباره محتوای این اپیزود',
      validation: (rule) => rule.required(),
      rows: 6,
    }),
    defineField({
      name: 'audio',
      title: 'فایل صوتی اپیزود',
      type: 'object',
      validation: (rule) => rule.required(),
      fields: [
        {
          name: 'audioType',
          title: 'نوع فایل صوتی',
          type: 'string',
          options: {
            list: [
              {title: 'آپلود فایل', value: 'upload'},
              {title: 'لینک مستقیم', value: 'direct'},
              {title: 'کد امبد (SoundCloud, Spotify)', value: 'embed'},
            ],
            layout: 'radio',
          },
          initialValue: 'upload',
          validation: (rule) => rule.required(),
        },
        {
          name: 'audioFile',
          title: 'فایل صوتی',
          type: 'file',
          options: {
            accept: 'audio/*',
          },
          hidden: ({parent}) => parent?.audioType !== 'upload',
          validation: (rule) =>
            rule.custom((value, context) => {
              const audioType = (context.parent as any)?.audioType
              if (audioType === 'upload' && !value) {
                return 'فایل صوتی الزامی است'
              }
              return true
            }),
        },
        {
          name: 'audioUrl',
          title: 'لینک فایل صوتی',
          type: 'url',
          hidden: ({parent}) => parent?.audioType !== 'direct',
          validation: (rule) =>
            rule.custom((value, context) => {
              const audioType = (context.parent as any)?.audioType
              if (audioType === 'direct' && !value) {
                return 'لینک فایل صوتی الزامی است'
              }
              return true
            }),
        },
        {
          name: 'embedCode',
          title: 'کد امبد فایل صوتی',
          type: 'text',
          description: 'کد HTML embed از پلتفرم‌هایی مثل SoundCloud، Spotify، یا Apple Podcasts',
          hidden: ({parent}) => parent?.audioType !== 'embed',
          validation: (rule) =>
            rule.custom((value, context) => {
              const audioType = (context.parent as any)?.audioType
              if (audioType === 'embed' && !value) {
                return 'کد امبد الزامی است'
              }
              return true
            }),
        },
        {
          name: 'duration',
          title: 'مدت زمان (دقیقه)',
          type: 'number',
          description: 'مدت زمان دقیق اپیزود به دقیقه',
          validation: (rule) => rule.required().min(1).max(300), // حداکثر 5 ساعت
        },
        {
          name: 'fileSize',
          title: 'حجم فایل (مگابایت)',
          type: 'number',
          description: 'حجم فایل صوتی به مگابایت (اختیاری)',
          validation: (rule) => rule.min(0.1).max(500), // حداکثر 500 مگابایت
        },
        {
          name: 'quality',
          title: 'کیفیت صوتی',
          type: 'string',
          options: {
            list: [
              {title: 'استاندارد (128 kbps)', value: '128'},
              {title: 'خوب (192 kbps)', value: '192'},
              {title: 'عالی (320 kbps)', value: '320'},
              {title: 'بدون فشرده‌سازی (FLAC)', value: 'flac'},
            ],
            layout: 'dropdown',
          },
          initialValue: '192',
        },
      ],
    }),
    defineField({
      name: 'image',
      title: 'تصویر اپیزود',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
      description: 'تصویر شاخص این اپیزود (اگر ندارید، از تصویر برنامه استفاده می‌شود)',
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
              title: 'نقش/تخصص',
              type: 'string',
              description: 'مثل: کارشناس، نویسنده، هنرمند، فعال اجتماعی',
            },
            {
              name: 'bio',
              title: 'معرفی کوتاه',
              type: 'text',
              rows: 2,
              description: 'معرفی کوتاه از مهمان',
            },
            {
              name: 'photo',
              title: 'عکس',
              type: 'image',
              options: {
                hotspot: true,
              },
            },
            {
              name: 'socialLinks',
              title: 'لینک‌های اجتماعی',
              type: 'object',
              fields: [
                {
                  name: 'website',
                  title: 'وب‌سایت',
                  type: 'url',
                },
                {
                  name: 'instagram',
                  title: 'اینستاگرام',
                  type: 'url',
                },
                {
                  name: 'twitter',
                  title: 'X (توییتر)',
                  type: 'url',
                },
                {
                  name: 'linkedin',
                  title: 'لینکدین',
                  type: 'url',
                },
              ],
              options: {
                collapsible: true,
                collapsed: true,
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
      name: 'publishedAt',
      title: 'تاریخ انتشار',
      type: 'datetime',
      description: 'زمان انتشار اپیزود',
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
      name: 'transcript',
      title: 'متن کامل (Transcript)',
      type: 'text',
      description: 'متن کامل مکالمات این اپیزود (اختیاری)',
      rows: 10,
    }),
    defineField({
      name: 'chapters',
      title: 'فهرست مطالب',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'chapter',
          title: 'بخش',
          fields: [
            {
              name: 'title',
              title: 'عنوان بخش',
              type: 'string',
              validation: (rule) => rule.required(),
            },
            {
              name: 'startTime',
              title: 'زمان شروع (ثانیه)',
              type: 'number',
              description: 'زمان شروع این بخش از ابتدای اپیزود (به ثانیه)',
              validation: (rule) => rule.required().min(0),
            },
            {
              name: 'description',
              title: 'توضیحات',
              type: 'text',
              rows: 2,
            },
          ],
          preview: {
            select: {
              title: 'title',
              startTime: 'startTime',
            },
            prepare({title, startTime}) {
              const minutes = Math.floor(startTime / 60);
              const seconds = startTime % 60;
              const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
              return {
                title: title,
                subtitle: `شروع: ${timeString}`,
              }
            },
          },
        },
      ],
      description: 'فهرست مطالب و بخش‌های مختلف اپیزود',
    }),
    defineField({
      name: 'playCount',
      title: 'تعداد پخش',
      type: 'number',
      description: 'تعداد دفعات پخش این اپیزود (خودکار محاسبه می‌شود)',
      readOnly: true,
      initialValue: 0,
    }),
    defineField({
      name: 'downloadCount',
      title: 'تعداد دانلود',
      type: 'number',
      description: 'تعداد دفعات دانلود این اپیزود (خودکار محاسبه می‌شود)',
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
      name: 'heroShow',
      title: 'پخش در هرو',
      type: 'boolean',
      description: 'آیا این اپیزود در بخش هرو (صفحه اول) نمایش داده شود؟',
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
      podcast: 'podcast.title',
      episodeNumber: 'episodeNumber',
      duration: 'audio.duration',
      status: 'status',
      guests: 'guests',
      media: 'image',
      isActive: 'isActive',
      featured: 'featured',
      heroShow: 'heroShow',
      publishedAt: 'publishedAt',
    },
    prepare({title, podcast, episodeNumber, duration, status, guests, media, isActive, featured, heroShow, publishedAt}) {
      const statusLabels: {[key: string]: string} = {
        draft: 'پیش‌نویس',
        published: 'منتشر شده',
        scheduled: 'برنامه‌ریزی شده',
        archived: 'بایگانی شده',
      }

      const statusText = statusLabels[status] || status
      const durationText = duration ? `${duration} دقیقه` : ''
      const guestCount = guests?.length || 0
      const guestText = guestCount > 0 ? `${guestCount} مهمان` : 'بدون مهمان'

      let displayTitle = `${title}`
      if (podcast && episodeNumber) {
        displayTitle = `${podcast} - قسمت ${episodeNumber}: ${title}`
      }

      let subtitle = statusText
      if (durationText) {
        subtitle += ` | ${durationText}`
      }
      if (guestText) {
        subtitle += ` | ${guestText}`
      }
      if (publishedAt) {
        const publishDateFormatted = new Date(publishedAt).toLocaleDateString('fa-IR')
        subtitle += ` | ${publishDateFormatted}`
      }
      if (!isActive) {
        subtitle += ' | غیرفعال'
      }
      if (featured) {
        subtitle += ' | ویژه'
      }
      if (heroShow) {
        subtitle += ' | هرو'
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
      title: 'بر اساس برنامه و شماره اپیزود',
      name: 'byPodcastAndEpisode',
      by: [
        {field: 'podcast.title', direction: 'asc'},
        {field: 'episodeNumber', direction: 'desc'},
      ],
    },
    {
      title: 'جدیدترین اپیزودها',
      name: 'byPublishedDate',
      by: [{field: 'publishedAt', direction: 'desc'}],
    },
    {
      title: 'محبوب‌ترین (تعداد پخش)',
      name: 'byPlayCount',
      by: [{field: 'playCount', direction: 'desc'}],
    },
    {
      title: 'بالاترین امتیاز',
      name: 'byRating',
      by: [{field: 'rating', direction: 'desc'}],
    },
  ],
})