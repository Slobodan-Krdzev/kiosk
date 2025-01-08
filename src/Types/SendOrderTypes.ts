export interface SendOrderType {
    Order: Order
    tableNumber: string
    deviceSessionId: string
  }
  
  export interface Order {
    OrderGuid: string
    SessionGuid: string
    Items: Item[]
  }
  
  export interface Item {
    Item: Item2
    Variants: Variant[] | []
    UpsaleCollection: UpsaleCollection[]
    Quantity: number
    ItemGuid: string
    CoursePosition: number
    Note?: string
  }
  
  export interface Item2 {
    Id: number
    PluCode: string
    Image: string
    Name: string
    Price: number
  }
  
  export interface Variant {
    Id: number
    PluCode: string
    Image: string
    Name: string
    Price: number
  }
  
  export interface UpsaleCollection {
    UpsaleStepOptionModel: UpsaleStepOptionModel
    Quantity: number
  }
  
  export interface UpsaleStepOptionModel {
    ProductId: number
    Name: string
    Price: number
  }