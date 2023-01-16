export const fromEnumToOptions = (enumObject: any) => {
  return Object.entries(enumObject).map((data) => {
    const [key, value] = data as [string, string];
    return {
      label: key,
      value,
    };
  });
};

export const uuidv4 = () => {
  return crypto.randomUUID();
};

export const equalStr = (str1: string, str2: string) => {
  return str1.toLowerCase() === str2.toLowerCase();
};

export const clsDefaultSVG = "cursor-pointer hover:bg-[#ecf0ff] rounded-[6px]";
