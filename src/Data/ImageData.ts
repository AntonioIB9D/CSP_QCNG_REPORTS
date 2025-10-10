/**
 * The type `sdDataProps` defines an object with properties `key` and `value`, both of type string.
 * @property {string} key - The `key` property in the `sdDataProps` type represents a unique identifier
 * for the data. It is a string type.
 * @property {string} value - The `value` property in the `sdDataProps` type represents a string value
 * associated with a specific key.
 */
type sdDataProps = {
  key: string;
  value: string;
};

/**
 * The type `ldDataProps` defines an object with `key` and `value` properties, both of type string.
 * @property {string} key - The `key` property in the `ldDataProps` type represents a unique identifier
 * for the data. It is of type `string`, meaning it should be a sequence of characters or text.
 * @property {string} value - The `ldDataProps` type consists of two properties: `key` and `value`. In
 * this context, the `value` property is a string that holds the value associated with the
 * corresponding `key`.
 */
type ldDataProps = {
  key: string;
  value: string;
};

/* The `export const sdData` block is defining an array named `sdData` of objects where each object
represents a key-value pair related to standard-definition (SD) image data. Each object in the array
has two properties: `key` and `value`, both of type string. These objects represent different views
of an object or scene, such as Top Left View, Top Right View, Back View, etc., and the corresponding
file paths to the SD images associated with those views. The `sdData` array contains specific
key-value pairs for different views in standard definition. */
export const sdData: sdDataProps[] = [
  {
    key: 'Top_Left_View',
    value: '/Top_Left_View_SD.webp',
  },
  {
    key: 'Top_Right_View',
    value: '/Top_Right_View_SD.webp',
  },
  {
    key: 'Back_View',
    value: '/Back_View_SD.webp',
  },
  {
    key: 'Left_View',
    value: '/Left_View_SD.webp',
  },
  {
    key: 'Bottom_View',
    value: '/Bottom_View_SD.webp',
  },
  {
    key: 'Right_View',
    value: '/Right_View_SD.webp',
  },
  {
    key: 'Corner_View',
    value: '/Corner_View_SD.webp',
  },
];

/* The `export const ldData` block is defining an array of objects where each object represents a
key-value pair related to high-definition (HD) image data. Each object in the array has two
properties: `key` and `value`, both of type string. These objects represent different views of an
object or scene, such as Top Left View, Top Right View, Back View, etc., and the corresponding file
paths to the HD images associated with those views. */
export const ldData: ldDataProps[] = [
  {
    key: 'Top_Left_View',
    value: '/Top_Left_View_LD.webp',
  },
  {
    key: 'Top_Right_View',
    value: '/Top_Right_View_LD.webp',
  },
  {
    key: 'Back_View',
    value: '/Back_View_LD.webp',
  },
  {
    key: 'Left_View',
    value: '/Left_View_LD.webp',
  },
  {
    key: 'Bottom_View',
    value: '/Bottom_View_LD.webp',
  },
  {
    key: 'Right_View',
    value: '/Right_View_LD.webp',
  },
  {
    key: 'Corner_View',
    value: '/Corner_View_LD.webp',
  },
];
