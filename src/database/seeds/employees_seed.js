exports.seed = async function (knex) {
  console.log("🌱 Seeding employees...");

  await knex("employees").del();

  await knex("employees").insert([
    {
      name: "Rahim Uddin",
      age: 28,
      designation: "Software Engineer",
      hiring_date: "2023-01-01",
      date_of_birth: "1996-02-10",
      salary: 60000,
    },
    {
      name: "Karim Ahmed",
      age: 32,
      designation: "HR Executive",
      hiring_date: "2022-05-15",
      date_of_birth: "1993-07-20",
      salary: 50000,
    },
  ]);

  console.log("✅ Employees seeded");
};
