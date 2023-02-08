const fs = require('fs');
const csv = require('csv-parser');

let htmlString = "";
let counter = 1;

fs.readFile('game\\FORMAT.html', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }

  fs.createReadStream('file.csv')
    .pipe(csv())
    .on('data', (row) => {

      if (row.class.includes("extra-")) {
        htmlString += `<tr class='${row.class}'>\n`
        htmlString += `   <td class='character-name'>${row.character_name}</td>\n`
        htmlString += `   <td class='rank'></td>\n`
        htmlString += `   <td class='DPS'>\n      <a href='${row.link}' target='_blank'>${row.dps} DPS</a>\n   </td>\n`
        htmlString += "</tr>"
        } 
      else {
        htmlString += `<tr class='${row.class}'>\n`
        htmlString += `   <td class='character-name'>${row.character_name}</td>\n`
        htmlString += `   <td class='rank'>#${counter}</td>\n`
        htmlString += `   <td class='DPS'>\n      <a href='${row.link}' target='_blank'>${row.dps} DPS</a>\n   </td>\n`
        htmlString += "</tr>"
        counter += 1;
      }
    })
    .on('end', () => {
        let updatedData = data.replace("<tbody>", "<tbody>\n" + htmlString);
        fs.writeFileSync('game\\index.html', updatedData);
        console.log('HTML file generated.');
    });
});
