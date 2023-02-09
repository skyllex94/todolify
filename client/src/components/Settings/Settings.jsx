import React from "react";
import Header from "../../pages/Header";
import SideMenu from "../SideMenu/SideMenu";

export default function Settings() {
  return (
    <React.Fragment>
      <Header />

      <div className="flex h-screen">
        <SideMenu />

        <div className="pl-5 pt-28">
          <p>Profile Settings: </p>
        </div>
      </div>
    </React.Fragment>
  );
}
