export type MealType = {
  id: number;
  name: string;
  price: number;
  category: string;
  mothlySpecial: boolean;
  img: string;
};

export type ExtraType = {
  id: number;
  type: string;
  price: number;
};

export type SidesType = {
  id: number;
  type: string;
  price: number;
};

export type DrinksType = {
  drink: Option,
  quantity: number,
  total: number
};

export type SingleMealType = {
  id: number;
  product: Product | undefined;
  image: string | undefined;
  isTakeaway: boolean;
  menuUpgrade: Option | undefined;
  supersize: Option | undefined;
  extras: Option[] | undefined;
  sides: Option[] | undefined;
  drinks: DrinksType[] | undefined;
  originalTotal: number;
  totalPrice: number;
  quantity: number;
};

export type FinalInfoType = {
  orderNum: number | undefined;
  orderDet: SingleMealType[];
};

// FETCH DATA TYPE

export interface RootData {
  ThemeResponse: ThemeResponse;
  TMKData: Tmkdaum[];
  Settings: Settings;
}

export interface ThemeResponse {
  ServiceCallTheme: ServiceCallTheme;
  BillTheme: BillTheme;
  HistoryTheme: HistoryTheme;
  OrderTheme: OrderTheme;
  MessageTheme: MessageTheme;
  PersonalizedKioskTheme: PersonalizedKioskTheme;
  RestaurantName: string;
  LanguagesList: LanguagesList[];
  LogoImage: LogoImage;
  CoverImage: CoverImage;
  ActiveColor: string;
  ProductsScreenBackgroundColor: string;
  DetailsBackButtonColor: string;
  ThemeType: string;
  ServiceButtonType: string;
  BillButtonType: string;
  OrderButtonType: string;
  NextCourseButtonType: string;
  NoteButtonType: string;
  OrderModeButtonVisibility: boolean;
  BillEmailButtonVisibility: boolean;
  IdentVisibility: boolean;
  UseScreensaver: boolean;
  WiFiAutoReconnect: boolean;
  LoyaltyProgram: LoyaltyProgram;
  OrderingMode: OrderingMode;
  ContextMenu: ContextMenu;
  LocalizedMessagesList: LocalizedMessagesList[];
  BillSettings: BillSettings;
  CurrencySettings: CurrencySettings;
  PaymentMethods: PaymentMethods;
  FeedbackOnDemandButtonVisibility: boolean;
  DisableFeedback: boolean;
  DoNotLockRoundOnOrderSend: boolean;
}

export interface ServiceCallTheme {
  ServiceCallsImagePath: string;
  ImageBackgroundColor: string;
  BackgroundColor: string;
  GroupTextColor: string;
  ServiceCallTextColor: string;
  PickUpColor: string;
  DeviderColor: string;
}

export interface BillTheme {
  HeaderTextColor: string;
  HeaderBackgroundColor: string;
  BillBackButtonColor: string;
  StarInactiveColor: string;
  StarActiveColor: string;
  TextColor: string;
  BackgroundColor: string;
  ButtonTextColor: string;
  ButtonBackgroundColor: string;
  BillTableTextColor: string;
  BillTableBackgroundColor: string;
  BillProductTextColor: string;
  BillProductBackgroundColor: string;
  TotalTextColor: string;
  TotalBackgroundColor: string;
  ShowTipsLayout: boolean;
}

export interface HistoryTheme {
  HeaderTextColor: string;
  HeaderBackgroundColor: string;
  LikeInactiveColor: string;
  LikeActiveColor: string;
  TabInactiveTextColor: string;
  TabActiveTextColor: string;
  BackgroundColor: string;
  RoundTextColor: string;
  RoundBackgroundColor: string;
  HistoryBackButtonColor: string;
  HistoryProductTextColor: string;
  HistoryProductBackgroundColor: string;
}

export interface OrderTheme {
  HeaderTextColor: string;
  HeaderBackgroundColor: string;
  OrderBackButtonColor: string;
  BackgroundColor: string;
  HeaderProductTextColor: string;
  HeaderProductBackgroundColor: string;
  ProductBackgroundColor: string;
  ProductTextColor: string;
  ModifierTextColor: string;
  ModifierEditTextColor: string;
  DividerColor: string;
  ButtonTextColor: string;
  ButtonBackgroundColor: string;
}

export interface MessageTheme {
  TitleBackground: string;
  TitleText: string;
  MessageBackground: string;
  MessageText: string;
  ProductBackground: string;
  ProductText: string;
  ProductDevider: string;
  ProductPrice: string;
  Background: string;
  ButtonBackground: string;
  ButtonText: string;
}

