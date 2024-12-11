const Get = async () => {
  const response = await fetch(
    "https://kioskapi.dev.revelapps.com/api/getfullresources"
  );

  if (!response.ok) {
    throw new Error("Network Response not ok");
  }

  const data = await response.json();

  return data;
};

export default Get;
