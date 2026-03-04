import { useFetchImages } from "../../API/pexelsAPI";
import { useNavigate } from "react-router";
import { spotlightProducts } from "../shop/products/spotlightProducts";

const spotlightIds = [
  25561929, 8532616, 4066292, 8609111, 8957613, 10195371, 1478442, 6311719,
  842959, 13288274,
];

const Spotlight = () => {
  const images = useFetchImages(spotlightIds);
  const getImageById = (id) => images.find((img) => img.id === id)?.data;

  return (
    <>
      <h1>SPOTLIGHT</h1>
      <p>Pointed focus. Rooted grit. {">"} Pure Cactix energy. Every bit.</p>
      <div className="cards w-[80em] h-[30em] grid grid-cols-5 grid-rows-2 place-content-center">
        {spotlightProducts.map((product) => (
          <Card
            key={product.id}
            product={product}
            src={getImageById(product.imageId)?.src?.original}
            size="150px"
            dec={false}
          />
        ))}
      </div>
    </>
  );
};

export function Card({ product, src, size, dec = true, int = false }) {
  const navigate = useNavigate();

  return (
    <div
      className={product.category}
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <div className="imageWrapper grid place-content-center cursor-pointer">
        <div className="fetchedImage w-[fit-content] overflow-hidden">
          <img
            src={src}
            alt={product.name}
            width={size}
            className="rounded-xl"
          />
        </div>
      </div>

      <div className="cardDes">
        {dec && <p>{product.category}</p>}
        {!int && (
          <>
            <p>{product.name}</p>
            <p>{product.price}</p>
          </>
        )}
      </div>
    </div>
  );
}

export default Spotlight;
