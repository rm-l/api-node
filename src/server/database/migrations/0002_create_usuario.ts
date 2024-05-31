import type { Knex } from 'knex';
import { ETableNames } from '../ETableNames';


export async function up(knex: Knex) {
    return knex
        .schema
        .createTable(ETableNames.usuario, table => {
            table.bigIncrements('id').primary().index();
            table.string('nome', 150).notNullable().checkLength('>', 3);
            table.string('email').notNullable().unique().checkLength('>', 5).index();
            table.string('senha').notNullable().checkLength('>', 6);

        }).then(() => {
            console.log(`# Created table ${ETableNames.usuario}`);
        });
}


export async function down(knex: Knex) {
    return knex
        .schema.
        dropTable(ETableNames.usuario)
        .then(() => {
            console.log(`# Dropped table ${ETableNames.usuario}`);
        });
}
