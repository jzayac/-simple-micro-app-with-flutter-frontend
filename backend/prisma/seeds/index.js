const init = require('./1_init');

console.log('Seeding data into database');
Promise.all([
  init()
]).then(() => {
  console.log('Done seeding data into database');
  process.exit(0);
}).catch((err) => {
  console.error('Failed to seed data into database', err);
  process.exit(1);
});

