const { Pool } = require('pg');
require('dotenv').config({ path: '.env.local' });

const pool = new Pool({
  user: process.env.POSTGRES_USER || 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  database: process.env.POSTGRES_DB || 'quickticket',
  password: process.env.POSTGRES_PASSWORD || 'password',
  port: parseInt(process.env.POSTGRES_PORT || '5432'),
});

async function testConnection() {
  try {
    console.log('Testing database connection...');
    console.log('Connection config:', {
      user: process.env.POSTGRES_USER || 'postgres',
      host: process.env.POSTGRES_HOST || 'localhost',
      database: process.env.POSTGRES_DB || 'quickticket',
      port: parseInt(process.env.POSTGRES_PORT || '5432'),
    });
    
    const client = await pool.connect();
    console.log('✅ Connected to PostgreSQL successfully!');
    
    // Test if database exists
    const result = await client.query('SELECT current_database()');
    console.log('Current database:', result.rows[0].current_database);
    
    // Test if tickets table exists
    const tableCheck = await client.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'tickets'
      );
    `);
    
    if (tableCheck.rows[0].exists) {
      console.log('✅ Tickets table exists');
      
      // Count tickets
      const countResult = await client.query('SELECT COUNT(*) FROM tickets');
      console.log('Number of tickets:', countResult.rows[0].count);
    } else {
      console.log('❌ Tickets table does not exist - need to run schema.sql');
    }
    
    client.release();
  } catch (err) {
    console.error('❌ Database connection failed:', err.message);
    console.error('Error details:', {
      code: err.code,
      detail: err.detail,
      hint: err.hint,
    });
  } finally {
    await pool.end();
  }
}

testConnection();