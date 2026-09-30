import { test } from 'node:test'
import assert from 'node:assert/strict'
import { calculateBubbleTeaPrice } from './priceCalculator'

test('calculateBubbleTeaPrice', async (t) => {
  await t.test('calculates base price correctly', () => {
    assert.equal(calculateBubbleTeaPrice({ basePrice: 500 }), 500)
  })

  await t.test('calculates full £7.00 example correctly', () => {
    // base £5.00 + Large £0.75 + Tapioca £0.50 + Popping Boba £0.75 = £7.00
    const total = calculateBubbleTeaPrice({
      basePrice: 500,
      sizeExtraPrice: 75,
      toppingExtraPrices: [50, 75]
    })
    assert.equal(total, 700)
  })

  await t.test('adds flavour extra correctly', () => {
    assert.equal(calculateBubbleTeaPrice({ basePrice: 400, flavourExtraPrice: 50 }), 450)
  })

  await t.test('handles empty toppings', () => {
    assert.equal(calculateBubbleTeaPrice({ basePrice: 500, toppingExtraPrices: [] }), 500)
  })

  await t.test('throws on negative prices', () => {
    assert.throws(() => calculateBubbleTeaPrice({ basePrice: -100 }), /negative/)
    assert.throws(() => calculateBubbleTeaPrice({ basePrice: 100, toppingExtraPrices: [-50] }), /negative/)
  })
})
