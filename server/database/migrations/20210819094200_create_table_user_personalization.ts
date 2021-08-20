import Knex from 'knex';

import { User, UserPersonalization } from '../../src/models';
import { createTable, dropTable } from '../utils';
console.log('create table');
exports.up = async (knex: Knex) => {
  await createTable(knex, UserPersonalization.tableName, (tb) => {
    tb.string('id').notNullable().primary();
    tb.text('type').nullable().defaultTo('email_frequency'); // text to be able to store more info than string
    tb.text('value').nullable().defaultTo('daily');

    tb.string('user_id')
      .notNullable()
      .references('id')
      .inTable(User.tableName)
      .index(`index_${UserPersonalization.tableName}_user_id`)
      .onDelete('CASCADE');
  });
};

exports.down = async (knex: Knex) => {
  await dropTable(knex, UserPersonalization.tableName);
};
