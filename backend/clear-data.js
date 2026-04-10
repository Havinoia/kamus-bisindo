const DIRECTUS_URL = 'http://127.0.0.1:8055';
const ADMIN_EMAIL = 'admin@bisindo.id';
const ADMIN_PASSWORD = 'password123';

async function clearData() {
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
        console.error('Failed to login. Please check your credentials and ensure Directus is running.');
        return;
    }

    const authHeaders = { 
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    const del = async (collection) => {
        console.log(`--- Clearing ${collection} ---`);
        // First get all IDs
        const response = await fetch(`${DIRECTUS_URL}/items/${collection}?limit=-1&fields=id`, {
            headers: authHeaders
        });
        const result = await response.json();
        const ids = result.data?.map(item => item.id) || [];

        if (ids.length > 0) {
            await fetch(`${DIRECTUS_URL}/items/${collection}`, {
                method: 'DELETE',
                headers: authHeaders,
                body: JSON.stringify(ids)
            });
            console.log(`Successfully deleted ${ids.length} items from ${collection}.`);
        } else {
            console.log(`No items found in ${collection}.`);
        }
    };

    // Delete in order of dependency (Words first, then Provinces/Categories)
    await del('words');
    await del('provinces');
    await del('categories');

    console.log('--- All items cleared! You can now create items manually in the Directus UI. ---');
  } catch (error) {
    console.error('Error during data clearing:', error);
  }
}

clearData();
