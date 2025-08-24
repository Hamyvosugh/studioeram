// studio-eramtv/schemaTypes/podcastType.ts
import {defineField, defineType} from 'sanity'

export const podcastType = defineType({
  name: 'podcast',
  title: 'برنامه پادکست',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'عنوان برنامه پادکست',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'اسلاگ',
      type: 'slug',
      options: {source: 'title'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'shortDescription',
      title: 'توضیحات کوتاه',
      type: 'text',
      description: 'خلاصه کوتاه برنامه پادکست (حداکثر 200 کاراکتر)',
      validation: (rule) => rule.required().max(200),
      rows: 3,
    }),
    defineField({
      name: 'longDescription',
      title: 'توضیحات کامل',
      type: 'text',
      description: 'معرفی کامل برنامه پادکست',
      validation: (rule) => rule.required(),
      rows: 6,
    }),
    defineField({
      name: 'image',
      title: 'تصویر برنامه',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
      description: 'تصویر کاور برنامه پادکست',
    }),
    defineField({
      name: 'promoAudio',
      title: 'فایل صوتی پروموشن',
      type: 'object',
      description: 'فایل صوتی برای معرفی و تبلیغ برنامه',
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
          title: 'کد امبد',
          type: 'text',
          description: 'کد HTML embed از پلتفرم‌هایی مثل SoundCloud یا Spotify',
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
          title: 'مدت زمان (ثانیه)',
          type: 'number',
          description: 'مدت زمان فایل صوتی به ثانیه',
          validation: (rule) => rule.min(1).max(1800), // حداکثر 30 دقیقه برای پرومو
        },
            ],
          }),
          defineField({
            name: 'producer',
            title: 'نام تهیه‌کننده',
            type: 'string',
            validation: (rule) => rule.required(),
          }),
          defineField({
            name: 'host',
            title: 'نام مجری',
            type: 'string',
            validation: (rule) => rule.required(),
          }),
          defineField({
            name: 'categories',
            title: 'دسته‌بندی‌ها',
            type: 'array',
            of: [
        {
          type: 'reference',
          to: [{type: 'category'}],
        },
            ],
            validation: (rule) => rule.required().min(1).max(3),
            description: 'دسته‌بندی‌های مرتبط با برنامه پادکست',
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
            description: 'برچسب‌های عمومی برای دسته‌بندی بهتر',
          }),
          defineField({
            name: 'startDate',
            title: 'تاریخ شروع',
            type: 'date',
            description: 'تاریخ شروع پخش برنامه پادکست',
            validation: (rule) => rule.required(),
          }),
          defineField({
            name: 'status',
            title: 'وضعیت برنامه',
            type: 'string',
            options: {
        list: [
          {title: 'فعال', value: 'active'},
          {title: 'تمام شده', value: 'completed'},
          {title: 'متوقف شده', value: 'paused'},
          {title: 'در انتظار شروع', value: 'upcoming'},
        ],
        layout: 'radio',
            },
            initialValue: 'active',
            validation: (rule) => rule.required(),
          }),
          defineField({
            name: 'language',
            title: 'زبان اصلی',
            type: 'string',
            options: {
        list: [
          {title: 'فارسی', value: 'persian'},
          {title: 'دری', value: 'dari'},
          {title: 'پشتو', value: 'pashto'},
          {title: 'آلمانی', value: 'german'},
          {title: 'انگلیسی', value: 'english'},
          {title: 'عربی', value: 'arabic'},
          {title: 'سایر', value: 'other'},
        ],
        layout: 'dropdown',
            },
            initialValue: 'persian',
          }),
          defineField({
            name: 'totalEpisodes',
            title: 'تعداد کل اپیزودها',
            type: 'number',
            description: 'تعداد اپیزودهای منتشر شده',
            // Removed readOnly and initialValue so it can be set manually
            validation: (rule) => rule.min(0),
          }),
          defineField({
            name: 'averageEpisodeDuration',
            title: 'مدت زمان متوسط اپیزودها (دقیقه)',
            type: 'number',
            description: 'متوسط مدت زمان اپیزودها به دقیقه',
            validation: (rule) => rule.min(1).max(300), // حداکثر 5 ساعت
    }),
    defineField({
      name: 'releaseSchedule',
      title: 'برنامه انتشار',
      type: 'string',
      description: 'برنامه زمانی انتشار اپیزودهای جدید',
      options: {
        list: [
          {title: 'روزانه', value: 'daily'},
          {title: 'هفتگی', value: 'weekly'},
          {title: 'دوهفته‌ای', value: 'biweekly'},
          {title: 'ماهانه', value: 'monthly'},
          {title: 'نامنظم', value: 'irregular'},
        ],
        layout: 'dropdown',
      },
      initialValue: 'weekly',
    }),
    defineField({
      name: 'isActive',
      title: 'فعال',
      type: 'boolean',
      description: 'آیا این برنامه در سایت نمایش داده شود؟',
      initialValue: true,
    }),
    defineField({
      name: 'featured',
      title: 'ویژه',
      type: 'boolean',
      description: 'آیا این برنامه در بخش ویژه نمایش داده شود؟',
      initialValue: false,
    }),
    defineField({
      name: 'heroShow',
      title: 'پخش در هرو',
      type: 'boolean',
      description: 'آیا این برنامه در بخش هرو (صفحه اول) نمایش داده شود؟',
      initialValue: false,
    }),
    defineField({
      name: 'socialLinks',
      title: 'لینک‌های شبکه‌های اجتماعی',
      type: 'object',
      description: 'لینک‌های مرتبط با برنامه در شبکه‌های اجتماعی',
      options: {
        collapsible: true,
        collapsed: true,
      },
      fields: [
        {
          name: 'spotify',
          title: 'Spotify',
          type: 'url',
        },
        {
          name: 'soundcloud',
          title: 'SoundCloud',
          type: 'url',
        },
        {
          name: 'applePodcasts',
          title: 'Apple Podcasts',
          type: 'url',
        },
        {
          name: 'googlePodcasts',
          title: 'Google Podcasts',
          type: 'url',
        },
        {
          name: 'castbox',
          title: 'Castbox',
          type: 'url',
        },
        {
          name: 'website',
          title: 'وب‌سایت اختصاصی',
          type: 'url',
        },
      ],
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
      shortDescription: 'shortDescription',
      producer: 'producer',
      host: 'host',
      status: 'status',
      totalEpisodes: 'totalEpisodes',
      media: 'image',
      isActive: 'isActive',
      featured: 'featured',
      heroShow: 'heroShow',
    },
    prepare({title, shortDescription, producer, host, status, totalEpisodes, media, isActive, featured, heroShow}) {
      const statusLabels: {[key: string]: string} = {
        active: 'فعال',
        completed: 'تمام شده',
        paused: 'متوقف شده',
        upcoming: 'در انتظار شروع',
      };
      
      const statusText = statusLabels[status] || status;
      const episodeCount = totalEpisodes || 0;
      
      let subtitle = `${producer} | ${host} | ${statusText} | ${episodeCount} اپیزود`;
      if (!isActive) {
        subtitle += ' | غیرفعال';
      }
      if (featured) {
        subtitle += ' | ویژه';
      }
      if (heroShow) {
        subtitle += ' | هرو';
      }
      
      return {
        title: title,
        subtitle: subtitle,
        media: media,
      }
    },
  },
  orderings: [
    {
      title: 'جدیدترین',
      name: 'newestFirst',
      by: [
        {field: '_createdAt', direction: 'desc'}
      ]
    },
    {
      title: 'بر اساس تاریخ شروع',
      name: 'byStartDate',
      by: [
        {field: 'startDate', direction: 'desc'}
      ]
    },
    {
      title: 'حروف الفبا',
      name: 'alphabetical',
      by: [
        {field: 'title', direction: 'asc'}
      ]
    },
    {
      title: 'محبوب‌ترین (تعداد اپیزود)',
      name: 'byEpisodeCount',
      by: [
        {field: 'totalEpisodes', direction: 'desc'}
      ]
    }
  ]
})