type IFilterORFields = {
  category?: string[] | undefined
  provider?: string[] | undefined,
}

export function setWhereOpts(query: IFilterORFields) {
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
