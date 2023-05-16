import fs from 'fs';

/**
 * Reads the data of students in a CSV data file.
 * @param {String} dataFilePath The path to the CSV data file.
 * @author Manny Negussie <https://github.com/MannyNe2>
 * @returns {Promise<{
 *   String: {firstname: String, lastname: String, age: number}[]
 * }>}
 */
const readDatabase = (dataFilePath) => new Promise((resolve, reject) => {
  if (!dataFilePath) {
    reject(new Error('Cannot load the database'));
  }
  if (dataFilePath) {
    fs.readFile(dataFilePath, (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
      }
      if (data) {
        const fileLines = data
          .toString('utf-8')
          .trim()
          .split('\n');
        const studentGroupings = {};
        const dbFieldNames = fileLines[0].split(',');
        const studentPropNames = dbFieldNames
          .slice(0, dbFieldNames.length - 1);

        for (const line of fileLines.slice(1)) {
          const studentRecord = line.split(',');
          const studentProps = studentRecord
            .slice(0, studentRecord.length - 1);
          const field = studentRecord[studentRecord.length - 1];
          if (!Object.keys(studentGroupings).includes(field)) {
            studentGroupings[field] = [];
          }
          const studentEntries = studentPropNames
            .map((propName, index) => [propName, studentProps[index]]);
          studentGroupings[field].push(Object.fromEntries(studentEntries));
        }
        resolve(studentGroupings);
      }
    });
  }
});

export default readDatabase;
module.exports = readDatabase;
