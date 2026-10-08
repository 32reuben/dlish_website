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
  const res = await query(`*[_type == "siteSettings"][0]`);
  let settingsId = res.result?._id;
  
  if (!settingsId) {
    console.log("No site settings found. Creating one...");
    settingsId = 'siteSettings';
    await mutate([{
      createOrReplace: {
        _id: settingsId,
        _type: 'siteSettings',
        justEatUrl: 'https://www.just-eat.co.uk/',
        uberEatsUrl: 'https://www.ubereats.com/gb',
        address: '17 Saint Peters Walk,\nNorthampton, NN1 1PT',
        mapsLink: 'https://maps.app.goo.gl/QFv9h1fsUjyiEuVM8',
        mapEmbedUrl: 'https://maps.google.com/maps?q=17%20Saint%20Peters%20Walk,%20Northampton&t=&z=15&ie=UTF8&iwloc=&output=embed',
        phone: '01604 123456',
        email: 'hello@dlishnorthampton.com',
        openingHours: 'Mon - Sun: 11:00 AM - 11:00 PM',
        collectionInfo: 'Order online and collect in-store within 15-20 minutes.',
        deliveryInfo: 'Available via Just Eat and Uber Eats within a 3-mile radius.',
        showCallInChooser: true
      }
    }]);
  } else {
    console.log("Found site settings. Patching...");
    await mutate([{
      patch: {
        id: settingsId,
        set: {
          justEatUrl: 'https://www.just-eat.co.uk/',
          uberEatsUrl: 'https://www.ubereats.com/gb',
          address: '17 Saint Peters Walk,\nNorthampton, NN1 1PT',
          mapsLink: 'https://maps.app.goo.gl/QFv9h1fsUjyiEuVM8',
          mapEmbedUrl: 'https://maps.google.com/maps?q=17%20Saint%20Peters%20Walk,%20Northampton&t=&z=15&ie=UTF8&iwloc=&output=embed',
        }
      }
    }]);
  }
  
  console.log("Done patching site settings!");
}

run().catch(console.error);
