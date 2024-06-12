export const calculateTotals = (cart) => {
  let totalItems = 0;
  let totalCost = 0;

  for (let { amount, price } of cart.values()) {
    totalItems += amount;
    totalCost += amount * price;
    console.log(totalItems, totalCost);
  }

  return { totalItems, totalCost };
};
