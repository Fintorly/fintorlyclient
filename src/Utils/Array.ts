export const parseSelectObject = (
  array: any[],
  label: string,
  value: string,
): any[] => {
  return array.map((data) => {
    return {
      label: data[label],
      value: data[value],
    };
  });
};

export const removeObjectFromArray = (data: any[], objectIndex: number) => {
  return data.filter((_item, itemIndex) => {
    return itemIndex !== objectIndex;
  });
};

export const clone = (data: any[] | Object) => {
  return JSON.parse(JSON.stringify(data));
};
