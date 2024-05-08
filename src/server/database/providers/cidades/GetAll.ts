import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';

export const getAll = async () => {
    try {
        const result = await Knex(ETableNames.cidade).select('*').from('cidade');

        return result;

    } catch (error) {
        console.log(error);
        return new Error('Erro ao buscar registros');
    }
};
