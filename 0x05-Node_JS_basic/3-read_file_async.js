const fs = require('fs');

/**
 * Count the students in a CSV data file.
 * @param {String} dataPath The path to the CSV data file.
 * @author Manny Negussie <https://github.com/MannyNe2>
 */
const countStudents = (dataPath) => new Promise((resolve, reject) => {
  fs.readFile(dataPath, 'utf-8', (err, data) => {
    if (err) {
      reject(new Error('Cannot load the database'));
    }
    if (data) {
      const fileLines = data
        .toString('utf-8')
        .trim()
        .split('\n');
      const studentGroupings = {};
      const fieldNames = fileLines[0].split(',');
      const studentPropNames = fieldNames
        .slice(0, fieldNames.length - 1);

      for (const line of fileLines.slice(1)) {
        const studentRecord = line.split(',');
        const studentProps = studentRecord
          .slice(0, studentRecord.length - 1);
        const field = studentRecord[studentRecord.length - 1];
        if (!Object.keys(studentGroupings).includes(field)) {
          studentGroupings[field] = [];
        }
        const studentEntries = studentPropNames
          .map((propName, idx) => [propName, studentProps[idx]]);
        studentGroupings[field].push(Object.fromEntries(studentEntries));
      }

      const totalStudents = Object
        .values(studentGroupings)
        .reduce((pre, cur) => (pre || []).length + cur.length);
      console.log(`Number of students: ${totalStudents}`);
      for (const [field, group] of Object.entries(studentGroupings)) {
        const studentNames = group.map((student) => student.firstname).join(', ');
        console.log(`Number of students in ${field}: ${group.length}. List: ${studentNames}`);
      }
      resolve(true);
    }
  });
});

module.exports = countStudents;
