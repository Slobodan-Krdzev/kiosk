import { Option, SingleMealType } from "../../../../Types/Types";
import styles from "./CheckoutCardExtraPreviewStyles.module.css";

interface CheckoutCardExtraPreviewProps {
  stepData: { option: Option; quantity: number }[];
  order: SingleMealType;
}

const CheckoutCardExtraPreview = ({
  stepData,
  order,
}: CheckoutCardExtraPreviewProps) => {
  return (
    <p
      className={`${styles.checkoutCardExtrasText}`}
      style={{ marginBottom: "0.7%" }}
    >
      {stepData.map((i, idx) => (
        <span key={i.option.Id}>
          {i.option.ProductId && (
            <>
              {idx === 0 && <>&bull; </>}
              <span>
                {i.option.Name}{" "}
                <span style={{ textTransform: "lowercase" }}>
                  {" "}
                  x{i.quantity}
                </span>{" "}
                {idx === order!.upsale![0].stepData.length - 1 ? "" : "|"}{" "}
              </span>
            </>
          )}
        </span>
      ))}
    </p>
  );
};

export default CheckoutCardExtraPreview;
