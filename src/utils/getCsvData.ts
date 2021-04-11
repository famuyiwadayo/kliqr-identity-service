import reader from "neat-csv";
import fs from "fs";

export const getCsvData = async (file: any) => {
  const result = await reader(file);
  console.log(result);
  return result;
};
