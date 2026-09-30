import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/Badge"
import { formatPrice } from "@/lib/utils"
import { Info, Plus } from "lucide-react"

export interface Product {
  _id: string;
  name: string;
  slug: string;
  desc?: string;
  price: number;
  image?: string;
  categorySlug?: string;
  available: boolean;
  badges?: string[];
  allergens?: string[];
  dietaryTags?: string[];
  popular?: boolean;
}

export function ProductCard({ product }: { product: Product }) {
  const isBubbleTea = product.categorySlug === "bubble-tea";
  const badge = product.badges?.[0]?.toLowerCase() as any;

  return (
    <div className={`group relative bg-white rounded-3xl p-5 border border-stone-100 shadow-sm flex flex-col hover:shadow-xl transition-all ${!product.available ? 'opacity-60 grayscale' : ''}`}>
      {/* Badges Overlay */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
        {badge && <Badge variant={badge}>{product.badges![0]}</Badge>}
        {product.dietaryTags?.includes("Vegetarian") && <Badge variant="limited" className="bg-green-100 text-green-800">V</Badge>}
        {product.dietaryTags?.includes("Vegan") && <Badge variant="limited" className="bg-green-200 text-green-900">VG</Badge>}
      </div>

      {/* Image */}
      <div className="w-full aspect-square rounded-2xl bg-stone-100 overflow-hidden mb-4 relative flex items-center justify-center">
        {product.image ? (
          <Image src={product.image} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="text-stone-300 font-display text-2xl font-bold">D'LISH</div>
        )}
      </div>

      {/* Content */}
      <h3 className="text-xl font-bold text-brand-dark mb-1 leading-tight">{product.name}</h3>
      {product.desc && <p className="text-stone-500 text-sm mb-3 line-clamp-2">{product.desc}</p>}
      
      {/* Allergens Notice */}
      <div className="mt-auto mb-4">
        {product.allergens && product.allergens.length > 0 ? (
          <div className="flex items-start gap-1 text-[10px] uppercase font-bold tracking-wider text-stone-400">
            <Info className="w-3 h-3 flex-shrink-0 mt-0.5" />
            <span>Contains: {product.allergens.join(", ")}</span>
          </div>
        ) : (
          <div className="flex items-start gap-1 text-[10px] uppercase font-bold tracking-wider text-stone-400">
            <Info className="w-3 h-3 flex-shrink-0 mt-0.5" />
            <span>Ask staff about allergens</span>
          </div>
        )}
      </div>

      {/* Footer / Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-stone-100">
        <span className="font-display text-xl font-bold text-brand-dark">{formatPrice(product.price)}</span>
        
        {product.available ? (
          isBubbleTea ? (
            <Link href={`/bubble-tea/${product.slug}`} className="bg-brand-bubbletea text-white px-4 py-2 rounded-full font-bold text-sm shadow-md shadow-brand-bubbletea/30 hover:bg-fuchsia-600 transition-colors">
              Customise
            </Link>
          ) : (
            <button className="w-10 h-10 rounded-full bg-stone-100 text-brand-dark flex items-center justify-center hover:bg-brand-dark hover:text-white transition-colors">
              <Plus className="w-5 h-5" />
            </button>
          )
        ) : (
          <span className="text-sm font-bold text-stone-400 uppercase tracking-wider">Sold Out</span>
        )}
      </div>
    </div>
  )
}
