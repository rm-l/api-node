import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';

export const getById = async (id: number | string) => {
    try {
        const result = await Knex(ETableNames.cidade).select('*').where('id', '=', id);

        return result;

    } catch (error) {
        console.log(error);
        return new Error('Erro ao buscar registro');
    }
};
