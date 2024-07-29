export type MealType = {
    id: number,
    name: string,
    price: number,
    category: string,
    mothlySpecial: boolean,
    img: string
  }

  export type ExtraType = {
    id: number,
    type: string,
    price: number
  }

  export type SidesType = {
    id: number,
    type: string,
    price: number
  }

  export type DrinksType = {
    id:number,
    name: string;
    price: number;
    quntity: number;
    totalPrice: number
  }

  export type SingleMealType = {
    id: number,
    meal: MealType | undefined,
    image: string | undefined,
    isTakeaway: boolean,
    menuUpgrade: boolean,
    supersize: boolean,
    extras: ExtraType[],
    sides: SidesType | undefined,
    drinks: DrinksType[],
    originalTotal: number,
    totalPrice: number,
    quantity: number
  }

  export type FinalInfoType = {
    orderNum: number | undefined,
    orderDet: SingleMealType[]
  }