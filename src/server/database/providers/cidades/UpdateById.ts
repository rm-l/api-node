import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { ICidade } from '../../models';

export const updateById = async (cidade: Omit<ICidade, 'id'>, id: number | string) => {
    try {
        const result = await Knex(ETableNames.cidade).where('id', '=', id).update(cidade);

        return result;

    } catch (error) {
        console.log(error);
        return new Error('Erro ao buscar registro');
    }
};
