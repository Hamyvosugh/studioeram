// ==================================================
// homepageSectionType.ts - بخش‌های قابل تنظیم صفحه اصلی (به‌روزرسانی شده)
// ==================================================
import {defineField, defineType} from 'sanity'

export const homepageSectionType = defineType({
  name: 'homepageSection',
  title: 'بخش‌های صفحه اصلی',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'عنوان بخش',
      type: 'string',
      validation: (rule) => rule.required(),
      description: 'عنوانی که در بالای بخش نمایش داده می‌شود',
    }),

    defineField({
      name: 'isActive',
      title: 'فعال',
      type: 'boolean',
      description: 'آیا این بخش در صفحه اصلی نمایش داده شود؟',
      initialValue: true,
    }),

    defineField({
      name: 'order',
      title: 'ترتیب نمایش',
      type: 'number',
      description: 'ترتیب نمایش در صفحه (عدد کمتر = بالاتر)',
      validation: (rule) => rule.required().min(1).max(100),
      initialValue: 1,
    }),

    defineField({
      name: 'contentType',
      title: 'نوع محتوا',
      type: 'string',
      options: {
        list: [
          {title: 'پست‌ها (اخبار)', value: 'posts'},
          {title: 'برنامه‌های تلویزیونی', value: 'shows'},
          {title: 'اپیزودها', value: 'episodes'},
          {title: 'پادکست‌ها', value: 'podcasts'},
          {title: 'اپیزودهای پادکست', value: 'podcastEpisodes'},
          {title: 'ترکیبی (پست + برنامه)', value: 'mixed'},
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
      initialValue: 'posts',
    }),

    defineField({
      name: 'displayStyle',
      title: 'نحوه نمایش',
      type: 'string',
      options: {
        list: [
          {title: 'کارت افقی (مانند ShowCard)', value: 'horizontal-card'},
          {title: 'کارت عمودی', value: 'vertical-card'},
          {title: 'لیست ساده', value: 'simple-list'},
          {title: 'شبکه‌ای (Grid)', value: 'grid'},
          {title: 'اسلایدر', value: 'slider'},
          {title: 'هرو بزرگ', value: 'hero'},
          {title: 'پلیر صوتی', value: 'audio-player'}, // برای پادکست‌ها
        ],
        layout: 'dropdown',
      },
      validation: (rule) => rule.required(),
      initialValue: 'horizontal-card',
    }),

    defineField({
      name: 'itemsToShow',
      title: 'تعداد آیتم‌های نمایشی',
      type: 'number',
      description: 'تعداد آیتم‌هایی که در این بخش نمایش داده شود',
      validation: (rule) => rule.required().min(1).max(50),
      initialValue: 10,
    }),

    defineField({
      name: 'filterSettings',
      title: 'تنظیمات فیلتر محتوا',
      type: 'object',
      fields: [
        // فیلتر بر اساس زمان
        defineField({
          name: 'timeFilter',
          title: 'فیلتر زمانی',
          type: 'object',
          fields: [
            {
              name: 'enabled',
              title: 'فعال',
              type: 'boolean',
              initialValue: false,
            },
            {
              name: 'timeRange',
              title: 'بازه زمانی',
              type: 'string',
              options: {
                list: [
                  {title: 'آخرین 24 ساعت', value: 'last-24-hours'},
                  {title: 'آخرین هفته', value: 'last-week'},
                  {title: 'آخرین ماه', value: 'last-month'},
                  {title: 'آخرین 3 ماه', value: 'last-3-months'},
                  {title: 'آخرین سال', value: 'last-year'},
                  {title: 'تاریخ سفارشی', value: 'custom'},
                ],
              },
              hidden: ({parent}) => !parent?.enabled,
            },
            {
              name: 'customStartDate',
              title: 'تاریخ شروع سفارشی',
              type: 'date',
              hidden: ({parent}) => !parent?.enabled || parent?.timeRange !== 'custom',
            },
            {
              name: 'customEndDate',
              title: 'تاریخ پایان سفارشی',
              type: 'date',
              hidden: ({parent}) => !parent?.enabled || parent?.timeRange !== 'custom',
            },
          ],
        }),

        // فیلتر بر اساس دسته‌بندی
        defineField({
          name: 'categoryFilter',
          title: 'فیلتر دسته‌بندی',
          type: 'object',
          fields: [
            {
              name: 'enabled',
              title: 'فعال',
              type: 'boolean',
              initialValue: false,
            },
            {
              name: 'categories',
              title: 'دسته‌بندی‌های انتخابی',
              type: 'array',
              of: [
                {
                  type: 'reference',
                  to: [{type: 'category'}],
                },
              ],
              hidden: ({parent}) => !parent?.enabled,
            },
            {
              name: 'showCategories',
              title: 'دسته‌بندی‌های برنامه‌ها',
              type: 'array',
              of: [
                {
                  type: 'reference',
                  to: [{type: 'showCategory'}],
                },
              ],
              hidden: ({parent}) => !parent?.enabled,
            },
          ],
        }),

        // فیلتر بر اساس برچسب
        defineField({
          name: 'tagFilter',
          title: 'فیلتر برچسب',
          type: 'object',
          fields: [
            {
              name: 'enabled',
              title: 'فعال',
              type: 'boolean',
              initialValue: false,
            },
            {
              name: 'tags',
              title: 'برچسب‌های انتخابی',
              type: 'array',
              of: [
                {
                  type: 'reference',
                  to: [{type: 'tag'}],
                },
              ],
              hidden: ({parent}) => !parent?.enabled,
            },
          ],
        }),

        // فیلتر بر اساس موضوع
        defineField({
          name: 'topicFilter',
          title: 'فیلتر موضوع',
          type: 'object',
          fields: [
            {
              name: 'enabled',
              title: 'فعال',
              type: 'boolean',
              initialValue: false,
            },
            {
              name: 'topics',
              title: 'موضوعات انتخابی',
              type: 'array',
              of: [
                {
                  type: 'reference',
                  to: [{type: 'topic'}],
                },
              ],
              hidden: ({parent}) => !parent?.enabled,
            },
          ],
        }),

        // فیلتر بر اساس منطقه
        defineField({
          name: 'regionFilter',
          title: 'فیلتر منطقه',
          type: 'object',
          fields: [
            {
              name: 'enabled',
              title: 'فعال',
              type: 'boolean',
              initialValue: false,
            },
            {
              name: 'regions',
              title: 'مناطق انتخابی',
              type: 'array',
              of: [
                {
                  type: 'reference',
                  to: [{type: 'region'}],
                },
              ],
              hidden: ({parent}) => !parent?.enabled,
            },
          ],
        }),

        // فیلتر بر اساس ویژه بودن
        defineField({
          name: 'featuredFilter',
          title: 'فیلتر ویژه',
          type: 'object',
          fields: [
            {
              name: 'enabled',
              title: 'فعال',
              type: 'boolean',
              initialValue: false,
            },
            {
              name: 'showOnlyFeatured',
              title: 'فقط ویژه‌ها',
              type: 'boolean',
              description: 'آیا فقط آیتم‌های ویژه نمایش داده شوند؟',
              initialValue: true,
              hidden: ({parent}) => !parent?.enabled,
            },
          ],
        }),

        // فیلتر بر اساس وضعیت
        defineField({
          name: 'statusFilter',
          title: 'فیلتر وضعیت',
          type: 'object',
          fields: [
            {
              name: 'enabled',
              title: 'فعال',
              type: 'boolean',
              initialValue: false,
            },
            {
              name: 'postStatus',
              title: 'وضعیت پست',
              type: 'array',
              of: [{type: 'string'}],
              options: {
                list: [
                  {title: 'منتشر شده', value: 'published'},
                  {title: 'پیش‌نویس', value: 'draft'},
                  {title: 'برنامه‌ریزی شده', value: 'scheduled'},
                ],
              },
              hidden: ({parent}) => !parent?.enabled,
            },
            {
              name: 'showStatus',
              title: 'وضعیت برنامه',
              type: 'array',
              of: [{type: 'string'}],
              options: {
                list: [
                  {title: 'در حال پخش', value: 'ongoing'},
                  {title: 'تمام شده', value: 'completed'},
                  {title: 'متوقف شده', value: 'cancelled'},
                  {title: 'در انتظار شروع', value: 'upcoming'},
                ],
              },
              hidden: ({parent}) => !parent?.enabled,
            },
            {
              name: 'podcastStatus',
              title: 'وضعیت پادکست',
              type: 'array',
              of: [{type: 'string'}],
              options: {
                list: [
                  {title: 'فعال', value: 'active'},
                  {title: 'تمام شده', value: 'completed'},
                  {title: 'متوقف شده', value: 'paused'},
                  {title: 'در انتظار شروع', value: 'upcoming'},
                ],
              },
              hidden: ({parent}) => !parent?.enabled,
            },
          ],
        }),

        // انتخاب دستی آیتم‌ها
        defineField({
          name: 'manualSelection',
          title: 'انتخاب دستی',
          type: 'object',
          fields: [
            {
              name: 'enabled',
              title: 'فعال',
              type: 'boolean',
              initialValue: false,
              description: 'آیا آیتم‌ها به صورت دستی انتخاب شوند؟',
            },
            {
              name: 'selectedPosts',
              title: 'پست‌های انتخابی',
              type: 'array',
              of: [
                {
                  type: 'reference',
                  to: [{type: 'post'}],
                },
              ],
              hidden: ({parent}) => !parent?.enabled,
            },
            {
              name: 'selectedShows',
              title: 'برنامه‌های انتخابی',
              type: 'array',
              of: [
                {
                  type: 'reference',
                  to: [{type: 'show'}],
                },
              ],
              hidden: ({parent}) => !parent?.enabled,
            },
            {
              name: 'selectedEpisodes',
              title: 'اپیزودهای انتخابی',
              type: 'array',
              of: [
                {
                  type: 'reference',
                  to: [{type: 'episode'}],
                },
              ],
              hidden: ({parent}) => !parent?.enabled,
            },
            {
              name: 'selectedPodcasts',
              title: 'پادکست‌های انتخابی',
              type: 'array',
              of: [
                {
                  type: 'reference',
                  to: [{type: 'podcast'}],
                },
              ],
              hidden: ({parent}) => !parent?.enabled,
            },
            {
              name: 'selectedPodcastEpisodes',
              title: 'اپیزودهای پادکست انتخابی',
              type: 'array',
              of: [
                {
                  type: 'reference',
                  to: [{type: 'podcastEpisode'}],
                },
              ],
              hidden: ({parent}) => !parent?.enabled,
            },
          ],
        }),
      ],
      options: {
        collapsible: true,
        collapsed: false,
      },
    }),

    defineField({
      name: 'sortSettings',
      title: 'تنظیمات مرتب‌سازی',
      type: 'object',
      fields: [
        {
          name: 'sortBy',
          title: 'مرتب‌سازی بر اساس',
          type: 'string',
          options: {
            list: [
              {title: 'جدیدترین', value: 'newest'},
              {title: 'قدیمی‌ترین', value: 'oldest'},
              {title: 'بیشترین بازدید/پخش', value: 'most-viewed'},
              {title: 'بالاترین امتیاز', value: 'highest-rated'},
              {title: 'بیشترین دانلود', value: 'most-downloaded'}, // برای پادکست
              {title: 'طولانی‌ترین', value: 'longest-duration'}, // برای پادکست
              {title: 'تصادفی', value: 'random'},
              {title: 'ترتیب دستی', value: 'manual'},
            ],
          },
          initialValue: 'newest',
          validation: (rule) => rule.required(),
        },
        {
          name: 'randomSeed',
          title: 'بذر تصادفی',
          type: 'string',
          description: 'برای حفظ ترتیب تصادفی در بارگذاری‌های مختلف',
          hidden: ({parent}) => parent?.sortBy !== 'random',
        },
      ],
      options: {
        collapsible: true,
        collapsed: true,
      },
    }),

    // باقی فیلدهای موجود...
    defineField({
      name: 'displaySettings',
      title: 'تنظیمات نمایش',
      type: 'object',
      fields: [
        {
          name: 'showTitle',
          title: 'نمایش عنوان بخش',
          type: 'boolean',
          initialValue: true,
        },
        {
          name: 'showDescription',
          title: 'نمایش توضیحات',
          type: 'boolean',
          initialValue: false,
        },
        {
          name: 'description',
          title: 'توضیحات بخش',
          type: 'text',
          rows: 2,
          hidden: ({parent}) => !parent?.showDescription,
        },
        {
          name: 'showMoreLink',
          title: 'نمایش لینک "مشاهده بیشتر"',
          type: 'boolean',
          initialValue: true,
        },
        {
          name: 'moreLink',
          title: 'لینک "مشاهده بیشتر"',
          type: 'object',
          fields: [
            {
              name: 'text',
              title: 'متن لینک',
              type: 'string',
              initialValue: 'مشاهده همه',
            },
            {
              name: 'url',
              title: 'آدرس لینک',
              type: 'string',
              description: 'مثال: /categories/sports یا /latest-news یا /podcasts',
            },
          ],
          hidden: ({parent}) => !parent?.showMoreLink,
        },
        {
          name: 'backgroundColor',
          title: 'رنگ پس‌زمینه',
          type: 'string',
          options: {
            list: [
              {title: 'شفاف', value: 'transparent'},
              {title: 'خاکستری تیره', value: 'dark-gray'},
              {title: 'مشکی', value: 'black'},
              {title: 'آبی تیره', value: 'dark-blue'},
              {title: 'سفارشی', value: 'custom'},
            ],
          },
          initialValue: 'transparent',
        },
        {
          name: 'customBackgroundColor',
          title: 'رنگ پس‌زمینه سفارشی',
          type: 'string',
          description: 'کد هگز رنگ (مثال: #1a1a1a)',
          hidden: ({parent}) => parent?.backgroundColor !== 'custom',
        },
        {
          name: 'spacing',
          title: 'فاصله‌گذاری',
          type: 'string',
          options: {
            list: [
              {title: 'کم', value: 'small'},
              {title: 'متوسط', value: 'medium'},
              {title: 'زیاد', value: 'large'},
            ],
          },
          initialValue: 'medium',
        },
      ],
      options: {
        collapsible: true,
        collapsed: true,
      },
    }),

    defineField({
      name: 'responsiveSettings',
      title: 'تنظیمات ریسپانسیو',
      type: 'object',
      fields: [
        {
          name: 'mobile',
          title: 'موبایل',
          type: 'object',
          fields: [
            {
              name: 'itemsPerRow',
              title: 'تعداد آیتم در هر ردیف',
              type: 'number',
              initialValue: 1,
              validation: (rule) => rule.min(1).max(3),
            },
            {
              name: 'showScrollbar',
              title: 'نمایش اسکرول‌بار',
              type: 'boolean',
              initialValue: false,
            },
          ],
        },
        {
          name: 'tablet',
          title: 'تبلت',
          type: 'object',
          fields: [
            {
              name: 'itemsPerRow',
              title: 'تعداد آیتم در هر ردیف',
              type: 'number',
              initialValue: 2,
              validation: (rule) => rule.min(1).max(4),
            },
          ],
        },
        {
          name: 'desktop',
          title: 'دسکتاپ',
          type: 'object',
          fields: [
            {
              name: 'itemsPerRow',
              title: 'تعداد آیتم در هر ردیف',
              type: 'number',
              initialValue: 4,
              validation: (rule) => rule.min(1).max(8),
            },
          ],
        },
      ],
      options: {
        collapsible: true,
        collapsed: true,
      },
    }),

    defineField({
      name: 'cacheSettings',
      title: 'تنظیمات کش',
      type: 'object',
      fields: [
        {
          name: 'cacheDuration',
          title: 'مدت زمان کش (دقیقه)',
          type: 'number',
          description: 'مدت زمان نگهداری در کش برای بهبود عملکرد',
          initialValue: 30,
          validation: (rule) => rule.min(5).max(1440), // 5 دقیقه تا 24 ساعت
        },
        {
          name: 'enableRealtime',
          title: 'به‌روزرسانی لحظه‌ای',
          type: 'boolean',
          description: 'آیا محتوا به صورت لحظه‌ای به‌روزرسانی شود؟',
          initialValue: false,
        },
      ],
      options: {
        collapsible: true,
        collapsed: true,
      },
    }),

    defineField({
      name: 'notes',
      title: 'یادداشت‌های داخلی',
      type: 'text',
      description: 'یادداشت‌هایی برای تیم مدیریت محتوا',
      rows: 3,
    }),
  ],

  preview: {
    select: {
      title: 'title',
      contentType: 'contentType',
      displayStyle: 'displayStyle',
      itemsToShow: 'itemsToShow',
      order: 'order',
      isActive: 'isActive',
    },
    prepare({title, contentType, displayStyle, itemsToShow, order, isActive}) {
      const contentTypeLabels: {[key: string]: string} = {
        posts: 'پست‌ها',
        shows: 'برنامه‌ها',
        episodes: 'اپیزودها',
        podcasts: 'پادکست‌ها',
        podcastEpisodes: 'اپیزودهای پادکست',
        mixed: 'ترکیبی',
      };

      const displayStyleLabels: {[key: string]: string} = {
        'horizontal-card': 'کارت افقی',
        'vertical-card': 'کارت عمودی',
        'simple-list': 'لیست ساده',
        'grid': 'شبکه‌ای',
        'slider': 'اسلایدر',
        'hero': 'هرو',
        'audio-player': 'پلیر صوتی',
      };

      let subtitle = `${contentTypeLabels[contentType]} | ${displayStyleLabels[displayStyle]} | ${itemsToShow} آیتم | ترتیب ${order}`;
      
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
      title: 'بر اساس ترتیب نمایش',
      name: 'byOrder',
      by: [
        {field: 'order', direction: 'asc'}
      ]
    },
    {
      title: 'جدیدترین',
      name: 'newest',
      by: [
        {field: '_createdAt', direction: 'desc'}
      ]
    },
    {
      title: 'بر اساس عنوان',
      name: 'alphabetical',
      by: [
        {field: 'title', direction: 'asc'}
      ]
    },
  ],
})