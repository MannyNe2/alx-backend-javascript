const fs = require('fs');

/**
 * Count the students in a CSV data file.
 * @param {String} dataFilePath The path to the CSV data file.
 * @author Manny Negussie <https://github.com/MannyNe2>
 */
const countStudents = (dataFilePath) => {
  if (!fs.statSync(dataFilePath).isFile()) {
    throw new Error("Cannot load the database");
  }
  if (!fs.existsSync(dataFilePath)) {
    throw new Error('Cannot load the database');
  }
  const fileLines = fs
    .readFileSync(dataFilePath, 'utf-8')
    .toString('utf-8')
    .trim()
    .split('\n');
  const studentGroupings = {};
  const dbFieldNames = fileLines[0].split(',');
  const studentPropNames = dbFieldNames.slice(0, dbFieldNames.length - 1);

  for (const line of fileLines.slice(1)) {
    const studentRecord = line.split(',');
    const studentPropValues = studentRecord.slice(0, studentRecord.length - 1);
    const field = studentRecord[studentRecord.length - 1];
    if (!Object.keys(studentGroupings).includes(field)) {
      studentGroupings[field] = [];
    }
    const studentEntries = studentPropNames
      .map((propName, index) => [propName, studentPropValues[index]]);
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
};

module.exports = countStudents;
