import { IProduct } from "../interfaces";
import { txtSlicer } from "../utils/functions";
import CircleColor from "./CircleColor";
import Image from "./Image";
import Button from "./ui/Button";

interface IProps {
  product: IProduct;
  setProduct: (value: IProduct) => void;
  openModal : () => void;
  openConfirmModal : () => void;
}

const ProductCard = ({ product, setProduct, openModal, openConfirmModal }: IProps) => {
  const { title, description, imageURL, price, category, colors } = product;

  const productColors = colors.map((color) => {
    return (
        <CircleColor key={color} color={color} />
    )
  })

  return (
    <div className="max-w-sm md:max-w-lg mx-auto md:mx-0 border rounded-md p-2 flex flex-col space-y-3">
      <Image imageURL={imageURL} alt={"Product Name"} className="rounded-md h-52 w-full lg:object-cover" />

      <h3 className="text-lg font-semibold">{txtSlicer(title, 25)}</h3>
      <p className="text-xs text-gray-500 break-words">{txtSlicer(description)}</p>

      <div className="flex items-center space-x-2">
        {productColors}
      </div>

      <div className="flex items-center justify-between">
          <span className="text-lg text-indigo-600 font-semibold">${price}</span>
          <Image imageURL={category.imageURL} alt={category.name} className="w-10 h-10 rounded-full object-bottom" />
      </div>
      <div className="flex items-center justify-between space-x-2">
          <Button spicialStyles="bg-indigo-700" onClick={() => {
            setProduct({...product, category: {...product.category}});
            openModal()
          }}>EDIT</Button>
          <Button spicialStyles="bg-red-700" onClick={() => {
            setProduct(product);
            openConfirmModal();
          }
          }>DELETE</Button>
      </div>
    </div>
  );
};

export default ProductCard;