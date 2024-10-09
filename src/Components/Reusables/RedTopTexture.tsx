type RedTopTexturePropsType = {
  text?: string;
  children: JSX.Element;
  image: string;
};

const RedTopTexture = ({ children }: RedTopTexturePropsType) => {
  return <div className="redTopTexture">{children}</div>;
};

export default RedTopTexture;
