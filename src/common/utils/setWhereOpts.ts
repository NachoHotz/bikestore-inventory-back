import { IQuery } from '../interfaces';

type IQueryPick = Pick<IQuery, 'category' | 'provider'>

export function setWhereOpts(query: IQueryPick) {
  const filterFields = [];

  for (const key in query) {
    filterFields.push({ [key]: query[key as keyof typeof query] });
  }


  return {
    OR: filterFields.map((field) => {
      return {
        [Object.keys(field)[0]]: {
          name: {
            in: field[Object.keys(field)[0]],
            mode: 'insensitive',
          }
        },
      };
    }),
  };
}
