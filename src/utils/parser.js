/**
 * @fileoverview Parser module for frontend-app
 * @author [Your Name]
 */

import { Parser } from 'json2parser';

class ParserModule {
  constructor() {
    this.jsonParser = new Parser();
  }

  /**
   * @function parseJSON
   * @description Parse a JSON string into a JavaScript object
   * @param {string} jsonString - The JSON string to be parsed
   * @return {object} The parsed JavaScript object
   */
  parseJSON(jsonString) {
    try {
      return this.jsonParser.parse(jsonString);
    } catch (error) {
      console.error('Error parsing JSON:', error);
      return null;
    }
  }
}

export default ParserModule;