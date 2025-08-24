// structure.ts
import {StructureResolver} from 'sanity/structure'
import {Calendar, FolderOpen, FileText, Clock, Archive, Headphones, Mic, Radio} from 'lucide-react'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('محتوا')
    .items([
      // بخش پست‌های آرشیو شده بر اساس زمان
      S.listItem()
        .title('📰 پست‌ها (آرشیو زمانی)')
        .icon(Archive)
        .child(
          S.list()
            .title('پست‌ها بر اساس سال')
            .items([
              // سال 2025
              S.listItem()
                .title('📅 2025')
                .icon(Calendar)
                .child(
                  S.list()
                    .title('ماه‌های 2025')
                    .items([
                      // ژانویه 2025
                      createMonthItem(S, 2025, 1, 'ژانویه'),
                      createMonthItem(S, 2025, 2, 'فوریه'),
                      createMonthItem(S, 2025, 3, 'مارس'),
                      createMonthItem(S, 2025, 4, 'آپریل'),
                      createMonthItem(S, 2025, 5, 'می'),
                      createMonthItem(S, 2025, 6, 'ژوئن'),
                      createMonthItem(S, 2025, 7, 'ژوئیه'),
                      createMonthItem(S, 2025, 8, 'آگوست'),
                      createMonthItem(S, 2025, 9, 'سپتامبر'),
                      createMonthItem(S, 2025, 10, 'اکتبر'),
                      createMonthItem(S, 2025, 11, 'نوامبر'),
                      createMonthItem(S, 2025, 12, 'دسامبر'),
                    ])
                ),

              // سال 2024
              S.listItem()
                .title('📅 2024')
                .icon(Calendar)
                .child(
                  S.list()
                    .title('ماه‌های 2024')
                    .items([
                      createMonthItem(S, 2024, 1, 'ژانویه'),
                      createMonthItem(S, 2024, 2, 'فوریه'),
                      createMonthItem(S, 2024, 3, 'مارس'),
                      createMonthItem(S, 2024, 4, 'آپریل'),
                      createMonthItem(S, 2024, 5, 'می'),
                      createMonthItem(S, 2024, 6, 'ژوئن'),
                      createMonthItem(S, 2024, 7, 'ژوئیه'),
                      createMonthItem(S, 2024, 8, 'آگوست'),
                      createMonthItem(S, 2024, 9, 'سپتامبر'),
                      createMonthItem(S, 2024, 10, 'اکتبر'),
                      createMonthItem(S, 2024, 11, 'نوامبر'),
                      createMonthItem(S, 2024, 12, 'دسامبر'),
                    ])
                ),

              // سال 2023
              S.listItem()
                .title('📅 2023')
                .icon(Calendar)
                .child(
                  S.list()
                    .title('ماه‌های 2023')
                    .items([
                      createMonthItem(S, 2023, 1, 'ژانویه'),
                      createMonthItem(S, 2023, 2, 'فوریه'),
                      createMonthItem(S, 2023, 3, 'مارس'),
                      createMonthItem(S, 2023, 4, 'آپریل'),
                      createMonthItem(S, 2023, 5, 'می'),
                      createMonthItem(S, 2023, 6, 'ژوئن'),
                      createMonthItem(S, 2023, 7, 'ژوئیه'),
                      createMonthItem(S, 2023, 8, 'آگوست'),
                      createMonthItem(S, 2023, 9, 'سپتامبر'),
                      createMonthItem(S, 2023, 10, 'اکتبر'),
                      createMonthItem(S, 2023, 11, 'نوامبر'),
                      createMonthItem(S, 2023, 12, 'دسامبر'),
                    ])
                ),
            ])
        ),

      // تقسیم‌کننده
      S.divider(),

      // دسته‌بندی‌ها و تگ‌ها
      S.documentTypeListItem('category').title('🏷️ دسته‌بندی‌ها'),
      S.documentTypeListItem('tag').title('🔖 برچسب‌ها'),
      S.documentTypeListItem('region').title('🌍 مناطق'),
      S.documentTypeListItem('topic').title('📋 موضوعات'),
      
      S.divider(),
      
      // برنامه‌های تلویزیونی
      S.documentTypeListItem('showCategory').title('📺 دسته‌بندی برنامه‌ها'),
      S.documentTypeListItem('show').title('🎬 برنامه‌ها'),
      S.documentTypeListItem('season').title('📹 فصل‌ها'),
      S.documentTypeListItem('episode').title('🎞️ اپیزودها'),
      
      S.divider(),
      
      // بخش پادکست‌ها - جدید اضافه شده
      S.listItem()
        .title('🎧 پادکست‌ها')
        .icon(Headphones)
        .child(
          S.list()
            .title('مدیریت پادکست‌ها')
            .items([
              // لیست برنامه‌های پادکست
              S.listItem()
                .title('🎙️ برنامه‌های پادکست')
                .icon(Mic)
                .child(
                  S.documentList()
                    .title('برنامه‌های پادکست')
                    .filter('_type == "podcast"')
                    .defaultOrdering([
                      {field: '_createdAt', direction: 'desc'}
                    ])
                ),
              
              // لیست اپیزودهای پادکست
              S.listItem()
                .title('📻 اپیزودهای پادکست')
                .icon(Radio)
                .child(
                  S.documentList()
                    .title('اپیزودهای پادکست')
                    .filter('_type == "podcastEpisode"')
                    .defaultOrdering([
                      {field: 'publishedAt', direction: 'desc'}
                    ])
                ),
              
              // پادکست‌ها بر اساس وضعیت
              S.listItem()
                .title('📊 پادکست‌ها بر اساس وضعیت')
                .icon(FileText)
                .child(
                  S.list()
                    .title('دسته‌بندی بر اساس وضعیت')
                    .items([
                      // پادکست‌های فعال
                      S.listItem()
                        .title('🟢 برنامه‌های فعال')
                        .child(
                          S.documentList()
                            .title('برنامه‌های پادکست فعال')
                            .filter('_type == "podcast" && status == "active"')
                            .defaultOrdering([
                              {field: '_createdAt', direction: 'desc'}
                            ])
                        ),
                      
                      // پادکست‌های تمام شده
                      S.listItem()
                        .title('🔴 برنامه‌های تمام شده')
                        .child(
                          S.documentList()
                            .title('برنامه‌های پادکست تمام شده')
                            .filter('_type == "podcast" && status == "completed"')
                            .defaultOrdering([
                              {field: '_createdAt', direction: 'desc'}
                            ])
                        ),
                      
                      // پادکست‌های متوقف شده
                      S.listItem()
                        .title('⏸️ برنامه‌های متوقف شده')
                        .child(
                          S.documentList()
                            .title('برنامه‌های پادکست متوقف شده')
                            .filter('_type == "podcast" && status == "paused"')
                            .defaultOrdering([
                              {field: '_createdAt', direction: 'desc'}
                            ])
                        ),
                      
                      // اپیزودهای منتشر شده
                      S.listItem()
                        .title('✅ اپیزودهای منتشر شده')
                        .child(
                          S.documentList()
                            .title('اپیزودهای منتشر شده')
                            .filter('_type == "podcastEpisode" && status == "published"')
                            .defaultOrdering([
                              {field: 'publishedAt', direction: 'desc'}
                            ])
                        ),
                      
                      // اپیزودهای پیش‌نویس
                      S.listItem()
                        .title('📝 اپیزودهای پیش‌نویس')
                        .child(
                          S.documentList()
                            .title('اپیزودهای پیش‌نویس')
                            .filter('_type == "podcastEpisode" && status == "draft"')
                            .defaultOrdering([
                              {field: '_createdAt', direction: 'desc'}
                            ])
                        ),
                    ])
                ),
              
              // پادکست‌های ویژه و هرو
              S.listItem()
                .title('⭐ پادکست‌های ویژه')
                .child(
                  S.list()
                    .title('محتوای ویژه و هرو')
                    .items([
                      // برنامه‌های ویژه
                      S.listItem()
                        .title('🌟 برنامه‌های ویژه')
                        .child(
                          S.documentList()
                            .title('برنامه‌های پادکست ویژه')
                            .filter('_type == "podcast" && featured == true')
                            .defaultOrdering([
                              {field: '_createdAt', direction: 'desc'}
                            ])
                        ),
                      
                      // برنامه‌های هرو
                      S.listItem()
                        .title('🎯 برنامه‌های هرو')
                        .child(
                          S.documentList()
                            .title('برنامه‌های پادکست در هرو')
                            .filter('_type == "podcast" && heroShow == true')
                            .defaultOrdering([
                              {field: '_createdAt', direction: 'desc'}
                            ])
                        ),
                      
                      // اپیزودهای ویژه
                      S.listItem()
                        .title('🌟 اپیزودهای ویژه')
                        .child(
                          S.documentList()
                            .title('اپیزودهای پادکست ویژه')
                            .filter('_type == "podcastEpisode" && featured == true')
                            .defaultOrdering([
                              {field: 'publishedAt', direction: 'desc'}
                            ])
                        ),
                      
                      // اپیزودهای هرو
                      S.listItem()
                        .title('🎯 اپیزودهای هرو')
                        .child(
                          S.documentList()
                            .title('اپیزودهای پادکست در هرو')
                            .filter('_type == "podcastEpisode" && heroShow == true')
                            .defaultOrdering([
                              {field: 'publishedAt', direction: 'desc'}
                            ])
                        ),
                    ])
                ),
              
              // آمارها و گزارش‌ها
              S.listItem()
                .title('📈 آمارها و گزارش‌ها')
                .child(
                  S.list()
                    .title('آمارهای پادکست')
                    .items([
                      // محبوب‌ترین اپیزودها (بر اساس پخش)
                      S.listItem()
                        .title('🔥 محبوب‌ترین اپیزودها (پخش)')
                        .child(
                          S.documentList()
                            .title('بر اساس تعداد پخش')
                            .filter('_type == "podcastEpisode"')
                            .defaultOrdering([
                              {field: 'playCount', direction: 'desc'}
                            ])
                        ),
                      
                      // پردانلودترین اپیزودها
                      S.listItem()
                        .title('⬇️ پردانلودترین اپیزودها')
                        .child(
                          S.documentList()
                            .title('بر اساس تعداد دانلود')
                            .filter('_type == "podcastEpisode"')
                            .defaultOrdering([
                              {field: 'downloadCount', direction: 'desc'}
                            ])
                        ),
                      
                      // بالاترین امتیازها
                      S.listItem()
                        .title('⭐ بالاترین امتیازها')
                        .child(
                          S.documentList()
                            .title('بر اساس امتیاز کاربران')
                            .filter('_type == "podcastEpisode" && defined(rating)')
                            .defaultOrdering([
                              {field: 'rating', direction: 'desc'}
                            ])
                        ),
                    ])
                ),
            ])
        ),
      
      S.divider(),
      
      // تنظیمات
      S.documentTypeListItem('homepageSection').title('⚙️ بخش‌های صفحه اصلی'),
      S.documentTypeListItem('advertisement').title('📢 تبلیغات'),
      S.documentTypeListItem('timeFolder').title('📁 فولدرهای زمانی'),
    ])

