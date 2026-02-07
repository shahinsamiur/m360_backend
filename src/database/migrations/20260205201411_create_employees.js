/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("employees", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.integer("age").notNullable();
    table.string("designation").notNullable();
    table.date("hiring_date").notNullable();
    table.date("date_of_birth").notNullable();
    table.decimal("salary").notNullable();
    table.string("photo_path");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
    table.timestamp("deleted_at");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("employees");
};
