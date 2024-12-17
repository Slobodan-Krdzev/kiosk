import { useTranslation } from "react-i18next";
import { Product } from "../../../Types/Types";
import styles from "./AlergensListerMealInfoStyles.module.css";
import SingleAlergenItem from "./SingleAlergenItem/SingleAlergenItem";

type AlergensListerMealInfoPropsType = {
  product: Product;
};

const exampleProductWithAlergens = {
  MainCategoryId: 46675,
  SubCategoryId: 46676,
  ProductId: 362977,
  Name: "2. Tonijn Nigiri",
  SmallPictureUrl:
    "http://localhost:9097//Shared/images/f62d7fa4-f2c0-49ca-86c4-75a8d5a850ac.png",
  BackgroundColor: "#1d14f1",
  TextColor: "#1d14f1",
  PriceColor: "#1d14f1",
  IsPromotion: false,
  PromotionFrom: null,
  PromotionTo: null,
  IsAllYouCanEat: true,
  AvailableFromTime: "00:00",
  AvailableToTime: "23:59",
  ShowPrice: true,
  MaxAmountInAgenda: 999999,
  FreePerAgenda: 0,
  IdUpsaleCollection: null,
  Price: 0,
  PriceValue: "€",
  IdOtherPos: "",
  LayoutType: 1,
  DisplayOrder: 1,
  HasModifiers: false,
  HasUpsaleCollection: false,
  UpsaleCollectionId: null,
  IsPregnancyNotSuitable: true,
  IsSpicy: false,
  IsVegan: false,
  IsVegetarian: false,
  HasProductDetails: true,
  ОpenProductVariantsDetails: false,
  NoInteraction: false,
  OutOfStock: false,
  ProductsTags: [],
  ProductsLink: {
    IdProduct: 0,
    IdProductLink: null,
  },
  ProductDetails: {
    LayoutType: 1,
    ProductPictureUrl:
      "http://localhost:9097//Shared/images/e2d88e71-b9e0-4afc-8c0c-f93146a17c25.jpg",
    MenuBackgroundColor: "#8f7e67",
    MenuTextColor: "#000000",
    MenuTextColorActive: "#ffffff",
    ProductName: "2. Tonijn Nigiri",
    IdOtherPos: "",
    ProductPrice: 0,
    ProductPriceValue: "€",
    MenuItems: [
      {
        Active: true,
        Name: "Description",
        LayoutType: 1,
        DisplayOrder: 0,
        HtmlContent: "<h2>tonijn</h2>\n<p>&nbsp;</p>",
        SuggestionsScreen: null,
        AllergensScreen: null,
        NutritionScreen: null,
      },
      {
        Active: true,
        Name: "Nutrition",
        LayoutType: 4,
        DisplayOrder: 1,
        HtmlContent: null,
        SuggestionsScreen: null,
        AllergensScreen: null,
        NutritionScreen: {
          Title: ".",
          Description: ".",
          LayoutType: 4,
          Nutritions: [
            {
              NutritionPictureUrl:
                "http://localhost:9097//Shared/images/icon_nutrition_white_energy.png",
              Title: ".",
              Description: "",
              Percentage: 0,
            },
            {
              NutritionPictureUrl:
                "http://localhost:9097//Shared/images/icon_nutrition_white_carbs.png",
              Title: ".",
              Description: "",
              Percentage: 0,
            },
            {
              NutritionPictureUrl:
                "http://localhost:9097//Shared/images/icon_nutrition_white_fat.png",
              Title: ".",
              Description: "",
              Percentage: 0,
            },
          ],
        },
      },
      {
        Active: true,
        Name: "Allergens",
        LayoutType: 3,
        DisplayOrder: 2,
        HtmlContent: null,
        SuggestionsScreen: null,
        AllergensScreen: {
          LayoutType: 3,
          Title: "",
          Allergens: [
            {
              AllergenTypeId: 1,
              AllergenType: 1,
              IsActive: true,
            },
            {
              AllergenTypeId: 8,
              AllergenType: 8,
              IsActive: true,
            },
            {
              AllergenTypeId: 19,
              AllergenType: 19,
              IsActive: true,
            },
          ],
        },
        NutritionScreen: null,
      },
    ],
  },
  ModifierWizards: [],
  ProductNextCourse: {
    ChoosenCourse: {
      Position: 1,
      Name: "",
      Changeable: false,
      CourseTime: 0,
    },
    Courses: [],
  },
};

const AlergensListerMealInfo = ({
  product,
}: AlergensListerMealInfoPropsType) => {
  const { t } = useTranslation();

  const alergens = exampleProductWithAlergens.ProductDetails.MenuItems.find(
    (i) => i.Name === "Allergens"
  )?.AllergensScreen?.Allergens;
  console.log(product);

  return (
    <div className={styles.alergensWrapper}>
      <h3 className={`fontSF ${styles.alergensTitle}`}>{t("alergens")}</h3>

      <div className={styles.alergensLister}>
        {alergens?.map(a => <SingleAlergenItem key={a.AllergenTypeId} alergen={a}/>)}
      </div>
    </div>
  );
};

export default AlergensListerMealInfo;
