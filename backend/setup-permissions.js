const DIRECTUS_URL = 'http://localhost:8055';
const ADMIN_EMAIL = 'admin@bisindo.id';
const ADMIN_PASSWORD = 'password123';

async function setup() {
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
    }).then(r => r.json().then(d => ({ status: r.status, data: d })));

    console.log('--- Setting up Public Permissions ---');
    
    // We target the 'null' role which corresponds to Public in Directus
    const publicRole = null; 

    // Provinces: Read All
    console.log('1. Setting Provinces permissions...');
    await post('/permissions', {
        role: publicRole,
        collection: 'provinces',
        action: 'read',
        permissions: {},
        fields: ['*']
    });

    // Categories: Read All
    console.log('2. Setting Categories permissions...');
    await post('/permissions', {
        role: publicRole,
        collection: 'categories',
        action: 'read',
        permissions: {},
        fields: ['*']
    });

    // Words: Read Only Published
    console.log('3. Setting Words permissions (Published only)...');
    await post('/permissions', {
        role: publicRole,
        collection: 'words',
        action: 'read',
        permissions: {
            status: { _eq: 'published' }
        },
        fields: ['*']
    });

    // Files: Read All (needed for thumbnails/videos)
    console.log('4. Setting Files permissions...');
    await post('/permissions', {
        role: publicRole,
        collection: 'directus_files',
        action: 'read',
        permissions: {},
        fields: ['*']
    });

    console.log('--- Permission Setup Complete! ---');
  } catch (error) {
    console.error('Error during setup:', error);
  }
}

setup();
