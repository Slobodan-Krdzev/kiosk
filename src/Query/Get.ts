const Get = async (isTestMode: boolean ) => {

  const menuNumber = new URLSearchParams(window.location.search).get("menuId")

  const testApi = `https://my.tabletmenukaart.nl/service/kioskTestModeResources?menu=${menuNumber ?? 2408}`
  const prodApi = `https://kioskapi.dev.revelapps.com/api/getfullresources`

  const response = await fetch(
    isTestMode ? testApi : prodApi 
    
  );

  if (!response.ok) {
    throw new Error("Network Response not ok");
  }

  const data = await response.json();

  return data;
};

export default Get;
