import fs from 'fs';

const projectId = 'gf9ex5ll';
const dataset = 'production';
const token = 'skfjL9PNVfxRC5Eu3tEJ4F3XexaIGbx4KOl1l3clErURYMptJ9M6e86jQbIN1noNcia7sV6Hhl6TEFcauflCpub7WX1MCsUcyZQccFSuybQsStcRewMtgDu99G0zn0FkkJbhHsnvy6dSpyYZXvhRsT5CYnYUOLGz6xnpnTdLseuBcfNV0bWn';
const apiVersion = '2024-01-01';

const baseUrl = `https://${projectId}.api.sanity.io/v${apiVersion}`;

async function query(q) {
  const url = `${baseUrl}/data/query/${dataset}?query=${encodeURIComponent(q)}`;
  const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
  return res.json();
}

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

async function run() {
  const data = await query(`*[_type == "product"]{ _id, name, basePrice, "cat": category->slug.current }`);
  const products = data.result;
  
  const mutations = [];
  
  for (const p of products) {
    let newPrice = p.basePrice;
    
    if (p.cat === 'boba-milk-tea' || p.cat === 'bubble-tea') newPrice = 545;
    else if (p.cat === 'fruit-tea') newPrice = 495;
    else if (p.cat === 'fizzy-bubble-tea') newPrice = 749;
    else if (p.cat === 'milk-shakes') newPrice = 549;
    else if (p.cat === 'matcha') newPrice = 649;
    else if (p.cat === 'iced-frappe') {
      if (p.name.toLowerCase().includes('salted caramel') || p.name.toLowerCase().includes('biscoff')) {
        newPrice = 499;
      } else {
        newPrice = 375;
      }
    }
    else if (p.cat === 'indian-bites' || p.cat === 'street-food') {
      if (p.name.toLowerCase().includes('samosa') && p.name.includes('1')) newPrice = 150;
      else if (p.name.toLowerCase().includes('samosa') && p.name.includes('2')) newPrice = 275;
      else if (p.name.toLowerCase().includes('spring')) newPrice = 299;
      else if (p.name.toLowerCase().includes('pani puri') && p.name.includes('5')) newPrice = 499;
      else if (p.name.toLowerCase().includes('pani puri') && p.name.includes('8')) newPrice = 649;
    }
    else if (p.cat === 'lassi') {
      if (p.name.toLowerCase().includes('plain')) newPrice = 399;
      else if (p.name.toLowerCase().includes('mango')) newPrice = 449;
    }
    else if (p.cat === 'hot-drinks') {
      newPrice = 249;
    }
    
    if (newPrice !== p.basePrice) {
      console.log(`Updating ${p.name} from ${p.basePrice} to ${newPrice}`);
      mutations.push({
        patch: {
          id: p._id,
          set: { basePrice: newPrice }
        }
      });
    }
  }
  
  if (mutations.length > 0) {
    // Send mutations in batches of 100
    for (let i = 0; i < mutations.length; i += 100) {
      await mutate(mutations.slice(i, i + 100));
    }
    console.log(`Updated ${mutations.length} products.`);
  } else {
    console.log("All products already have the correct price!");
  }
}

run().catch(console.error);
