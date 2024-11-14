type LogoPropsType = {
    width?: number,
    source: string
}

const Logo = ({width = 60, source}: LogoPropsType) => {
  return <img src={source} alt="Logo" style={{width: `${width}%`}}/>;
};

export default Logo;
