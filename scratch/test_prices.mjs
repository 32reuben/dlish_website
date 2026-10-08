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
  const data = await query(`*[_type == "product" && (category->slug.current == "milkshakes" || category->slug.current == "milk-shakes" || category->slug.current == "iced-frappe" || category->slug.current == "iced-frappes")]{ name, basePrice, "cat": category->slug.current }`);
  console.log(JSON.stringify(data.result, null, 2));
}

run().catch(console.error);
