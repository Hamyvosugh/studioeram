// sanity.config.ts
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import { assist } from '@sanity/assist'
import {structure} from './structure' // خط جدید اضافه کن

export default defineConfig({
  name: 'default',
  title: 'eramtv',

  projectId: '1gmrejh5',
  dataset: 'production',

  plugins: [
    structureTool({structure}), // این خط رو تغییر بده
    visionTool(), 
    assist()
  ],

  schema: {
    types: schemaTypes,
  },

  scheduledPublishing: {
    enabled: true,
    inputDateTimeFormat: 'dd/MM/yyyy HH:mm',
  },
})