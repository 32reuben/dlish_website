import fs from 'fs';
import path from 'path';

const projectId = 'gf9ex5ll';
const dataset = 'production';
const token = 'skfjL9PNVfxRC5Eu3tEJ4F3XexaIGbx4KOl1l3clErURYMptJ9M6e86jQbIN1noNcia7sV6Hhl6TEFcauflCpub7WX1MCsUcyZQccFSuybQsStcRewMtgDu99G0zn0FkkJbhHsnvy6dSpyYZXvhRsT5CYnYUOLGz6xnpnTdLseuBcfNV0bWn';
const apiVersion = '2024-01-01';

const baseUrl = `https://${projectId}.api.sanity.io/v${apiVersion}`;

async function mutate(mutations) {
  const response = await fetch(`${baseUrl}/data/mutate/${dataset}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ mutations })
  });
  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Sanity API Error: ${error}`);
  }
  return response.json();
}

async function uploadImage(filename, filePath) {
  const buffer = fs.readFileSync(filePath);
  const response = await fetch(`${baseUrl}/assets/images/${dataset}?filename=${encodeURIComponent(filename)}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'image/png',
      'Authorization': `Bearer ${token}`
    },
    body: buffer
  });
  
  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Sanity Image Upload Error: ${error}`);
  }
  
  const data = await response.json();
  return data.document._id;
}

const PRODUCTS = [
  { file: 'banana split.png', name: 'Banana Split Waffle', price: 645 },
  { file: 'berry dream.png', name: 'Berry Dream Waffle', price: 645 },
  { file: 'bueno crunch.png', name: 'Bueno Crunch Waffle', price: 645 },
  { file: 'lotus biscoff crunch.png', name: 'Lotus Biscoff Crunch Waffle', price: 645 },
  { file: 'nutella & nuts.png', name: 'Nutella & Nuts Waffle', price: 645 },
  { file: 'oreo overloaded.png', name: 'Oreo Overloaded Waffle', price: 645 },
  { file: 'pista delight.png', name: 'Pista Delight Waffle', price: 645 },
  { file: 'strawberry bliss.png', name: 'Strawberry Bliss Waffle', price: 645 }
];

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

async function run() {
  console.log('Creating Waffles category...');
  await mutate([{
    createOrReplace: {
      _id: 'cat-waffles',
      _type: 'category',
      name: 'Waffles',
      slug: { _type: 'slug', current: 'waffles' },
      order: 1.5, // Order after Churros
      visible: true
    }
  }]);

  console.log('Creating Waffles products...');
  for (const item of PRODUCTS) {
    const filePath = path.join(process.cwd(), 'public', 'products', item.file);
    if (!fs.existsSync(filePath)) {
      console.log('File not found:', item.file);
      continue;
    }

    const slug = slugify(item.name);
    
    console.log(`Uploading ${item.file}...`);
    const imageId = await uploadImage(item.file, filePath);

    const doc = {
      _id: `product-${slug}`,
      _type: 'product',
      name: item.name,
      slug: { _type: 'slug', current: slug },
      basePrice: item.price,
      category: { _type: 'reference', _ref: 'cat-waffles' },
      image: {
        _type: 'image',
        asset: { _type: 'reference', _ref: imageId }
      },
      available: true
    };
    
    await mutate([{ createOrReplace: doc }]);
    console.log(`Created product: ${item.name}`);
  }
  
  console.log('Done!');
}

run().catch(console.error);
