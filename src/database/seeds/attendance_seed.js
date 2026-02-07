exports.seed = async function (knex) {
  await knex("attendance").del();

  const employees = await knex("employees").select("id");

  if (employees.length === 0) {
    throw new Error("No employees found. Attendance seed aborted.");
  }

  const attendanceData = employees.map((emp) => ({
    employee_id: emp.id,
    date: "2025-02-01",
    check_in_time: "09:00",
  }));

  await knex("attendance").insert(attendanceData);
};
