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

async function run() {
  const q = `*[_type == "siteSettings"][0]{ address, justEatUrl, uberEatsUrl, mapsLink }`;
  const data = await query(q);
  console.log(JSON.stringify(data, null, 2));
}

run().catch(console.error);
