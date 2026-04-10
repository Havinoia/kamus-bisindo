const DIRECTUS_URL = 'http://localhost:8055';
const ADMIN_EMAIL = 'admin@bisindo.id';
const ADMIN_PASSWORD = 'password123';

async function fix() {
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

    const request = async (method, path, body) => {
        const response = await fetch(`${DIRECTUS_URL}${path}`, {
            method,
            headers: authHeaders,
            body: body ? JSON.stringify(body) : undefined
        });
        const data = await response.json();
        return { status: response.status, data };
    };

    console.log('--- Checking/Fixing video_file field ---');
    // Ensure the field exists with the correct interface
    const fieldRes = await request('POST', '/fields/words', { 
        field: 'video_file', 
        type: 'uuid', 
        meta: { interface: 'file' } 
    });
    
    if (fieldRes.status === 400) {
        console.log('Field video_file already exists, ensuring interface is correct...');
        await request('PATCH', '/fields/words/video_file', {
            meta: { interface: 'file' }
        });
    }

    console.log('--- Checking/Fixing video_file relation ---');
    const relRes = await request('POST', '/relations', {
      collection: 'words',
      field: 'video_file',
      related_collection: 'directus_files',
      schema: {
          on_delete: 'SET NULL'
      },
      meta: { one_field: null }
    });

    if (relRes.status === 400) {
        console.log('Relation already exists or could not be created. Updating if needed...');
        // Try to patch the relation if it exists
        // Directus relations are identified by collection + field
        await request('PATCH', '/relations/words/video_file', {
            related_collection: 'directus_files',
            meta: { one_field: null }
        });
    }

    console.log('--- Fix Complete! ---');
    console.log('Please refresh your Directus browser tab and try selecting the video again.');

  } catch (error) {
    console.error('Error during fix:', error);
  }
}

fix();
