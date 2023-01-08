import React, { useState } from "react";
import { Form, OverlayTrigger, Popover } from "react-bootstrap";

import { HiCode } from "react-icons/hi";
import {
  MdOutlineAddBusiness,
  MdOutlineBookmarkBorder,
  MdOutlineCategory,
  MdOutlineMedicalServices,
  MdStarBorder,
} from "react-icons/md";
import { IoIosMusicalNotes, IoMdBusiness } from "react-icons/io";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateIconAsync } from "../redux/todosSlice";
import { AiOutlineStock } from "react-icons/ai";
import {
  TbBrandGoogleAnalytics,
  TbBusinessplan,
  TbDeviceDesktopAnalytics,
  TbReportAnalytics,
} from "react-icons/tb";
import { FiLifeBuoy } from "react-icons/fi";
import { MdNightlife } from "react-icons/md";
import { RxCodesandboxLogo } from "react-icons/rx";
import { GrAnalytics, GrTechnology } from "react-icons/gr";

function SelectIcon({ user_id, category_index, currIcon, setCurrIcon }) {
  const dispatch = useDispatch();
  const icons = [
    <MdOutlineCategory />,
    <MdOutlineBookmarkBorder />,
    <HiCode />,
    <MdStarBorder />,
    <AiOutlineStock />,
    <MdOutlineAddBusiness />,
    <IoMdBusiness />,
    <TbBusinessplan />,
    <MdOutlineMedicalServices />,
    <FiLifeBuoy />,
    <MdNightlife />,
    <IoIosMusicalNotes />,
    <GrTechnology />,
    <TbDeviceDesktopAnalytics />,
    <TbBrandGoogleAnalytics />,
    <TbReportAnalytics />,
    <GrAnalytics />,
    <RxCodesandboxLogo />,
  ];
  const [icon, setIcon] = useState(icons[currIcon]);

  async function hangleChangeIcon(newIcon, iconIdx) {
    setIcon(newIcon);
    setCurrIcon(icons.indexOf(newIcon));
    // Change icon index in the db and save the result
    dispatch(updateIconAsync({ user_id, category_index, iconIdx }));
  }

  useEffect(() => {
    setIcon(icons[currIcon]);
  }, [currIcon]);

  const popover = (
    <div className="bg-white border-solid border-2 border-red-600 rounded p-2">
      <Popover id="popover-positioned-top">
        <Popover.Header className="text-center pb-3">
          Change Icon
        </Popover.Header>
        <Popover.Body>
          <div className="grid grid-cols-6 gap-2">
            {icons.map((icon, idx) => (
              <div key={idx} onClick={() => hangleChangeIcon(icon, idx)}>
                {icon}
              </div>
            ))}
          </div>
        </Popover.Body>
      </Popover>
    </div>
  );

  return (
    <OverlayTrigger
      trigger="click"
      key="top"
      rootClose
      placement="top-start"
      overlay={popover}
    >
      <Form.Label className="optionsStyle p-1">{icon}</Form.Label>
    </OverlayTrigger>
  );
}

export default SelectIcon;
