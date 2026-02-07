exports.seed = async function (knex) {
  await knex("attendance").del();

  await knex("attendance").insert([
    { employee_id: 1, date: "2025-01-29", check_in_time: "09:05:00" },
    { employee_id: 1, date: "2025-01-30", check_in_time: "09:00:00" },

    { employee_id: 2, date: "2025-01-30", check_in_time: "08:55:00" },

    { employee_id: 3, date: "2025-01-31", check_in_time: "09:00:00" },

    { employee_id: 4, date: "2025-01-28", check_in_time: "09:20:00" },
  ]);

  await knex.raw(
    "SELECT setval('attendance_id_seq', (SELECT MAX(id) FROM attendance))",
  );
};
