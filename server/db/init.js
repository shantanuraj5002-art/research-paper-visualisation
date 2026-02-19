import db from './database.js';

console.log('Initializing database...');
await db.initDatabase();
console.log('Database initialized successfully!');