export interface PersonalizedKioskTheme {
  ImageUrl: string;
  TextColor: string;
  TextBoxBackgroundColor: string;
  TextBoxBorderColor: string;
  ButtonTextColor: string;
  ButtonBackgroundColor: string;
  BackgroundImageOnTop: boolean;
}

export interface LanguagesList {
  Name: string;
  Locale: string;
  HouseRules: HouseRules;
}

export interface HouseRules {
  Url: string;
  Name: string;
}

export interface LogoImage {
  Url: string;
  Name: string;
}

export interface CoverImage {
  Url: string;
  Name: string;
}

export interface LoyaltyProgram {
  UseLoyaltyProgram: boolean;
}

export interface OrderingMode {
  ButtonVisibility: boolean;
  OrderingMode: number;
  LogoutUserTime: number;
  SkipCoverAndHouseRulesScreens: boolean;
}

export interface ContextMenu {
  TurnOffTimerBetweenRoundsType: number;
}

export interface LocalizedMessagesList {
  Name: string;
  Language: string;
  Title: string;
  Message: string;
  ShowMessage: boolean;
}

export interface BillSettings {
  ServiceCallsButtonsVisibility: boolean;
}

export interface CurrencySettings {
  CurrencySymbol: string;
  ShowCurrency: boolean;
  CurrencyName: string;
}

export interface PaymentMethods {
  Pin: boolean;
  Cash: boolean;
  QRCode: boolean;
  Visa: boolean;
  MasterCard: boolean;
  GPay: boolean;
  IPay: boolean;
}

export interface Tmkdaum {
  Language: string;
  DisplayOrder: number;
  ServiceCalls: ServiceCall[];
  ServiceCallsGroups: ServiceCallsGroup[];
  AdditionalItems: AdditionalItem[];
  Agendas: Agenda[];
  CategoriesScreen: CategoriesScreen;
  MainCategories: MainCategory2[];
  Screensaver: Screensaver;
  UpsaleColletions: UpsaleColletion[];
}

export interface ServiceCall {
  Id: number;
  ServiceCallType: number;
  Message: string;
  MessageUuid: string;
  DisplayOrder: number;
}

export interface ServiceCallsGroup {
  Name: string;
  DisplayOrder: number;
  ServiceCalls: ServiceCall2[];
}

export interface ServiceCall2 {
  Id: number;
  ServiceCallType: number;
  Message: string;
  MessageUuid: string;
  DisplayOrder: number;
}

export interface AdditionalItem {
  DisplayOrder: number;
  AdditionalItemType: number;
  IsVisible: boolean;
  Name: string;
  ImagePath: string;
}

export interface Agenda {
  IdAgenda: number;
  WeekDaysVisible: number[];
  DisplayOrder: number;
  Name: string;
  ImagePath: string;
  Date: string;
  Time: string;
  Description: string;
  Price: number;
  AvailableFromTime: string;
  AvailableToTime: string;
  MaxRounds: number;
  MaxMinutesOrderTime: number;
  IdPosProduct: string;
  WaitingMinutesBetweenOrders: number;
  BitesPerRound: number;
  MainCategories: MainCategory[];
}

export interface MainCategory {
  MainCategoryId: number;
  MainCategoryDisplayOrder: number;
  SubCategories: SubCategory[];
}

export interface SubCategory {
  SubCategoryId: number;
  SubCategoryDisplayOrder: number;
}

export interface CategoriesScreen {
  PictureUrl: string;
  LayoutType: number;
}

export interface MainCategory2 {
  MainCategoryId: number;
  DisplayOrder: number;
  Name: string;
  BackgroundColor: string;
  TextColor: string;
  TextColorActive: string;
  PictureUrl: string;
  AvailableFromTime: string;
  AvailableToTime: string;
  AvailableFromDate: string;
  AvailableToDate: string;
  SubCategories: SubCategory2[];
}

export interface SubCategory2 {
  MainCategoryId: number;
  SubCategoryId: number;
  DisplayOrder: number;
  Name: string;
  LayoutType: number;
  ProductBackgroundColor: string;
  ProductTextColor: string;
  ProductPriceColor: string;
  SubcategoryHeaderBackgroundColor: string;
  IsAllYouCanEat: boolean;
  MaxItemsAllowed: number;
  MaxItemsAllowedRound: number;
  FreePerAgenda: number;
  AvailableFromTime: string;
  AvailableToTime: string;
  AvailableFromDate: string;
  AvailableToDate: string;
  Products: Product[];
}

