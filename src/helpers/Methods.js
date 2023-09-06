// Function to change the name of a file while maintaining its type
export const changeFileName = (file, newName) => {
  // Create a new File object with the updated name and the original file's type
  const newFile = new File([file], newName, { type: file.type });
  return newFile; // Return the new File object
};

// Function to convert an object into FormData, with the option to ignore specific properties
export const objectToFormData = (obj, list_of_ignore = []) => {
  // Create a new FormData instance
  const formData = new FormData();

  // Loop through the object's properties
  for (const key in obj) {
    // Check if the property is a direct property of the object and not inherited
    if (obj.hasOwnProperty(key) && !list_of_ignore.includes(key)) {
      // Append the property's key and value to the FormData
      formData.append(key, obj[key]);
    }
  }

  return formData; // Return the FormData with appended properties
};
