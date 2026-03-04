import { useFetchImages } from "../../API/pexelsAPI";
import { Card } from "../Home/Spotlight";
import { accProducts } from "./products/accProducts.js";
import Footer from "../Home/Footer";

const accIds = [
  18999333, 3731256, 17492091, 5472300, 13876038, 11031128, 14173534,
];

export const AccessoryCategory = ({ title, selectedIds, dec = true }) => {
  const images = useFetchImages(accIds);
  const getImageById = (id) => images.find((img) => img.id === id)?.data;

  const selectedProducts = selectedIds
    ? accProducts.filter((product) => selectedIds.includes(product.id))
    : accProducts;

  return (
    <>
      <div className="flex flex-col items-center pb-10">
        <div className="accTitle w-[95em] pl-[6em] pb-10 pt-10">
          <p>{title}</p>
          <p>{selectedProducts.length} products</p>
        </div>

        <div className="gap-10 grid grid-cols-5 place-content-center pl-5 pb-14 pt-4">
          {selectedProducts.map((product) => (
            <Card
              key={product.id}
              src={getImageById(product.imageId)?.src?.original}
              size="200px"
              product={product}
              name={product.category}
              title={product.category}
              text={product.name}
              price={product.price}
            />
          ))}
        </div>
      </div>
      {dec && <Footer />}
    </>
  );
};

const Accessories = () => {
  return <AccessoryCategory title="ACCESSORIES" dec={false} />;
};

export const Backpacks = () => {
  return (
    <AccessoryCategory
      title="BACKPACKS"
      selectedIds={[
        "black-backpack",
        "dark-gray-backpack",
        "black-tactical-backpack",
      ]}
    />
  );
};

export const Handbags = () => {
  return (
    <AccessoryCategory
      title="HANDBAGS"
      selectedIds={["purple-handbag", "black-handbag"]}
    />
  );
};

export const Hats = () => {
  return <AccessoryCategory title="HATS" selectedIds={["black-cap"]} />;
};

export const AccessoriesSection = () => {
  return (
    <>
      <Accessories />
      <Footer />
    </>
  );
};

export default Accessories;
