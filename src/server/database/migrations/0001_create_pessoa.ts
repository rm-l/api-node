import type { Knex } from 'knex';
import { ETableNames } from '../ETableNames';


export async function up(knex: Knex) {
    return knex
        .schema
        .createTable(ETableNames.pessoa, table => {
            table.bigIncrements('id').primary().index();
            table.string('nome', 150).notNullable().index();
            table.string('email').notNullable().unique();

            table.bigInteger('cidadeId').notNullable().index()
                .references('id').inTable(ETableNames.cidade)
                .onUpdate('CASCADE').onDelete('RESTRICT');

            table.comment('Tabela usada para armazenar pessoas do sistema.');

        }).then(() => {
            console.log(`# Created table ${ETableNames.pessoa}`);
        });
}


export async function down(knex: Knex) {
    return knex
        .schema.
        dropTable(ETableNames.pessoa)
        .then(() => {
            console.log(`# Dropped table ${ETableNames.pessoa}`);
        });
}
