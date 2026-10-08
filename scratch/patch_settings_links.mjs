import fs from 'fs';

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

async function run() {
  console.log("Patching site settings with new real URLs...");
  await mutate([{
    patch: {
      id: 'siteSettings',
      set: {
        mapsLink: 'https://share.google/9x7DuXpGsfUgvY5yg',
        justEatUrl: 'https://share.google/KHd7gZL9KPCmDV3EW',
        uberEatsUrl: 'https://www.ubereats.com/store-browse-uuid/e30c0887-e8b9-4c63-a331-8edb6429d24b?diningMode=DELIVERY',
      }
    }
  }]);
  
  console.log("Done patching site settings!");
}

run().catch(console.error);
