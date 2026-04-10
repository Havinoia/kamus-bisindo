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

    // 1. Create Provinces
    console.log('--- Creating Provinces Collection ---');
    await post('/collections', { collection: 'provinces', schema: {}, meta: { icon: 'map' } });
    await post('/fields/provinces', { field: 'name', type: 'string', meta: { interface: 'input' } });
    await post('/fields/provinces', { field: 'slug', type: 'string', meta: { interface: 'input' } });

    // 2. Create Categories
    console.log('--- Creating Categories Collection ---');
    await post('/collections', { collection: 'categories', schema: {}, meta: { icon: 'category' } });
    await post('/fields/categories', { field: 'name', type: 'string', meta: { interface: 'input' } });
    await post('/fields/categories', { field: 'icon', type: 'string', meta: { interface: 'input' } });

    // 3. Create Words
    console.log('--- Creating Words Collection ---');
    await post('/collections', { collection: 'words', schema: {}, meta: { icon: 'menu_book' } });
    await post('/fields/words', { field: 'title', type: 'string', meta: { interface: 'input' } });
    await post('/fields/words', { field: 'slug', type: 'string', meta: { interface: 'input' } });
    await post('/fields/words', { field: 'description', type: 'text', meta: { interface: 'textarea' } });
    await post('/fields/words', { 
        field: 'status', 
        type: 'string', 
        schema: { default_value: 'draft' },
        meta: { interface: 'select-dropdown', options: { choices: [{text: 'Draft', value: 'draft'}, {text: 'Review', value: 'review'}, {text: 'Published', value: 'published'}] } } 
    });
    
    // File Field for Video
    await post('/fields/words', { field: 'video_file', type: 'uuid', meta: { interface: 'file' } });

    // 4. Relations
    console.log('--- Setting up Relations ---');
    // Province
    await post('/fields/words', { field: 'province', type: 'integer', meta: { interface: 'select-dropdown-m2o' } });
    await post('/relations', {
      collection: 'words',
      field: 'province',
      related_collection: 'provinces',
      meta: { one_field: null }
    });

    // Category
    await post('/fields/words', { field: 'category', type: 'integer', meta: { interface: 'select-dropdown-m2o' } });
    await post('/relations', {
      collection: 'words',
      field: 'category',
      related_collection: 'categories',
      meta: { one_field: null }
    });

    // Video File relation
    console.log('--- Setting up Video Relation ---');
    await post('/relations', {
      collection: 'words',
      field: 'video_file',
      related_collection: 'directus_files',
      meta: { one_field: null }
    });

    console.log('--- Schema Setup Complete! ---');
  } catch (error) {
    console.error('Error during setup:', error);
  }
}

setup();
