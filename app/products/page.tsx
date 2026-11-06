
'use client'

import { useContext, useEffect } from "react"
import { globalDataContext } from "../layout"
import { Product } from "@/data/products"
import Image from "next/image"
import { buttonStyles } from "@/components/tailgrids/core/button"
import { checkLogin } from "@/utils/login"
import { useRouter } from "next/navigation"

export default function Page() {
    const router = useRouter();
        useEffect(() => checkLogin(router, "/products"), [router]);
    const { products, setProducts, carts, setCarts } = useContext(globalDataContext)

    const addToCart = (product: Product) => {
        // remove product from products
        setProducts(products.filter((p: Product) => p.id !== product.id))

        // append product to carts
        setCarts([...carts, product])
    }

    return (
        <div className="mt-4 bg-cyan-50 w-3xl mx-auto h-160 border border-gray-300 rounded-lg overflow-y-auto p-3">

            <div className="grid grid-cols-5 gap-3">

                {products.map((product: Product) => (
                    <div
                        key={product.id}
                        className="rounded-lg overflow-hidden border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow"
                    >

                        <div className="relative w-full h-35 overflow-hidden">

                            <Image
                                src={product.thumbnailUrl}
                                alt={product.title}
                                fill
                                sizes="150px"
                                className="object-cover"
                            />

                            <div className="absolute bottom-0 inset-x-0 bg-black/50 text-white text-xs px-1 py-1 line-clamp-2">
                                {product.title}
                            </div>

                            <div className="absolute top-0 right-0 bg-black/60 text-white text-xs px-1 rounded-bl-md">
                                ${product.price}
                            </div>

                        </div>

                        <button
                            type="button"
                            className={buttonStyles({
                                className: "bg-green-500 hover:bg-green-600 w-full rounded-none text-white cursor-pointer"
                            })}
                            onClick={() => addToCart(product)}
                        >
                            Add to Carts
                        </button>

                    </div>
                ))}

            </div>

        </div>
    )
}
