import fs from 'fs';

const projectId = 'gf9ex5ll';
const token = 'skfjL9PNVfxRC5Eu3tEJ4F3XexaIGbx4KOl1l3clErURYMptJ9M6e86jQbIN1noNcia7sV6Hhl6TEFcauflCpub7WX1MCsUcyZQccFSuybQsStcRewMtgDu99G0zn0FkkJbhHsnvy6dSpyYZXvhRsT5CYnYUOLGz6xnpnTdLseuBcfNV0bWn';

async function addCors(origin) {
  const response = await fetch(`https://api.sanity.io/v1/projects/${projectId}/cors`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      origin: origin,
      allowCredentials: true
    })
  });
  if (!response.ok) {
    const error = await response.text();
    console.error(`Failed to add CORS for ${origin}:`, error);
  } else {
    console.log(`Successfully added CORS for ${origin}`);
  }
}

async function run() {
  await addCors('https://dilishnorthampton.com');
  await addCors('https://www.dilishnorthampton.com');
}

run().catch(console.error);
