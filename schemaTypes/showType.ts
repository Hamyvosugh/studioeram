// studio-eramtv/schemaTypes/showType.ts
import {defineField, defineType} from 'sanity'

export const showType = defineType({
  name: 'show',
  title: 'برنامه',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'عنوان برنامه',
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
      description: 'خلاصه کوتاه برنامه (حداکثر 200 کاراکتر)',
      validation: (rule) => rule.required().max(200),
      rows: 3,
    }),
    defineField({
      name: 'longDescription',
      title: 'توضیحات کامل',
      type: 'text',
      description: 'معرفی کامل برنامه',
      validation: (rule) => rule.required(),
      rows: 6,
    }),
    defineField({
      name: 'poster',
      title: 'پوستر/تامبنیل برنامه',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'trailerVideo',
      title: 'ویدیو تبلیغاتی/تریلر',
      type: 'object',
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
          description: 'مدت زمان ویدیو به ثانیه',
          validation: (rule) => rule.min(1).max(3600),
        },
      ],
    }),
    defineField({
      name: 'categories',
      title: 'دسته‌بندی‌ها',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'showCategory'}],
        },
      ],
      validation: (rule) => rule.required().min(1).max(5),
    }),
    defineField({
      name: 'startYear',
      title: 'سال شروع تولید',
      type: 'number',
      validation: (rule) => rule.required().min(1900).max(new Date().getFullYear() + 2),
    }),
    defineField({
      name: 'endYear',
      title: 'سال پایان (اختیاری)',
      type: 'number',
      description: 'اگر برنامه به پایان رسیده، سال پایان را وارد کنید',
      validation: (rule) => 
        rule.custom((endYear, context) => {
          const startYear = (context.parent as any)?.startYear;
          if (endYear && startYear && endYear < startYear) {
            return 'سال پایان نمی‌تواند قبل از سال شروع باشد';
          }
          if (endYear && endYear > new Date().getFullYear() + 2) {
            return 'سال پایان نمی‌تواند خیلی در آینده باشد';
          }
          return true;
        }),
    }),
    defineField({
      name: 'status',
      title: 'وضعیت برنامه',
      type: 'string',
      options: {
        list: [
          {title: 'در حال پخش', value: 'ongoing'},
          {title: 'تمام شده', value: 'completed'},
          {title: 'متوقف شده', value: 'cancelled'},
          {title: 'در انتظار شروع', value: 'upcoming'},
        ],
        layout: 'radio',
      },
      initialValue: 'ongoing',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'director',
      title: 'کارگردان',
      type: 'string',
    }),
    defineField({
      name: 'producer',
      title: 'تهیه‌کننده',
      type: 'string',
    }),
    defineField({
      name: 'cast',
      title: 'بازیگران/مجریان اصلی',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'نام',
              type: 'string',
              validation: (rule) => rule.required(),
            },
            {
              name: 'role',
              title: 'نقش',
              type: 'string',
              description: 'مثل: مجری، بازیگر اصلی، مهمان ویژه',
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
    }),
    defineField({
      name: 'ageRating',
      title: 'رده‌بندی سنی',
      type: 'string',
      options: {
        list: [
          {title: 'همه سنین', value: 'همه سنین'},
          {title: '3+ سال', value: '3+'},
          {title: '7+ سال', value: '7+'},
          {title: '12+ سال', value: '12+'},
          {title: '15+ سال', value: '15+'},
          {title: '18+ سال', value: '18+'},
        ],
        layout: 'dropdown',
      },
      initialValue: 'all',
    }),
    defineField({
      name: 'country',
      title: 'کشور سازنده',
      type: 'string',
      options: {
        list: [
          {title: 'ایران', value: 'iran'},
          {title: 'افغانستان', value: 'afghanistan'},
          {title: 'آلمان', value: 'germany'},
          {title: 'انگلیس', value: 'uk'},
          {title: 'آمریکا', value: 'usa'},
          {title: 'فرانسه', value: 'france'},
          {title: 'ترکیه', value: 'turkey'},
          {title: 'سایر', value: 'other'},
        ],
        layout: 'dropdown',
      },
      initialValue: 'iran',
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
          {title: 'ترکی', value: 'turkish'},
          {title: 'سایر', value: 'other'},
        ],
        layout: 'dropdown',
      },
      initialValue: 'persian',
    }),
    defineField({
      name: 'totalEpisodes',
      title: 'تعداد کل اپیزودها (پیش‌بینی)',
      type: 'number',
      description: 'تعداد کل اپیزودهایی که قرار است تولید شود',
      validation: (rule) => rule.min(0).max(10000),
    }),
    defineField({
      name: 'averageEpisodeDuration',
      title: 'مدت زمان متوسط هر اپیزود (دقیقه)',
      type: 'number',
      description: 'متوسط مدت زمان اپیزودها به دقیقه',
      validation: (rule) => rule.min(1).max(600),
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
  ],
  preview: {
    select: {
      title: 'title',
      shortDescription: 'shortDescription',
      startYear: 'startYear',
      endYear: 'endYear',
      status: 'status',
      categories: 'categories',
      media: 'poster',
      isActive: 'isActive',
      featured: 'featured',
      heroShow: 'heroShow',
    },
    prepare({title, shortDescription, startYear, endYear, status, categories, media, isActive, featured, heroShow}) {
      const yearRange = endYear ? `${startYear}-${endYear}` : `${startYear}-اکنون`;
      const statusLabels: {[key: string]: string} = {
        ongoing: 'در حال پخش',
        completed: 'تمام شده',
        cancelled: 'متوقف شده',
        upcoming: 'در انتظار شروع',
      };
      
      const statusText = statusLabels[status] || status;
      const categoryCount = categories?.length || 0;
      
      let subtitle = `${yearRange} | ${statusText}`;
      if (categoryCount > 0) {
        subtitle += ` | ${categoryCount} دسته‌بندی`;
      }
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
      title: 'بر اساس سال شروع',
      name: 'byStartYear',
      by: [
        {field: 'startYear', direction: 'desc'}
      ]
    },
    {
      title: 'حروف الفبا',
      name: 'alphabetical',
      by: [
        {field: 'title', direction: 'asc'}
      ]
    }
  ]
})