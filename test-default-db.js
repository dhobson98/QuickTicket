const { Pool } = require('pg');

async function testDefaultDatabase() {
  console.log('Testing connection to default postgres database...');
  
  const pool = new Pool({
    user: process.env.POSTGRES_USER || 'postgres',
    host: process.env.POSTGRES_HOST || 'localhost',
    database: 'postgres', // Connect to default database
    password: process.env.POSTGRES_PASSWORD || 'Data4!Base8',
    port: parseInt(process.env.POSTGRES_PORT || '5432'),
  });

  try {
    console.log('Connection config:', {
      user: process.env.POSTGRES_USER || 'postgres',
      host: process.env.POSTGRES_HOST || 'localhost',
      database: 'postgres',
      port: parseInt(process.env.POSTGRES_PORT || '5432'),
      password: '***hidden***'
    });
    
    const client = await pool.connect();
    console.log('✅ Connected to PostgreSQL default database!');
    
    // Now try to create the quickticket database
    console.log('Creating quickticket database...');
    await client.query('CREATE DATABASE quickticket');
    console.log('✅ Database quickticket created successfully!');
    
    client.release();
    await pool.end();
    
    // Now test connection to quickticket database
    console.log('\nTesting connection to quickticket database...');
    const quickticketPool = new Pool({
      user: process.env.POSTGRES_USER || 'postgres',
      host: process.env.POSTGRES_HOST || 'localhost',
      database: 'quickticket',
      password: process.env.POSTGRES_PASSWORD || 'Data4!Base8',
      port: parseInt(process.env.POSTGRES_PORT || '5432'),
    });
    
    const quickticketClient = await quickticketPool.connect();
    console.log('✅ Connected to quickticket database!');
    quickticketClient.release();
    await quickticketPool.end();
    
    return true;
    
  } catch (err) {
    if (err.code === '42P04') {
      console.log('ℹ Database quickticket already exists, that\'s okay');
      return true;
    } else {
      console.error('❌ Connection failed:', err.message);
      console.error('Error code:', err.code);
      return false;
    }
  }
}

testDefaultDatabase().then(success => {
  if (success) {
    console.log('\nNow running schema setup...');
    // Don't try to run schema here, just report success
    console.log('Run: node test-db-connection.js to verify quickticket database');
  }
});