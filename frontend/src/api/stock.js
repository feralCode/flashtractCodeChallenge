class Stock {
  name = null;
  openingPrice = null;
  price = null;
  change = null;

  constructor(yahooAPIResponse) {}

  asObject() {
    const {name, openingPrice, price, change} = this;
    return {
      name,
      openingPrice,
      price,
      change,
    };
  }
}
