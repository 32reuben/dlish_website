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
  const data = await query(`*[_type == "product" && (category->slug.current == "milkshakes" || category->slug.current == "iced-frappes")]{ _id, name, basePrice, "cat": category->slug.current }`);
  const products = data.result;
  
  const mutations = [];
  
  for (const p of products) {
    let newPrice = p.basePrice;
    
    if (p.cat === 'milkshakes') {
      newPrice = 549;
    } else if (p.cat === 'iced-frappes') {
      if (p.name.toLowerCase().includes('chocolate') || p.name.toLowerCase().includes('vanilla')) {
        newPrice = 375;
      }
      // Leave Salted Caramel and Biscoff alone (they stay at 499)
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
