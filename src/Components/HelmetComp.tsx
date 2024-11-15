import { Helmet } from "react-helmet-async";

const HelmetComp = () => (
  <div>
    <Helmet>
      <title>Kiosk</title>
      <meta name="description" content="A dynamic description for this page" />
    </Helmet>
  </div>
);

export default HelmetComp;
