type LogoPropsType = {
    width?: number,
}

const Logo = ({width = 240}: LogoPropsType) => {
  return <img src="/logo.png" alt="Logo" style={{width: `${width}px`}}/>;
};

export default Logo;
