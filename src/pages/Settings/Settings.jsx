import React, { useEffect } from "react";
import { AppLayout } from "../../components";
import AddSliderImages from "./AddSliderImage";
import TermsAndConditions from "./TermsAndConditions";
import PrivacyAndPolicy from "./PrivacyAndPolicy";
import AddAdmins from "./AddAdmins";
import { DashHooks } from "../../Features";
const Settings = () => {
  const { usePages } = DashHooks;
  const { GetPages, PagesData } = usePages();
  useEffect(() => {
    GetPages();
  }, []);

  return (
    <AppLayout active={"7"}>
      <h2>Settings</h2>
      <AddSliderImages />
      <hr />
      <TermsAndConditions
        val={PagesData?.data[0]?.terms}
        id={PagesData?.data[0]?.id}
      />
      <hr />
      <PrivacyAndPolicy
        val={PagesData?.data[0]?.privacy}
        id={PagesData?.data[0]?.id}
      />
      <hr />
      {/* <AddAdmins /> */}
    </AppLayout>
  );
};

export default Settings;
