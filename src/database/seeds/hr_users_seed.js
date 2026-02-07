exports.seed = async function (knex) {
  await knex("hr_users").del();

  await knex("hr_users").insert([
    {
      email: "admin@hr.com",
      password_hash:
        "$2b$10$pMexL9sMjSPZQBl7gC9fhO.VyaiRG7.qozdJ5Q.9m0lO1ETHt9QoS", // password: 123
      name: "HR Admin",
    },
  ]);
};
