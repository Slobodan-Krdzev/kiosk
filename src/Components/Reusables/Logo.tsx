type LogoPropsType = {
    width?: number,
    source: string
}

const Logo = ({width = 240, source}: LogoPropsType) => {
  return <img src={source} alt="Logo" style={{width: `${width}px`}}/>;
};

export default Logo;
