const express = require('express');
const fs = require('fs');

const app = express();
const DB_FILE = process.argv.length > 2 ? process.argv[2] : '';

/**
 * Counts the students in a CSV data file.
 * @param {String} dataPath The path to the CSV data file.
 * @author Manny Negussie <https://github.com/MannyNe2>
 */
const countStudents = (dataPath) => new Promise((resolve, reject) => {
  if (!dataPath) {
    reject(new Error('Cannot load the database'));
  }
  if (dataPath) {
    fs.readFile(dataPath, (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
      }
      if (data) {
        const reportParts = [];
        const fileLines = data.toString('utf-8').trim().split('\n');
        const studentGroupings = {};
        const dbFieldNames = fileLines[0].split(',');
        const studentPropNames = dbFieldNames.slice(
          0,
          dbFieldNames.length - 1,
        );

        for (const line of fileLines.slice(1)) {
          const studentRecord = line.split(',');
          const studentProps = studentRecord.slice(
            0,
            studentRecord.length - 1,
          );
          const field = studentRecord[studentRecord.length - 1];
          if (!Object.keys(studentGroupings).includes(field)) {
            studentGroupings[field] = [];
          }
          const studentEntries = studentPropNames.map((propName, index) => [
            propName,
            studentProps[index],
          ]);
          studentGroupings[field].push(Object.fromEntries(studentEntries));
        }

        const totalStudents = Object.values(studentGroupings).reduce(
          (pre, cur) => (pre || []).length + cur.length,
        );
        reportParts.push(`Number of students: ${totalStudents}`);
        for (const [field, group] of Object.entries(studentGroupings)) {
          reportParts.push([
            `Number of students in ${field}: ${group.length}.`,
            'List:',
            group.map((student) => student.firstname).join(', '),
          ].join(' '));
        }
        resolve(reportParts.join('\n'));
      }
    });
  }
});

app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

app.get('/students', (req, res) => {
  const responseParts = ['This is the list of our students'];

  countStudents(DB_FILE)
    .then((report) => {
      responseParts.push(report);
      const responseText = responseParts.join('\n');
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.setHeader('Content-Length', responseText.length);
      res.write(Buffer.from(responseText));
    })
    .catch((err) => {
      responseParts.push(err instanceof Error ? err.message : err.toString());
      const responseText = responseParts.join('\n');
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.setHeader('Content-Length', responseText.length);
      res.write(Buffer.from(responseText));
    });
});

app.listen(1245, () => {
  console.log(`Server listening on port 1245`);
});

module.exports = app;
