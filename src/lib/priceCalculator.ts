export interface PriceCalculationParams {
  basePrice: number; // in pence
  flavourExtraPrice?: number; // in pence
  sizeExtraPrice?: number; // in pence
  toppingExtraPrices?: number[]; // array of pence
}

/**
 * Calculates the total price of a custom bubble tea.
 * Operates purely on integers in pence to avoid floating point errors.
 */
export function calculateBubbleTeaPrice({
  basePrice,
  flavourExtraPrice = 0,
  sizeExtraPrice = 0,
  toppingExtraPrices = []
}: PriceCalculationParams): number {
  if (basePrice < 0 || flavourExtraPrice < 0 || sizeExtraPrice < 0) {
    throw new Error("Prices cannot be negative");
  }

  const toppingsTotal = toppingExtraPrices.reduce((sum, price) => {
    if (price < 0) throw new Error("Topping prices cannot be negative");
    return sum + price;
  }, 0);

  return basePrice + flavourExtraPrice + sizeExtraPrice + toppingsTotal;
}
