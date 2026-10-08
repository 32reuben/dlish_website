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
  'mango passion.png',
  'strawberry spark.png',
  'sunset fusion.png',
  'watermelon breeze.png'
];

function formatName(filename) {
  let name = filename.replace('.png', '');
  return name.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

async function run() {
  console.log('Updating Fizzy Bubble Tea products with new images...');
  
  for (const filename of PRODUCTS) {
    const filePath = path.join(process.cwd(), 'public', 'products', filename);
    if (!fs.existsSync(filePath)) {
      console.log('File not found:', filename);
      continue;
    }

    const name = formatName(filename);
    const slug = slugify(name);
    
    console.log(`Uploading newly processed ${filename}...`);
    const imageId = await uploadImage(filename, filePath);

    await mutate([{
      patch: {
        id: `product-${slug}`,
        set: {
          image: {
            _type: 'image',
            asset: { _type: 'reference', _ref: imageId }
          }
        }
      }
    }]);
    
    console.log(`Updated product: ${name}`);
  }
  
  console.log('Done!');
}

run().catch(console.error);
