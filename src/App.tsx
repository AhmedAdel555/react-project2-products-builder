import { ChangeEvent, FormEvent, useState } from "react";
import Modal from "./components/Modal";
import ProductCard from "./components/ProductCard";
import {colors, formProductInputsList, productList } from "./data";
import Button from "./components/ui/Button";
import { IProduct } from "./interfaces";
import Input from "./components/ui/Input";
import { productValidation } from "./validation";
import ErrorMessage from "./components/ErrorMessage";
import CircleColor from "./components/CircleColor";
import { v4 as uuid } from "uuid";
import SelectMenu from "./components/ui/SelectMenus";
import toast, { Toaster } from 'react-hot-toast';


function App() {

  /* ---------- states --------------- */

  const defaultProduct: IProduct ={
    title: "",
    description: "",
    imageURL: "",
    price: "",
    colors: [],
    category: {
      name: "",
      imageURL: ""
    }
  }

  const [products , setProducts] = useState<IProduct[]>(productList)

  const [product, setProduct] = useState<IProduct> (defaultProduct);

  const [isOpen, setIsOpen] = useState(false);

  const [isConfimModalOpen, setIsConfimModalOpen] = useState(false);

  const [errors, setErrors] = useState({title: "", description: "", imageURL: "", price: ""});

  /* -------------- Handler ---------------- */

  const openModal = () =>{setIsOpen(true)}

  const closeModal = () => {setIsOpen(false)}

  const openConfirmModal = () =>{setIsConfimModalOpen(true)}

  const closeConfirmModal = () => {setIsConfimModalOpen(false)}



  const onChangeProductDataHandler = (e: ChangeEvent<HTMLInputElement>) =>{
    const {name, value} = e.target;
      setProduct((prev) => {
        return {...prev, [name]: value}
      })
      setErrors((prev) => {
        return {...prev, [name]: ""}
      });
  }

  const removeProductHandler = () => {

    setProducts(products.filter((p) => {return p.id !== product.id}))
    
    setProduct(defaultProduct);

    closeConfirmModal();

    toast("Product has been deleted successfully!", {
      icon: "👏",
      style: {
        backgroundColor: "#c2344d",
        color: "white",
      },
    });

  }

  const onSubmitProductForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = productValidation({
      title: product.title,
      description: product.description,
      imageURL: product.imageURL,
      price: product.price
    })

    const validated = Object.values(validationErrors).every((value) => value === "");
    
    if(!validated){
      setErrors({...validationErrors});
      return;
    }

    if(product.id){
      const updatedProducts = products.map((p) => {
        if(p.id === product.id){
          return {...product, category: {...product.category}}
        }
        return p;
      } )
      setProducts(updatedProducts);
    }
    else{
      setProducts((prev) => {
        return [{...product, category: {...product.category}, id: uuid()}, ...prev]
      })
    }

    toast('Succesfuly save the product.', {
      style: {
        backgroundColor: "black",
        color: "white"
      },
      icon: '👏',
    });

    setProduct(defaultProduct);
    closeModal();

  }

  /* ---------- Renders ----------------- */

  const renderProductList = products.map(
    (product) => {return <ProductCard key={product.id} product={product} setProduct={setProduct} openModal={openModal} openConfirmModal={openConfirmModal} />}
  );

  const renderFormProductInputs = formProductInputsList.map((input) => {
       return (
        <div className="flex flex-col" key={input.id}>
              <label htmlFor={input.id} className="mb-[2px] text-sm font-medium text-gray-700">
                {input.label}
              </label>
              <Input id={input.id} name={input.name} type={input.type} value={product[input.name]} onChange={onChangeProductDataHandler}  />
              <ErrorMessage msg={errors[input.name]}/>
        </div>
       )
    }
  )

  const allColors = colors.map((color) => {
    return (
        <CircleColor key={color} color={color} onClick={
          ()=> {
            let tembColors: string[] = [...product.colors, color];
            if(product.colors.includes(color)){
              tembColors = tembColors.filter(item => item !== color)
            }
            setProduct((prev) => {
              return {...prev, colors: tembColors}
            })
          }
        } />
    )
  })

  const chosenColors = product.colors.map(color => (
    <span key={color} className="p-1 mr-1 mb-1 text-xs rounded-md text-white" style={{ backgroundColor: color }}>
      {color}
    </span>
  ))

  return (
    <main className="container">
      <Button spicialStyles="bg-indigo-700" onClick={openModal}>Add Product</Button>
      <div className="m-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4 p-2 rounded-md">
        {renderProductList}
      </div>
      <Modal isOpen={isOpen} closeModal={closeModal} title={!product.id ? "Add Product" : "Edit Product"}>
        <form className="space-y-3" onSubmit={onSubmitProductForm}>
          {renderFormProductInputs}
          <SelectMenu product={product} setProduct={setProduct} />
          <div className="flex items-center space-x-2">
          {allColors}
          </div>
          <div className="flex items-center flex-wrap space-x-1">
            {chosenColors}
          </div>
          <Button spicialStyles="bg-indigo-700">{!product.id ? "Add" : "Edit"}</Button>
        </form>
      </Modal>

      <Modal
        isOpen={isConfimModalOpen}
        closeModal={closeConfirmModal}
        title="Are you sure you want to remove this Product from your Store?"
      >
        <div className="flex items-center space-x-3">
          <Button type="button" spicialStyles="bg-[#c2344d] hover:bg-red-800" onClick={removeProductHandler}>
            Yes, remove
          </Button>
          <Button type="button" spicialStyles="bg-[#f5f5fa] hover:bg-gray-300 !text-black" onClick={closeConfirmModal}>
            Cancel
          </Button>
        </div>
      </Modal>

      < Toaster />
    </main>
  )
}

export default App
