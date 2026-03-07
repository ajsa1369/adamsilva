import type { CartItem } from './types'
import type { Service } from '@/lib/data/services'
import type { PackagePageData } from '@/lib/data/packages'

/** Parse the monthly price from priceDisplay like "$8,500 + $1,200/mo" */
function parseMonthly(priceDisplay: string): number {
  const match = priceDisplay.match(/\+\s*\$([\d,]+)\/mo/)
  if (!match) return 0
  return parseInt(match[1].replace(/,/g, ''), 10)
}

/** Parse setup price from the raw price field (string of digits or "Custom") */
function parseSetup(price: string): number {
  if (price === '0' || price === 'Custom') return 0
  return parseInt(price, 10)
}

export function serviceToCartItem(service: Service): CartItem {
  const isFree = service.price === '0'
  const hasMonthly = service.priceDisplay.includes('/mo')

  return {
    id: service.id,
    type: 'service',
    name: service.name,
    pricingModel: isFree ? 'free' : hasMonthly ? 'recurring' : 'one-time',
    setupPrice: parseSetup(service.price),
    monthlyPrice: hasMonthly ? parseMonthly(service.priceDisplay) : 0,
    quantity: 1,
  }
}

/** Returns null if package has no fixed pricing (e.g. setupPrice/monthlyPrice is null) */
export function packageToCartItem(pkg: PackagePageData): CartItem | null {
  if (pkg.setupPrice === null || pkg.monthlyPrice === null) {
    return null
  }

  return {
    id: pkg.slug,
    type: 'package',
    name: `${pkg.name} Package`,
    pricingModel: 'recurring',
    setupPrice: pkg.setupPrice,
    monthlyPrice: pkg.monthlyPrice,
    quantity: 1,
  }
}
