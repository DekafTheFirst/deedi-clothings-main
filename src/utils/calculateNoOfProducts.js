const calculateNoOfProducts = (products) => {
  const noOfProducts = products.reduce((acc, item) => acc + item.quantity, 0);
  return (noOfProducts > 0 ? `${noOfProducts}` : '0')
};

// const calculateNoOfProducts = (products) => {
//   console.log(products)
//   return ('0');
// };

export default  calculateNoOfProducts;