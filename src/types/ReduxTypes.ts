export interface ProductListInterface {
	initialized: boolean,
	products: Array<ProductListType>,
};

export interface ProductObjectInterface {
	initialized: boolean,
	product: ProductListType | null,
};

export interface ProductCardInterface {
	initialized: boolean,
	card: ProductListType | null,
};


export type ProductListType = {
	id: number,
	name: string,
	colors: Array<ProductColorType>,
};

export type ProductColorType = {
	id: 1,
	name: string,
	images: Array<string>,
	price: string,
	description: string,
	sizes: Array<number>,
}

