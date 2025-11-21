const { Pool } = require('pg');

const commonPasswords = ['', 'postgres', 'admin', 'password', 'root', '123456', 'admin123'];

async function testPasswords() {
  console.log('Testing common PostgreSQL passwords...\n');
  
  for (const password of commonPasswords) {
    const pool = new Pool({
      user: 'postgres',
      host: 'localhost',
      database: 'postgres', // Connect to default database first
      password: password,
      port: 5432,
    });

    try {
      const client = await pool.connect();
      console.log(`✅ SUCCESS! Password is: "${password || '(empty)'}"`);
      console.log('Updating .env.local file...');
      
      // Update the .env.local file
      const fs = require('fs');
      let envContent = fs.readFileSync('.env.local', 'utf8');
      envContent = envContent.replace(/POSTGRES_PASSWORD=.*/, `POSTGRES_PASSWORD=${password}`);
      fs.writeFileSync('.env.local', envContent);
      
      console.log('✅ .env.local updated successfully');
      client.release();
      await pool.end();
      return password;
    } catch (err) {
      console.log(`❌ Failed with password: "${password || '(empty)'}"`);
    }
    
    await pool.end();
  }
  
  console.log('\n❌ None of the common passwords worked.');
  console.log('You may need to reset your PostgreSQL password or check your installation.');
  return null;
}

testPasswords().then(password => {
  if (password !== null) {
    console.log('\nNow run: node test-db-connection.js');
  }
});