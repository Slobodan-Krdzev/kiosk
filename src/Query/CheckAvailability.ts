const CheckAvailability = async (productId: number) => {
    

    const response = await fetch(
      `https://kioskapi.dev.revelapps.com/api/checkProductAvailable?idProduct=${productId}`
    );


    if (!response.ok) {
      throw new Error('Network response not ok');
    }

    const result = await response.json()

  
    return result;
  };

  export default CheckAvailability;