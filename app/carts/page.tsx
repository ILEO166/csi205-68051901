
'use client'

import { useContext, useEffect } from "react"
import { globalDataContext } from "../layout"
import type { Product } from "@/data/products"
import Image from "next/image"
import { checkLogin } from "@/utils/login"
import { useRouter } from "next/navigation"

export default function Page() {
    const router = useRouter();
        useEffect(() => checkLogin(router, "/carts"), [router]);
    const { products, setProducts, carts, setCarts } =
        useContext(globalDataContext)

    const removeFromCart = (product: Product) => {
        // Remove product from carts
        setCarts((prev: Product[]) =>
            prev.filter((p: Product) => p.id !== product.id)
        )

        // Return product to products
        setProducts((prev: Product[]) => [...prev, product])
    }

    const totalPrice = carts.reduce(
        (total: number, product: Product) =>
            total + product.price,
        0
    )

    return (
        <div className="mt-4 w-3xl mx-auto">

            {/* Cart products */}
            <div className="bg-cyan-50 h-160 border border-gray-300 overflow-y-auto p-2 rounded-lg">

                <div className="grid grid-cols-5 gap-3">
                    {carts.map((product: Product) => (
                        <div
                            key={product.id}
                            className="overflow-hidden rounded-lg border border-gray-300"
                        >
                            <div className="relative w-full h-25">
                                <Image
                                    src={product.thumbnailUrl}
                                    alt={product.title}
                                    fill
                                    sizes="150px"
                                    className="object-cover"
                                />

                                <div className="absolute top-0 right-0 bg-black/50 text-white text-xs px-1">
                                    ${product.price}
                                </div>

                                <div className="absolute bottom-0 inset-x-0 bg-black/50 text-white text-xs px-1 line-clamp-2">
                                    {product.title}
                                </div>
                            </div>

                            <button
                                onClick={() => removeFromCart(product)}
                                className="w-full bg-red-50 text-red-700 border-t border-red-300 py-2 text-sm hover:bg-red-100 cursor-pointer"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>

                {carts.length === 0 && (
                    <p className="text-center text-gray-500 mt-10">
                        Your cart is empty
                    </p>
                )}
            </div>

            {/* Cart summary */}
            <div className="flex justify-center gap-3 mt-2">
                <div className="bg-amber-400 text-white font-semibold px-4 py-1 rounded-full">
                    Count: {carts.length} items
                </div>

                <div className="bg-red-500 text-white font-semibold px-4 py-1 rounded-full">
                    Price: ${totalPrice.toFixed(2)}
                </div>
            </div>

        </div>
    )
}
