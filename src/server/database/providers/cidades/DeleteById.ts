import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';

export const deleteById = async (id: number | string) => {
    try {
        const result = await Knex(ETableNames.cidade).delete('*').where('id', '=', id);

        return result;

    } catch (error) {
        console.log(error);
        return new Error('Erro ao deletar registro');
    }
};
