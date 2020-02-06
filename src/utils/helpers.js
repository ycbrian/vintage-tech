import url from "./URL";

// flatten
export function flattenProducts(data) {
  return data.map(item => {
    // cloudinary
    let image = item.image[0].url;
    // local setup no deployment
    // let image = `${url}${item.image[0].url}`;
    return { ...item, image };
  });
}

// helper functions
export function featuredProduct(data) {
  return data.filter(item => {
    return item.featured === true;
  });
}

// paginate
export function paginate(products) {
  const itemsPerPage = 4;
  const numberOfPages = Math.ceil(products.length / itemsPerPage);

  // const newProducts = Array.from({ length: numberOfPages }, () => {
  //   return products.splice(0, itemsPerPage);
  // });
  const newProducts = Array(numberOfPages)
    .fill(0)
    .map((items, ind) => {
      return products.slice(ind * itemsPerPage, (ind + 1) * itemsPerPage);
    });

  // our code goes here
  return newProducts;
}
