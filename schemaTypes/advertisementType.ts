// studio-eramtv/schemaTypes/advertisementType.ts
import {defineField, defineType} from 'sanity'

export const advertisementType = defineType({
  name: 'advertisement',
  title: 'تبلیغات',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'عنوان',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'توضیحات',
      type: 'text',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'buttonText',
      title: 'نوشته دکمه',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'buttonLink',
      title: 'لینک دکمه',
      type: 'url',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'تصویر',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'priority',
      title: 'اولویت نمایش',
      type: 'number',
      description: 'عدد کمتر یعنی اولویت بالاتر (1 = بالاترین اولویت)',
      initialValue: 1,
      validation: (rule) => rule.min(1).max(100).required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
      media: 'image',
      priority: 'priority',
    },
    prepare({title, subtitle, media, priority}) {
      return {
        title: `${priority}. ${title}`,
        subtitle: subtitle?.slice(0, 60) + (subtitle?.length > 60 ? '...' : ''),
        media,
      }
    },
  },
})