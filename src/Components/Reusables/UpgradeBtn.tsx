import BigerHeading from "./BigerHeading";

type UpgradeBtnPropsType = {

    itemName: string,
    image: string,
    toptext: string,
    price: string | number
}

const UpgradeBtn = ({itemName, image, toptext, price}:UpgradeBtnPropsType) => {
  return (
    <>
      <div>
        <p className="topPicImage">{toptext}</p>
        <img src={image} alt="item" />
      </div>
      <p className="price">{price}</p>
      <BigerHeading text={itemName} fontSize={32} />
    </>
  );
};

export default UpgradeBtn;
