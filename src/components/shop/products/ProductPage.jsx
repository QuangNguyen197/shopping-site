import { useParams, Link } from "react-router-dom";
import { useMemo } from "react";
import { useFetchImages } from "../../../API/pexelsAPI";
import { allProducts } from "./allProducts.js";
import Interested from "./Interested.jsx";
import Footer from "../../Home/Footer";

export const ProductPage = () => {
  const { id } = useParams();
  const product = allProducts.find((p) => p.id === id);

  const imageIds = useMemo(() => (product ? [product.imageId] : []), [product]);
  const images = useFetchImages(imageIds);
  const imageSrc = images[0]?.data?.src?.original;

  const category = product?.category;

  return (
    <>
      <div className="px-6 lg:px-20 pt-6">
        <nav className="text-gray-500 text-sm flex gap-2 items-center">
          {category ? (
            <Link
              to={`/${category}`}
              className="hover:text-black hover:font-semibold transition-all"
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Link>
          ) : (
            <span>Category</span>
          )}
          <span>/</span>
          <span className="font-bold text-black cursor-pointer">
            {product?.name || "Unknown Product"}
          </span>
        </nav>
      </div>

      <div className="flex flex-col lg:flex-row justify-center items-start gap-12 px-6 lg:px-20 pt-8 pb-[12em]">
        <div className="flex-1 max-w-md w-full">
          {product ? (
            imageSrc ? (
              <img
                src={imageSrc}
                alt={product.name}
                className="w-full h-auto rounded-xl object-cover shadow-lg"
              />
            ) : (
              <div className="w-full h-96 bg-gray-200 flex items-center justify-center rounded-xl">
                Loading image...
              </div>
            )
          ) : (
            <div className="w-full h-96 bg-red-100 flex items-center justify-center rounded-xl text-red-600 font-semibold">
              Product not found
            </div>
          )}
        </div>

        {product && (
          <div className="flex-1 max-w-lg w-full flex flex-col gap-6">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-2xl font-semibold text-gray-800">
              {product.price}
            </p>

            <div className="flex flex-col gap-2">
              <label htmlFor="size" className="font-medium">
                Select Size
              </label>
              <select
                id="size"
                className="border border-gray-300 rounded-lg p-2 w-40 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select size</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
              </select>
            </div>

            <button className="mt-4 bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition">
              Add to Cart
            </button>
          </div>
        )}
      </div>
      <Interested />
      <Footer />
    </>
  );
};
