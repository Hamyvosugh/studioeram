// studio-eramtv/schemaTypes/topicType.ts
import {defineField, defineType} from 'sanity'

export const topicType = defineType({
  name: 'topic',
  title: 'موضوع',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'عنوان',
      type: 'string',
      validation: (rule) => rule.required(),
      options: {
        list: [
          {title: 'زنده', value: 'live'},
          {title: 'خبر', value: 'news'},
          {title: 'پادکست', value: 'podcast'},
          {title: 'برنامه', value: 'program'},
          {title: 'برنامه تلویزیونی', value: 'show'},
        ],
      },
    }),
    defineField({
      name: 'slug',
      title: 'اسلاگ',
      type: 'slug',
      options: {source: 'title'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'توضیحات',
      type: 'text',
    }),
    defineField({
      name: 'color',
      title: 'رنگ',
      type: 'string',
      options: {
        list: [
          {title: 'قرمز (زنده)', value: '#ef4444'},
          {title: 'آبی (خبر)', value: '#64748b'},
          {title: 'بنفش (پادکست)', value: '#8b5cf6'},
          {title: 'سبز (برنامه)', value: '#10b981'},
          {title: 'نارنجی (برنامه تلویزیونی)', value: '#f97316'},
          {title: 'صورتی', value: '#ec4899'},
          {title: 'خاکستری', value: '#6b7280'},
        ],
        layout: 'dropdown',
      },
      initialValue: '#3b82f6',
    }),
    defineField({
      name: 'icon',
      title: 'آیکون',
      type: 'string',
      description: 'نام آیکون برای نمایش در رابط کاربری',
      options: {
        list: [
          {title: '📺 تلویزیون (زنده)', value: 'tv'},
          {title: '📰 روزنامه (خبر)', value: 'newspaper'},
          {title: '🎧 هدفون (پادکست)', value: 'headphones'},
          {title: '🎬 کلاپر (برنامه)', value: 'clapperboard'},
          {title: '🎭 تئاتر (برنامه تلویزیونی)', value: 'theater'},
        ],
      },
    }),
    defineField({
      name: 'priority',
      title: 'اولویت',
      type: 'number',
      description: 'عدد کمتر یعنی اولویت بیشتر',
      initialValue: 1,
      validation: (rule) => rule.min(1).max(10),
    }),
    defineField({
      name: 'contentType',
      title: 'نوع محتوا',
      type: 'string',
      description: 'این موضوع برای چه نوع محتوایی استفاده می‌شود؟',
      options: {
        list: [
          {title: 'پست‌ها (اخبار)', value: 'post'},
          {title: 'برنامه‌های تلویزیونی', value: 'show'},
          {title: 'پادکست‌ها', value: 'podcast'},
          {title: 'همه', value: 'all'},
        ],
        layout: 'radio',
      },
      initialValue: 'post',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      color: 'color',
      icon: 'icon',
      contentType: 'contentType',
    },
    prepare({title, color, icon, contentType}) {
      const contentTypeLabels: {[key: string]: string} = {
        post: 'پست‌ها',
        show: 'برنامه‌ها',
        podcast: 'پادکست‌ها',
        all: 'همه',
      };
      
      const contentTypeText = contentTypeLabels[contentType] || contentType;
      
      return {
        title: title,
        subtitle: `${contentTypeText} | آیکون: ${icon || 'بدون آیکون'}`,
      }
    },
  },
  orderings: [
    {
      title: 'بر اساس اولویت',
      name: 'byPriority',
      by: [
        {field: 'priority', direction: 'asc'}
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
      title: 'بر اساس نوع محتوا',
      name: 'byContentType',
      by: [
        {field: 'contentType', direction: 'asc'},
        {field: 'priority', direction: 'asc'}
      ]
    }
  ]
})