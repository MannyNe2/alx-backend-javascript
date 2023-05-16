const fs = require('fs');

/**
 * Count the students in a CSV data file.
 * @param {String} dataFilePath The path to the CSV data file.
 * @author Manny Negussie <https://github.com/MannyNe2>
 */
const countStudents = (dataFilePath) => {
  try {
    let data = fs.readFileSync(dataFilePath, 'utf8').toString().split('\n');
    data = data.slice(1, data.length - 1);
    console.log(`Number of students: ${data.length}`);
    const subjectGroupings = {};
    for (const row of data) {
      const student = row.split(',');
      if (!subjectGroupings[student[3]]) subjectGroupings[student[3]] = [];
      subjectGroupings[student[3]].push(student[0]);
    }
    for (const subject in subjectGroupings) {
      if (subject) console.log(`Number of students in ${subject}: ${subjectGroupings[subject].length}. List: ${subjectGroupings[subject].join(', ')}`);
    }
  } catch (error) {
    throw new Error('Cannot load the database');
  }
};
module.exports = countStudents;