export interface Product {
  MainCategoryId: number;
  SubCategoryId: number;
  ProductId: number;
  Name: string;
  SmallPictureUrl: string;
  BackgroundColor?: string;
  TextColor?: string;
  PriceColor?: string;
  IsPromotion: boolean;
  PromotionFrom?: string;
  PromotionTo?: string;
  IsAllYouCanEat: boolean;
  AvailableFromTime: string;
  AvailableToTime: string;
  ShowPrice: boolean;
  MaxAmountInAgenda: number;
  FreePerAgenda: number;
  Price: number;
  PriceValue: string;
  IdOtherPos: string;
  LayoutType: number;
  DisplayOrder: number;
  HasModifiers: boolean;
  HasUpsaleCollection: boolean;
  UpsaleCollectionId?: number;
  IsPregnancyNotSuitable: boolean;
  IsSpicy: boolean;
  IsVegan: boolean;
  IsVegetarian: boolean;
  HasProductDetails: boolean;
  ОpenProductVariantsDetails: boolean;
  NoInteraction: boolean;
  OutOfStock: boolean;
  ProductsTags: string[];
  ProductsLink: ProductsLink;
  ProductDetails: ProductDetails;
  ModifierWizards: ModifierWizard[];
  ProductNextCourse: ProductNextCourse;
}

export interface ProductsLink {
  IdProduct: number;
  IdProductLink: string;
}

export interface ProductDetails {
  LayoutType: number;
  ProductPictureUrl?: string;
  MenuBackgroundColor?: string;
  MenuTextColor?: string;
  MenuTextColorActive?: string;
  ProductName: string;
  IdOtherPos: string;
  ProductPrice: number;
  ProductPriceValue: string;
  MenuItems: MenuItem[];
}

export interface MenuItem {
  Active: boolean;
  Name: string;
  LayoutType: number;
  DisplayOrder: number;
  HtmlContent?: string;
  SuggestionsScreen: boolean;
  AllergensScreen?: AllergensScreen;
  NutritionScreen?: NutritionScreen;
}

export interface AllergensScreen {
  LayoutType: number;
  Title: string;
  Allergens: string[];
}

export interface NutritionScreen {
  Title: string;
  Description: string;
  LayoutType: number;
  Nutritions: string[];
}

export interface ModifierWizard {
  MainProductId: number;
  ModifierId: number;
  Title: string;
  SubTitle: string;
  ListType: number;
  IsMandatory: boolean;
  SelectionMin: number;
  SelectionMax: number;
  DisplayOrder: number;
  ModifierItemElements: ModifierItemElement[];
}

export interface ModifierItemElement {
  DefaultSelected: boolean;
  Name: string;
  Description: string;
  ProductPictureUrl: string;
  Price: number;
  DisplayOrder: number;
  IdOtherPos: string;
  ProductId: number;
  ModifiersWizardId: number;
  PriceValue: string;
}

export interface ProductNextCourse {
  ChoosenCourse: ChoosenCourse;
  Courses: Course[];
}

export interface ChoosenCourse {
  Position: number;
  Name: string;
  Changeable: boolean;
  CourseTime: number;
}

export interface Course {
  Position: number;
  Name: string;
  Changeable: boolean;
  CourseTime: number;
}

export interface Screensaver {
  SlideTimer: number;
  ActivationTime: number;
  Transparency: number;
  Slides: Slide[];
}

export interface Slide {
  ImageUrl: string;
  DisplayOrder: number;
}

export interface UpsaleColletion {
  Id: number;
  CollectionName: string;
  UpsaleSteps: UpsaleStep[];
  NumberOfSteps: number;
}

export interface UpsaleStep {
  Id: number;
  Name: string;
  PictureUrl: string;
  MinSelection: number;
  MaxSelection: number;
  Options: Option[];
  DisplayOrder: number;
  NextStepId?: number;
}

export interface Option {
  Id: number;
  ProductId?: number;
  OptionOrder: number;
  Name: string;
  OverrideNextStepId?: number;
  Finish: boolean;
  PictureUrl: string;
  Price: number;
  MaxSelection: number;
}

export interface Settings {
  BatterySettings: BatterySettings;
  WifiSettings: WifiSettings;
  ServerSettings: ServerSettings;
  SendOrderRetryCount: number;
}

export interface BatterySettings {
  LowLevel: number;
  MediumLevel: number;
  Color: string;
}

export interface WifiSettings {
  LowLevel: number;
  MediumLevel: number;
  Color: string;
}

export interface ServerSettings {
  LowLevel: number;
  MediumLevel: number;
  Color: string;
}

export interface ThemeType {
  bgColor: string,
  textColor: string,
  activeTextColor: string
}




