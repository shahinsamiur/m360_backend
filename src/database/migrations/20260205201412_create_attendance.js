/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("attendance", (table) => {
    table.increments("id").primary();
    table.integer("employee_id").unsigned().notNullable();
    table.date("date").notNullable();
    table.time("check_in_time").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
    table
      .foreign("employee_id")
      .references("id")
      .inTable("employees")
      .onDelete("CASCADE");
    table.unique(["employee_id", "date"]);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("attendance");
};