/**
 * ایجاد آیتم ماه
 */
function createMonthItem(S: any, year: number, month: number, monthName: string) {
  return S.listItem()
    .title(`📅 ${monthName} ${year}`)
    .icon(FolderOpen)
    .child(
      S.list()
        .title(`هفته‌های ${monthName} ${year}`)
        .items(createWeekItems(S, year, month, monthName))
    )
}

/**
 * ایجاد آیتم‌های هفته برای یک ماه
 */
function createWeekItems(S: any, year: number, month: number, monthName: string) {
  const weeks = getWeeksInMonth(year, month)
  
  return weeks.map((week, index) => 
    S.listItem()
      .title(`🗓️ هفته ${index + 1} (${week.startDay}-${week.endDay} ${monthName})`)
      .icon(Clock)
      .child(
        S.list()
          .title(`روزهای هفته ${index + 1}`)
          .items(createDayItems(S, year, month, week.startDay, week.endDay))
      )
  )
}

/**
 * ایجاد آیتم‌های روز برای یک هفته
 */
function createDayItems(S: any, year: number, month: number, startDay: number, endDay: number) {
  const days = []
  
  for (let day = startDay; day <= endDay; day++) {
    const date = new Date(year, month - 1, day)
    const dayName = getDayName(date.getDay())
    
    days.push(
      S.listItem()
        .title(`📄 ${day} ${getMonthName(month)} (${dayName})`)
        .icon(FileText)
        .child(
          S.documentList()
            .title(`پست‌های ${day} ${getMonthName(month)} ${year}`)
            .filter('_type == "post"')
            .params({
              startDate: formatDateForQuery(year, month, day, 0, 0, 0),
              endDate: formatDateForQuery(year, month, day, 23, 59, 59)
            })
            .filter('_type == "post" && publishedAt >= $startDate && publishedAt <= $endDate')
            .defaultOrdering([
              {field: 'publishedAt', direction: 'desc'},
              {field: '_createdAt', direction: 'desc'}
            ])
        )
    )
  }
  
  return days
}

