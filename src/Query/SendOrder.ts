import { useMutation } from "@tanstack/react-query";
import { SendOrderType } from "../Types/SendOrderTypes";
import { useContext } from "react";
import { DataContext } from "../Contexts/DataContext/Datacontext";
import { StepContext } from "../Contexts/StepContext/StepContext";

const SendOrder = async (payload: SendOrderType) => {
  const response = await fetch(
    "https://kioskapi.dev.revelapps.com/api/CreateKioskOrder",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }
  );

  if (!response.ok) {
    const errorDetails = await response.json().catch(() => ({}));
    throw new Error(
      `Network response not ok: ${response.statusText}, ${JSON.stringify(
        errorDetails
      )}`
    );
  }

  const data = await response.json();

  return data;
};

export default SendOrder;

export const useSendOrder = () => {
  const { handleSetOrderReferenceData } = useContext(DataContext);
  const { handleStepChange } = useContext(StepContext);

  return useMutation({
    mutationFn: SendOrder,
    onSuccess: (data) => {
      console.log("Order sent successfully:", data);
      handleSetOrderReferenceData({
        reference: data.Reference,
        qrCodeImg: data.QRImage,
      });
      // mozebi e podobro tuka da menuvame step
      handleStepChange("payment");
    },
    onError: (error) => {
      console.error("Error sending order:", error);
    },
  });
};
