const validate = (featureKeys: string[], value: string) => {
    if (!value || value.trim() === "") {
      return "Not Empty";
    }
    if (/\s+/.test(value)) {
      return "No White Spaces";
    }
    if (!/^[a-zA-Z0-9_]+$/.test(value)) {
      return "Invalid Name";
    }        
    const l = featureKeys
      .filter(x => x === value).length;
    if (l > 0) {
      return "Must be unique";
    }
    return undefined;
  };
export default validate;