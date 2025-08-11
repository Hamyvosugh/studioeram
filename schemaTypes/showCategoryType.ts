// studio-eramtv/schemaTypes/showCategoryType.ts
import {defineField, defineType} from 'sanity'

export const showCategoryType = defineType({
  name: 'showCategory',
  title: 'دسته‌بندی برنامه‌ها',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'عنوان دسته‌بندی',
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
      name: 'description',
      title: 'توضیحات',
      type: 'text',
      description: 'توضیح کوتاه درباره این دسته‌بندی',
    }),
    defineField({
      name: 'color',
      title: 'رنگ',
      type: 'string',
      options: {
        list: [
          {title: 'قرمز (اکشن/هیجان)', value: '#ef4444'},
          {title: 'آبی (درام)', value: '#3b82f6'},
          {title: 'سبز (ورزش)', value: '#10b981'},
          {title: 'زرد (کمدی)', value: '#f59e0b'},
          {title: 'بنفش (کودکان)', value: '#8b5cf6'},
          {title: 'صورتی (عاشقانه)', value: '#ec4899'},
          {title: 'نارنجی (خانوادگی)', value: '#f97316'},
          {title: 'خاکستری (مستند)', value: '#6b7280'},
          {title: 'سبز آبی (طبیعت)', value: '#06b6d4'},
          {title: 'سبز تیره (ماجراجویی)', value: '#059669'},
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
          {title: '🎬 فیلم/سینما', value: 'movie'},
          {title: '⚽ ورزش', value: 'sports'},
          {title: '👨‍👩‍👧‍👦 خانواده', value: 'family'},
          {title: '😂 کمدی', value: 'comedy'},
          {title: '🎭 درام', value: 'drama'},
          {title: '📚 مستند', value: 'documentary'},
          {title: '👶 کودکان', value: 'kids'},
          {title: '💝 عاشقانه', value: 'romance'},
          {title: '🎵 موزیک', value: 'music'},
          {title: '🍳 آشپزی', value: 'cooking'},
          {title: '🌍 طبیعت', value: 'nature'},
          {title: '🌍 زنان', value: 'woman'},
          {title: '💼 کسب و کار', value: 'business'},
        ],
        layout: 'dropdown',
      },
    }),
    defineField({
      name: 'priority',
      title: 'اولویت نمایش',
      type: 'number',
      description: 'عدد کمتر یعنی اولویت بیشتر در نمایش (1 = بالاترین)',
      initialValue: 10,
      validation: (rule) => rule.min(1).max(100),
    }),
    defineField({
      name: 'isActive',
      title: 'فعال',
      type: 'boolean',
      description: 'آیا این دسته‌بندی در سایت نمایش داده شود؟',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      priority: 'priority',
      color: 'color',
      icon: 'icon',
      isActive: 'isActive',
    },
    prepare({title, priority, color, icon, isActive}) {
      return {
        title: title,
        subtitle: `اولویت: ${priority} | ${isActive ? 'فعال' : 'غیرفعال'} | ${icon || 'بدون آیکون'}`,
      }
    },
  },
  orderings: [
    {
      title: 'اولویت نمایش',
      name: 'priorityAsc',
      by: [
        {field: 'priority', direction: 'asc'}
      ]
    },
    {
      title: 'حروف الفبا',
      name: 'titleAsc',
      by: [
        {field: 'title', direction: 'asc'}
      ]
    }
  ]
})