/**
 * محاسبه هفته‌های یک ماه
 */
function getWeeksInMonth(year: number, month: number): Array<{startDay: number, endDay: number}> {
  const daysInMonth = new Date(year, month, 0).getDate()
  const weeks = []
  
  let currentDay = 1
  
  while (currentDay <= daysInMonth) {
    const weekStart = currentDay
    const weekEnd = Math.min(currentDay + 6, daysInMonth)
    
    weeks.push({
      startDay: weekStart,
      endDay: weekEnd
    })
    
    currentDay = weekEnd + 1
  }
  
  return weeks
}

/**
 * تبدیل تاریخ به فرمت query
 */
function formatDateForQuery(year: number, month: number, day: number, hour: number, minute: number, second: number): string {
  const date = new Date(year, month - 1, day, hour, minute, second)
  return date.toISOString()
}

/**
 * گرفتن نام روز
 */
function getDayName(dayIndex: number): string {
  const days = ['یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه', 'شنبه']
  return days[dayIndex]
}

/**
 * گرفتن نام ماه
 */
function getMonthName(month: number): string {
  const months = [
    '', 'ژانویه', 'فوریه', 'مارس', 'آپریل', 'می', 'ژوئن',
    'ژوئیه', 'آگوست', 'سپتامبر', 'اکتبر', 'نوامبر', 'دسامبر'
  ]
  return months[month]
}