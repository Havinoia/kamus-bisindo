const DIRECTUS_URL = 'http://localhost:8055';
const ADMIN_EMAIL = 'admin@bisindo.id';
const ADMIN_PASSWORD = 'password123';

async function seed() {
  try {
    console.log('--- Logging in ---');
    const loginResponse = await fetch(`${DIRECTUS_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD })
    });
    const loginData = await loginResponse.json();
    const token = loginData.data.access_token;
    const authHeaders = { 
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    const post = (path, body) => fetch(`${DIRECTUS_URL}${path}`, {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify(body)
    }).then(r => r.json());

    // 1. Seed Minimal Category
    console.log('--- Seeding Category: Umum ---');
    const cat = await post('/items/categories', { name: 'Umum', icon: 'category' });

    // 2. Seed Minimal Province
    console.log('--- Seeding Province: Jakarta ---');
    const prov = await post('/items/provinces', { name: 'Jakarta', slug: 'jakarta' });

    // 3. Seed Only "Thank You"
    console.log('--- Seeding Word: "Thank You" ---');
    await post('/items/words', {
      title: 'Thank You',
      slug: 'thank-you',
      description: 'Isyarat terima kasih dalam BISINDO.',
      status: 'published',
      category: cat.data?.id || 1,
      province: prov.data?.id || 1
    });

    console.log('--- Seeding Complete! ---');
  } catch (error) {
    console.error('Error during seeding:', error);
  }
}

seed();
