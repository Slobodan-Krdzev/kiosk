
type FancyFontHeadingPropsType = {

    size: number;
    align: 'left' | 'right' | 'center';
    letterCapitalization: 'uppercase' | 'capitalize' | 'lowercase';
    lineHeight: number;
    fontWeight: number | string;
    text: string
}

const FancyFontHeading = ({size =  60, align = 'center', letterCapitalization = 'capitalize', lineHeight = 70, fontWeight = 700, text}: FancyFontHeadingPropsType) => {

    const styles = {
        fontSize: size,
        textAlign: align,
        textTransform: letterCapitalization,
        fontFamily : "'Noteworthy', sans-serif",
        fontWeight,
        lineHeight,
    }

  return (
    <h1 style={styles}>{text}</h1 >
  )
}

export default FancyFontHeading