// sanity.config.ts
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import { assist } from '@sanity/assist'

export default defineConfig({
  name: 'default',
  title: 'eramtv',

  projectId: '1gmrejh5',
  dataset: 'production',

  plugins: [structureTool(), visionTool(), assist()],

  schema: {
    types: schemaTypes,
  },

  // فعال کردن Scheduled Publishing
  scheduledPublishing: {
    enabled: true,
    inputDateTimeFormat: 'dd/MM/yyyy HH:mm', // فرمت تاریخ فارسی
  },
})