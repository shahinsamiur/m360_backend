/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("hr_users").del();
  await knex("hr_users").insert([
    {
      email: "admin@hr.com",
      password_hash:
        "$2b$10$YG/VJJprBhusNE4FW.qd0OAsum7XD9kXHSyTDFrBpXBoJPitBAoVq",
      name: "HR Admin",
    },
  ]);
};
