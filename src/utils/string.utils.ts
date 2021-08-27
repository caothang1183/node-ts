const getSlug = (value: string) => {
  return value.replace(" ", "-").toLowerCase();
};

const StringUtils = {
  getSlug,
};
export default StringUtils;
