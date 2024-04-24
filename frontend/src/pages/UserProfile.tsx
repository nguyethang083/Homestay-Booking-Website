import { useState } from "react";
import { Tabs } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import PasswordChange from "../components/PasswordChange";
import InformationChange from "../components/PersonalDetailsChange";

const UserProfile = () => {
  type TabPosition = "top" | "right" | "bottom" | "left";
  const [tabPosition] = useState<TabPosition>("left");

  return (
    <div className="mx-auto p-4">
      <Tabs tabPosition={tabPosition}>
        <TabPane
          tab={
            <span style={{ fontFamily: "Montserrat", fontWeight: 500 }}>
              <UserOutlined style={{ marginRight: "8px" }} />
              Personal Details
            </span>
          }
          key="1"
        >
          <InformationChange />
        </TabPane>
        <TabPane
          tab={
            <span style={{ fontFamily: "Montserrat", fontWeight: 500 }}>
              <LockOutlined style={{ marginRight: "8px" }} />
              Change Password
            </span>
          }
          key="2"
        >
          <PasswordChange />
        </TabPane>
      </Tabs>
    </div>
  );
};
export default UserProfile;
