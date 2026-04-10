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

    console.log('--- Setting up Public Permissions (Directus v11) ---');
    
    // In Directus v11, we assign permissions to the Public Policy
    const publicPolicyId = 'abf8a154-5b1c-4a46-ac9c-7300570f4f17'; 

    const setPermission = async (collection, action, config = {}) => {
        console.log(`Setting ${action} permission for ${collection}...`);
        const res = await post('/permissions', {
            policy: publicPolicyId,
            collection,
            action,
            fields: ['*'],
            ...config
        });
        if (res.status >= 400) {
            console.error(`Failed to set permission for ${collection}:`, res.data);
        } else {
            console.log(`Successfully set permission for ${collection}`);
        }
    };

    // Provinces: Read All
    await setPermission('provinces', 'read');

    // Categories: Read All
    await setPermission('categories', 'read');

    // Words: Read Only Published
    await setPermission('words', 'read', {
        permissions: { status: { _eq: 'published' } }
    });

    // Files: Read All (needed for thumbnails/videos)
    await setPermission('directus_files', 'read');

    console.log('--- Permission Setup Complete! ---');
  } catch (error) {
    console.error('Error during setup:', error);
  }
}

setup();
