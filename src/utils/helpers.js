// helper functions
export function featuredProduct(data) {
  return data.filter(item => {
    return item.featured === true;
  });
}
