import Knex from 'knex';

import { User, UserPersonalization } from '../../src/models';
import { createTable, dropTable } from '../utils';

exports.up = async (knex: Knex) => {
  await createTable(knex, UserPersonalization.tableName, (tb) => {
    tb.string('id').notNullable().primary();

    tb.string('user_id')
      .notNullable()
      .references('id')
      .inTable(User.tableName)
      .index(`index_${UserPersonalization.tableName}_user_id`)
      .onDelete('CASCADE');
    tb.text('type').notNullable();
    tb.text('value').notNullable();
  });
};

exports.down = async (knex: Knex) => {
  await dropTable(knex, User.tableName);
};
