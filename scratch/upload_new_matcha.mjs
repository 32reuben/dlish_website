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

const PRODUCTS_TO_UPDATE = [
  { slug: 'strawberry-matcha', filename: 'strawberry matcha.png' },
  { slug: 'banana-matcha', filename: 'banana matcha.png' },
  { slug: 'mango-matcha', filename: 'mango matcha.png' },
  { slug: 'blueberry-matcha', filename: 'blueberry matcha.png' },
];

async function run() {
  for (const product of PRODUCTS_TO_UPDATE) {
    const filePath = path.join(process.cwd(), 'public', 'products', product.filename);
    console.log(`Uploading ${product.filename}...`);
    const imageId = await uploadImage(product.filename, filePath);
    
    console.log(`Patching product-${product.slug}...`);
    await mutate([{
      patch: {
        id: `product-${product.slug}`,
        set: {
          image: {
            _type: 'image',
            asset: { _type: 'reference', _ref: imageId }
          }
        }
      }
    }]);
    console.log(`Successfully updated ${product.slug}!`);
  }
  console.log('Done!');
}

run().catch(console.error);
