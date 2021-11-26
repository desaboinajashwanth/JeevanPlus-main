import { foodContentType } from '../Constants';

export const capatalizeText = textToCapatalize => {
  if (textToCapatalize)
    if (textToCapatalize.length === 0) return textToCapatalize;
    else if (textToCapatalize.length === 1)
      return textToCapatalize.toUpperCase();
    else
      return `${textToCapatalize.substr(0, 1).toUpperCase()}${textToCapatalize
        .substr(1)
        .toLowerCase()}`;

  return textToCapatalize;
};

export const cleanServerResponse = expectedMacroNutrients => {
  let cleanedData = { ...expectedMacroNutrients };
  Object.keys(foodContentType).forEach(key => {
    if (!cleanedData[key] && key !== foodContentType.FOOD_NAME)
      cleanedData[key] = 0;
    else if (!cleanedData[key] && key === foodContentType.FOOD_NAME)
      cleanedData[key] = 'Unknown';
  });
  return cleanedData;
};
