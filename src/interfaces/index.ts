export interface IProduct {
  id?: string | undefined;
  title: string;
  description: string;
  imageURL: string;
  price: string;
  colors: string[];
  category: ICategory
}

export interface IFormProductInput {
  id: string;
  name: "title" | "description" | "imageURL" | "price";
  label: string;
  type: "text",
}

export interface ICategory {
  id?: string | undefined;
  name: string;
  imageURL: string;
}