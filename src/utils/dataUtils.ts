/**
 * Utility functions for managing JSON data files
 */

/**
 * Type for the response when loading JSON data
 */
type DataResponse<T> = {
  data: T | null;
  error: string | null;
};

/**
 * Load JSON data from the data directory
 * @param fileName - Name of the JSON file (without .json extension)
 * @returns Promise with the loaded data or error
 */
export async function loadJsonData<T>(fileName: string): Promise<DataResponse<T>> {
  try {
    const response = await import(`../data/${fileName}.json`);
    return {
      data: response.default as T,
      error: null
    };
  } catch (error) {
    return {
      data: null,
      error: `Failed to load ${fileName}.json: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
}
