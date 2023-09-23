export {replacer, reviver};

function replacer(key, value) {
  if (value instanceof Map) {
    return {
      type: 'Map',
      value: [...value],
    };
  } else {
    return value;
  }
}

function reviver(key, value) {
  if (typeof value === 'object' && value !== null) {
    if (value.type === 'Map') {
      return new Map(value.value);
    }
  }
  return value;
}