/**
 * From countries and states list of objects
 * Objects must have the following structure (extra kvs are fine):
 * {
 *    name: "Country"
 *    states: [{
 *      name: "State"
 *    }]
 * }
 * @param {string} countryName
 * @param {Array} countryList
 */
export const filterStates = (countryName, countryList) => {
  let countryObj = countryList.filter((ctry) => ctry.name === countryName);
  let statesList = countryObj[0].states;
  console.debug({ filterStates: { countryName, statesList, countryObj } });
  return statesList;
};
