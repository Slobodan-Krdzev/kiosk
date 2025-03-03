export type SvgIconPropsType = {
  color: string;
  size?: 'small' | 'large'

};

const Takeaway = ({ color, size }: SvgIconPropsType) => {
  return (
    <svg
    width={size === 'large' ? "150px" : "20%" }
      height={size === 'large' ? "150px" : "100%" }
      viewBox="0 0 174 177"
      fill="none"
    >
      <path
        d="M27.4735 150.975C36.1235 161.527 52.2125 161.527 84.405 161.527H89.595C121.787 161.527 137.884 161.527 146.534 150.975M27.4735 150.975C18.8235 140.416 21.7934 124.394 27.7258 92.3356C31.9427 69.5517 34.0475 58.1524 42.056 51.4194M146.534 150.975C155.184 140.416 152.214 124.394 146.281 92.3356C142.064 69.5517 139.952 58.1524 131.944 51.4194M131.944 51.4194C123.943 44.6864 112.489 44.6864 89.6022 44.6864H84.3978C61.5113 44.6864 50.0645 44.6864 42.056 51.4194"
        fill={color}
      />
      <path
        d="M27.4735 150.975C36.1235 161.527 52.2125 161.527 84.405 161.527H89.595C121.787 161.527 137.884 161.527 146.534 150.975C155.184 140.416 152.214 124.394 146.281 92.3356C142.064 69.5517 139.952 58.1524 131.944 51.4194C123.943 44.6864 112.489 44.6864 89.6022 44.6864H84.3977C61.5113 44.6864 50.0645 44.6864 42.056 51.4194C34.0475 58.1524 31.9427 69.5517 27.7258 92.3356C21.7934 124.394 18.8235 140.416 27.4735 150.975Z"
        stroke={color}
        strokeWidth="18.0383"
      />
      <path
        d="M65.375 44.6868V37.3843C65.375 31.574 67.6533 26.0017 71.7088 21.8932C75.7643 17.7847 81.2647 15.4766 87 15.4766C92.7353 15.4766 98.2357 17.7847 102.291 21.8932C106.347 26.0017 108.625 31.574 108.625 37.3843V44.6868"
        fill={color}
      />
      <path
        d="M65.375 44.6868V37.3843C65.375 31.574 67.6533 26.0017 71.7088 21.8932C75.7643 17.7847 81.2647 15.4766 87 15.4766C92.7353 15.4766 98.2357 17.7847 102.291 21.8932C106.347 26.0017 108.625 31.574 108.625 37.3843V44.6868"
        stroke={color}
        strokeWidth="18.0383"
        strokeLinecap="round"
      />
      <path
        d="M59.5829 57.2039C59.5829 57.2039 56.1074 81.85 56.1074 85.3709C56.1074 88.8918 63.9272 95.9335 63.9272 95.9335L63.0583 142.916C63.0583 146.803 66.1723 148.747 70.0092 148.747C73.8461 148.747 76.9601 146.803 76.9601 142.916L76.0912 95.9335C76.0912 95.9335 83.911 88.7439 83.911 85.3709C83.911 81.9979 80.4355 57.2039 80.4355 57.2039H76.9601V80.0896C76.9601 80.5565 76.777 81.0042 76.4511 81.3344C76.1252 81.6645 75.6832 81.85 75.2224 81.85C74.7615 81.85 74.3195 81.6645 73.9936 81.3344C73.6677 81.0042 73.4847 80.5565 73.4847 80.0896C73.4847 79.7621 72.2891 57.2039 72.2891 57.2039H67.7293C67.7293 57.2039 66.5338 79.7621 66.5338 80.0896C66.5338 80.5565 66.3507 81.0042 66.0248 81.3344C65.6989 81.6645 65.2569 81.85 64.796 81.85C64.3352 81.85 63.8932 81.6645 63.5673 81.3344C63.2414 81.0042 63.0583 80.5565 63.0583 80.0896V57.2039H59.5829ZM96.8362 57.4257C94.7891 57.9221 94.3373 60.1438 94.3373 62.5908V142.913C94.3373 146.8 97.4513 148.743 101.288 148.743C105.125 148.743 108.131 146.796 108.131 142.913C108.131 125.002 104.656 115.453 104.656 106.493C104.656 102.451 111.715 97.2468 111.715 78.4348C111.715 66.9285 101.65 57.4222 97.8128 57.4222C97.4513 57.4222 97.1281 57.3553 96.8362 57.4257Z"
        fill={color}
      />
    </svg>
  );
};

export default Takeaway;
