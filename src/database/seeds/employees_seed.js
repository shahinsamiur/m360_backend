exports.seed = async function (knex) {
  await knex("employees").del();

  await knex("employees").insert([
    {
      id: 1,
      name: "Rahim Uddin",
      age: 28,
      designation: "Software Engineer",
      hiring_date: "2023-06-01",
      date_of_birth: "1996-03-15",
      salary: 60000,
    },
    {
      id: 2,
      name: "Karim Hasan",
      age: 32,
      designation: "Senior Developer",
      hiring_date: "2021-02-10",
      date_of_birth: "1992-07-22",
      salary: 90000,
    },
    {
      id: 3,
      name: "Ayesha Khan",
      age: 26,
      designation: "UI/UX Designer",
      hiring_date: "2024-01-15",
      date_of_birth: "1998-11-05",
      salary: 55000,
    },
    {
      id: 4,
      name: "Tanvir Ahmed",
      age: 35,
      designation: "Project Manager",
      hiring_date: "2020-09-01",
      date_of_birth: "1989-01-18",
      salary: 120000,
    },
  ]);

  await knex.raw(
    "SELECT setval('employees_id_seq', (SELECT MAX(id) FROM employees))",
  );
};
