import { type SchemaTypeDefinition } from 'sanity'

export const schemaTypes: SchemaTypeDefinition[] = [
  {
    name: 'category',
    title: 'Category',
    type: 'document',
    fields: [
      { name: 'name', title: 'Name', type: 'string', validation: (rule) => rule.required() },
      { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' } },
      { name: 'order', title: 'Order', type: 'number' },
      { name: 'icon', title: 'Icon/Image', type: 'image' },
      { name: 'visible', title: 'Visible', type: 'boolean', initialValue: true },
    ],
  },
  {
    name: 'product',
    title: 'Product',
    type: 'document',
    fields: [
      { name: 'name', title: 'Name', type: 'string', validation: (rule) => rule.required() },
      { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' } },
      { name: 'shortDescription', title: 'Short Description', type: 'text' },
      { name: 'image', title: 'Image', type: 'image' },
      { name: 'basePrice', title: 'Base Price (pence)', type: 'number', validation: (rule) => rule.required().integer().min(0) },
      { name: 'category', title: 'Category', type: 'reference', to: [{ type: 'category' }] },
      { name: 'available', title: 'Available', type: 'boolean', initialValue: true },
      { name: 'badges', title: 'Badges', type: 'array', of: [{ type: 'string' }], options: { list: ['TRENDING', 'NEW', 'BESTSELLER', 'LIMITED EDITION'] } },
      { name: 'allergens', title: 'Allergens', type: 'array', of: [{ type: 'string' }], options: { list: ['Celery', 'Cereals containing gluten', 'Crustaceans', 'Eggs', 'Fish', 'Lupin', 'Milk', 'Molluscs', 'Mustard', 'Tree nuts', 'Peanuts', 'Sesame', 'Soya', 'Sulphites'] } },
      { name: 'dietaryTags', title: 'Dietary Tags', type: 'array', of: [{ type: 'string' }], options: { list: ['Vegetarian', 'Vegan', 'Gluten Free', 'Halal'] } },
      { name: 'popular', title: 'Popular', type: 'boolean', initialValue: false },
    ],
  },
  {
    name: 'topping',
    title: 'Topping',
    type: 'document',
    fields: [
      { name: 'name', title: 'Name', type: 'string', validation: (rule) => rule.required() },
      { name: 'extraPrice', title: 'Extra Price (pence)', type: 'number', validation: (rule) => rule.required().integer().min(0) },
      { name: 'allergens', title: 'Allergens', type: 'array', of: [{ type: 'string' }], options: { list: ['Celery', 'Cereals containing gluten', 'Crustaceans', 'Eggs', 'Fish', 'Lupin', 'Milk', 'Molluscs', 'Mustard', 'Tree nuts', 'Peanuts', 'Sesame', 'Soya', 'Sulphites'] } },
      { name: 'available', title: 'Available', type: 'boolean', initialValue: true },
    ],
  },
  {
    name: 'bubbleTeaDrinkType',
    title: 'Bubble Tea Drink Type',
    type: 'document',
    fields: [
      { name: 'name', title: 'Name (e.g. Milk Tea, Fruit Tea)', type: 'string', validation: (rule) => rule.required() },
    ],
  },
  {
    name: 'bubbleTeaFlavour',
    title: 'Bubble Tea Flavour',
    type: 'document',
    fields: [
      { name: 'name', title: 'Name', type: 'string', validation: (rule) => rule.required() },
      { name: 'image', title: 'Image', type: 'image' },
      { name: 'drinkTypes', title: 'Applies to Drink Types', type: 'array', of: [{ type: 'reference', to: [{ type: 'bubbleTeaDrinkType' }] }] },
      { name: 'extraPrice', title: 'Extra Price (pence)', type: 'number', validation: (rule) => rule.required().integer().min(0), initialValue: 0 },
      { name: 'seasonal', title: 'Seasonal', type: 'boolean', initialValue: false },
      { name: 'trending', title: 'Trending', type: 'boolean', initialValue: false },
      { name: 'available', title: 'Available', type: 'boolean', initialValue: true },
    ],
  },
  {
    name: 'bubbleTeaSettings',
    title: 'Bubble Tea Settings',
    type: 'document',
    fields: [
      { name: 'title', title: 'Title', type: 'string', initialValue: 'Bubble Tea Settings', readOnly: true },
      { name: 'multipleToppingsAllowed', title: 'Multiple Toppings Allowed', type: 'boolean', initialValue: true },
      { name: 'maxToppings', title: 'Max Toppings', type: 'number', initialValue: 3 },
      { name: 'regularSizeExtra', title: 'Regular Size Extra Price (pence)', type: 'number', initialValue: 0 },
      { name: 'largeSizeExtra', title: 'Large Size Extra Price (pence)', type: 'number', initialValue: 50 },
    ],
  },
  {
    name: 'trendingSection',
    title: 'Trending Section',
    type: 'document',
    fields: [
      { name: 'title', title: 'Title', type: 'string', initialValue: 'Trending Section Configuration', readOnly: true },
      { name: 'items', title: 'Trending Products', type: 'array', of: [{ type: 'reference', to: [{ type: 'product' }] }] },
    ],
  },
  {
    name: 'siteSettings',
    title: 'Site Settings',
    type: 'document',
    fields: [
      { name: 'title', title: 'Settings Document Title', type: 'string', initialValue: 'Global Site Settings', readOnly: true },
      { name: 'address', title: 'Address', type: 'text' },
      { name: 'openingHours', title: 'Opening Hours', type: 'text' },
      { name: 'phone', title: 'Phone', type: 'string' },
      { name: 'email', title: 'Email', type: 'string' },
      { name: 'whatsappNumber', title: 'WhatsApp Number', type: 'string', description: 'Include country code, e.g. +447...' },
      { name: 'orderLinkType', title: 'Order Link Type', type: 'string', options: { list: ['WhatsApp', 'Phone', 'URL'] } },
      { name: 'orderLinkTarget', title: 'Order Link Target', type: 'string', description: 'URL or Phone number depending on type' },
      { name: 'collectionInfo', title: 'Collection Info', type: 'text' },
      { name: 'deliveryInfo', title: 'Delivery Info', type: 'text' },
      { name: 'socialLinks', title: 'Social Links', type: 'array', of: [{ type: 'object', fields: [{name: 'platform', type: 'string'}, {name: 'url', type: 'url'}] }] },
      { name: 'mapEmbedUrl', title: 'Map Embed URL', type: 'url' },
    ],
  },
  {
    name: 'cateringPage',
    title: 'Catering Page',
    type: 'document',
    fields: [
      { name: 'title', title: 'Title', type: 'string', initialValue: 'Catering Page Content', readOnly: true },
      { name: 'introText', title: 'Intro Text', type: 'text' },
      { name: 'foodCategories', title: 'Food Categories', type: 'array', of: [{ type: 'string' }] },
      { name: 'eventTypes', title: 'Event Types', type: 'array', of: [{ type: 'string' }] },
    ],
  }
]
