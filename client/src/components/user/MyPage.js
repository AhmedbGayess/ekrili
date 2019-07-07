import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import UserInfo from "./UserInfo";

const MyPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <div className="container">
      <Helmet>
        <title>Ekriha.com | Votre compte</title>
      </Helmet>
      <UserInfo />
    </div>
  );
};

export default MyPage;
