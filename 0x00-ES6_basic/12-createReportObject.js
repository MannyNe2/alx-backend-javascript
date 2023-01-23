export default function createReportObject(employeesList) {
  return { allEmployees: { ...employeesList }, getNumberOfDepartments: employeesList.length };
}
