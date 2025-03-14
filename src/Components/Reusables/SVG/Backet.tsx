type BacketPropsType = {
  color: string
}

const Backet = ({color}: BacketPropsType) => {
  return (
    <svg
    width={40}
    height={40}
      viewBox="0 0 55 55"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M39.0591 19.1529H10.5649C10.1603 19.1446 9.7589 19.2285 9.39061 19.3982C9.02235 19.568 8.69655 19.8194 8.43742 20.1336C8.17829 20.4479 7.99244 20.8171 7.89363 21.2139C7.79483 21.6106 7.7856 22.0248 7.86664 22.4256L10.8348 37.4254C10.9609 38.0505 11.3 38.6115 11.7931 39.0099C12.2861 39.4086 12.9018 39.62 13.5331 39.6072H36.091C36.7224 39.62 37.3381 39.4086 37.8311 39.0099C38.3241 38.6115 38.6633 38.0505 38.7893 37.4254L41.7574 22.4256C41.8384 22.0248 41.8292 21.6106 41.7304 21.2139C41.6317 20.8171 41.4458 20.4479 41.1867 20.1336C40.9274 19.8194 40.6017 19.568 40.2334 19.3982C39.8651 19.2285 39.4639 19.1446 39.0591 19.1529Z"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M30.2089 9.60742L35.6055 19.1527"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.0189 19.1527L19.4155 9.60742"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Backet;
