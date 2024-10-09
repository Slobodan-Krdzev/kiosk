
type RedTopTexturePropsType = {
    text?: string;
    children: JSX.Element
    image: string
}

const RedTopTexture = ({children, image}: RedTopTexturePropsType) => {
  return (
    <div className="redTopTexture">
        {children}
    </div>
  )
}

export default RedTopTexture