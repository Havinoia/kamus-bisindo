const DIRECTUS_URL = 'http://localhost:8055';
const ADMIN_EMAIL = 'admin@bisindo.id';
const ADMIN_PASSWORD = 'password123';

async function fixDisplayTemplates() {
  try {
    console.log('--- Logging in ---');
    const loginResponse = await fetch(`${DIRECTUS_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD })
    });
    const loginData = await loginResponse.json();
    const token = loginData.data?.access_token;
    
    if (!token) {
        console.error('Login failed');
        return;
    }

    const authHeaders = { 
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    const patch = async (collection, template) => {
        console.log(`--- Fixing Display Template for ${collection} ---`);
        const response = await fetch(`${DIRECTUS_URL}/collections/${collection}`, {
            method: 'PATCH',
            headers: authHeaders,
            body: JSON.stringify({
                meta: {
                    display_template: template
                }
            })
        });
        const data = await response.json();
        if (response.status === 200) {
            console.log(`Successfully updated ${collection} to use ${template}`);
        } else {
            console.log(`Failed to update ${collection}:`, data);
        }
    };

    // Set display templates to use the 'name' field
    await patch('provinces', '{{name}}');
    await patch('categories', '{{name}}');

    console.log('--- Fix Complete! ---');
    console.log('Please refresh your Directus browser tab. You should now see "Jakarta" and "Umum" instead of "--".');

  } catch (error) {
    console.error('Error during display template fix:', error);
  }
}

fixDisplayTemplates();
