const Get = async () => {
  const response = await fetch(
    "/api/service/getresources?deviceid=2&menuid=23"
  );

  if (!response.ok) {
    throw new Error("Network Response not ok");
  }

  const data = await response.json();

  return data;
};

export default Get;
