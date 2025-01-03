/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
   return knex.schema.createTable('games', function (table) {
    table.increments('id').primary(); // Using UUID as the primary key
    table.uuid("UUID")
    table.integer("cartridge_id");

    table.json('environment').nullable();
    table.json('protagonist').nullable();
    table.json('protagonist_look').nullable();
    table.json('antagonist').nullable();
    table.json('antagonist_look').nullable();
    table.json('henchmen').nullable();
    table.json('goal').nullable();
    table.json('weapon').nullable();
    table.json('story_elements').nullable();
    table.json('npc').nullable();
    table.json('npc_quote').nullable();
    
    table.timestamps(true, true); // Adds created_at and updated_at columns
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('games');
};
