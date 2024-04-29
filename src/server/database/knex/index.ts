import { knex } from 'knex';
import { development, test } from './Environment';

const getEnvoriment = () => {
    if (process.env.NODE_ENV === 'test') {
        return test;
    } else {
        return development;
    }

};

export const Knex = knex(getEnvoriment());
