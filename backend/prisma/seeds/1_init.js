const { PrismaClient, City } = require('@prisma/client');
const Fs = require('fs');
const CsvReadableStream = require('csv-reader');

const results = [];

async function seed() {
  const prisma = new PrismaClient();
  const countyCache = [];
  const stateCache = [];

  //  0    ,   1       ,   2       ,   3        ,    4        ,    5        , 6   , 7
  // "city","city_ascii","state_id","state_name","county_fips","county_name","lat","lng",
  //   8         ,  9      ,  10    ,  11      ,    12        ,   13     ,   14    , 15   , 16
  // "population","density","source","military","incorporated","timezone","ranking","zips","id"

  // 'White Lake', 'White Lake',
  // 'NY',         'New York',
  // 36065,        'Oneida',
  // 43.5408,      -75.1473,
  // 128,          22.2,
  // 'shape',      'FALSE',
  // 'FALSE',      'America/New_York',
  // 3,            '13338 13494',
  // 1840153009

  for (let i = 1; i < results.length; i++) {
    const row = results[i];
    const countyName = row[5];

    let state = stateCache.find((s) => s.stateName === row[3]);

    if (!state) {
      state = await prisma.state.create({
        data: {
          stateName: row[3]
        }
      });
      stateCache.push(state);
    }

    let county = countyCache.find((c) => c.countyName === countyName);

    if (!county) {
      county = await prisma.county.create({
        data: {
          countyName: row[5],
          countyFips: row[4] + '',
          stateId: state.id
        }
      });

      countyCache.push(county);
    }

    await prisma.city.create({
      data: {
        cityName: row[0],
        cityAscii: row[1],
        countyId: county.id,
        lat: row[6],
        lng: row[7],
        population: row[8],
        density: row[9],
        source: row[10],
        military: row[11] === 'TRUE',
        incorporated: row[12] === 'TRUE',
        timezone: row[13],
        ranking: row[14],
        zips: row[15] + ''
      }
    });
  }
}

// module.exports =
module.exports = async () => {
  return new Promise((resolve, reject) => {
    try {
      let inputStream = Fs.createReadStream('./prisma/seeds/csv/uscities.csv', 'utf8');

      inputStream
        .pipe(new CsvReadableStream({ parseNumbers: true, parseBooleans: true, trim: true }))
        .on('data', function (row) {
          results.push(row);
        })
        .on('end', function () {
          seed()
            .then(() => {
              console.log('Done seeding init data into database');
              resolve();
            })
            .catch((err) => {
              console.error('Failed to seed init data into database', err);
              reject(err);
            });
        });
    } catch (error) {
      console.error('Error reading CSV file:', error);
      reject(error);
    }
  });
};
