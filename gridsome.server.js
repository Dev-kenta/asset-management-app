// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const {readFileSync} = require('fs');
const parse = require('csv-parse/lib/sync');
module.exports = function (api) {
  api.loadSource(async (actions) => {
    // CSVから資産データを取得
    const input = readFileSync('./src/data/assetbalance_202008.csv', 'utf8');
    const Assets = parse(input, {
      from_line: 2,
      skip_empty_lines: true,
    });
    const collection = actions.addCollection({
      typeName: 'Assets',
    });
    for (const asset of Assets) {
      collection.addNode(asset);
    }

    // jsonから資産推移データを取得
    const Transitions = require('./src/data/assettransition.json');
    const collection2 = actions.addCollection({
      typeName: 'Transitions',
    });
    for (const transition of Transitions) {
      collection2.addNode(transition);
    }
  })

  api.createPages(({ createPage }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api/
  })
}
