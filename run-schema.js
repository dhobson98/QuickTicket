const { Pool } = require('pg');
const fs = require('fs');

async function runSchema() {
  const pool = new Pool({
    user: process.env.POSTGRES_USER || 'postgres',
    host: process.env.POSTGRES_HOST || 'localhost',
    database: 'quickticket',
    password: process.env.POSTGRES_PASSWORD || 'Data4!Base8',
    port: parseInt(process.env.POSTGRES_PORT || '5432'),
  });

  try {
    console.log('Reading schema file...');
    const schemaSQL = fs.readFileSync('database/schema.sql', 'utf8');
    
    console.log('Connecting to database...');
    const client = await pool.connect();
    
    console.log('Running schema setup...');
    await client.query(schemaSQL);
    
    console.log('✅ Schema setup completed successfully!');
    
    // Test if everything was created
    const tableCheck = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
    
    console.log('Tables created:', tableCheck.rows.map(row => row.table_name));
    
    // Count sample data
    const countResult = await client.query('SELECT COUNT(*) FROM tickets');
    console.log('Sample tickets inserted:', countResult.rows[0].count);
    
    client.release();
    await pool.end();
    
    console.log('\n✅ Database setup complete!');
    console.log('You can now start the application with: npm run dev');
    
  } catch (err) {
    console.error('❌ Schema setup failed:', err.message);
    if (err.code) {
      console.error('Error code:', err.code);
    }
    await pool.end();
  }
}

runSchema();