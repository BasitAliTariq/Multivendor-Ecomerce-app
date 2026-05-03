import React from "react";
import styles from "../../styles/styles";
import ShopInfo from "../../components/Shop/ShopInfo";
import ShopProfileData from "../../components/Shop/ShopProfileData";

const ShopPreviewPage = () => {
  return (
    <div className={`${styles.section} bg-[#f5f5f5]`}>
      <div className="w-full md:flex py-10 justify-between">
        <div className="md:w-[25%] bg-white rounded-sm shadow-sm md:overflow-y-scroll md:h-[90vh] md:sticky top-10 left-0 z-10">
          <ShopInfo isOwner={false} />
        </div>
        <div className="md:w-[72%] mt-5 md:mt-['unset'] rounded-sm">
          <ShopProfileData isOwner={false} />
        </div>
      </div>
    </div>
  );
};

export default ShopPreviewPage;
