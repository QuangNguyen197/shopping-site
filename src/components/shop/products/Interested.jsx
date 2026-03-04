import { Card } from "../../Home/Spotlight";
import { useFetchImages } from "../../../API/pexelsAPI";
import { accProducts } from "./accProducts";

const interestedIds = [17492091, 13876038, 18999333, 14173534, 5472300];

const InterestedCategory = ({ title, selectedIds }) => {
  const images = useFetchImages(interestedIds);
  const getImageById = (id) => images.find((img) => img.id === id)?.data;

  const selectedProducts = selectedIds
    ? accProducts.filter((product) => selectedIds.includes(product.id))
    : accProducts;

  return (
    <>
      <div className="flex flex-col items-center pb-10 border-top border-[1px]">
        <div className="accTitle w-[95em] pl-[6em] pb-10 pt-10">
          <p>{title}</p>
        </div>

        <div className="gap-10 grid grid-cols-5 place-content-center pl-5 pb-14 pt-4">
          {selectedProducts.map((product) => (
            <Card
              key={product.id}
              src={getImageById(product.imageId)?.src?.original}
              size="200px"
              product={product}
              dec={false}
              int={true}
            />
          ))}
        </div>
      </div>
    </>
  );
};

const Interested = () => {
  return (
    <>
      <InterestedCategory
        title="You might also like this: "
        selectedIds={[
          "black-tactical-backpack",
          "black-cap",
          "black-backpack",
          "black-handbag",
          "stylish-sunglasses",
        ]}
      />
    </>
  );
};

export default Interested;
