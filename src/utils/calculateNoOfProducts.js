const calculateNoOfProducts = (products) => {
  const noOfProducts = products.reduce((acc, item) => acc + item.quantity, 0);
  return (noOfProducts > 0 ? `${noOfProducts}` : '1')
};

export default  calculateNoOfProducts;