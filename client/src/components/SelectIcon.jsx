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
import { useDispatch, useSelector } from "react-redux";
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

function SelectIcon({
  user_id,
  category_index,
  day,
  month_year,
  dayWtData,
  currIcon,
  setCurrIcon,
}) {
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
  const currTodo = useSelector((state) => state.todos);

  const getDayMonthIdx = (day, month_year) => {
    const monthIdx = currTodo.date.findIndex(
      (curr) => curr.month_year === month_year
    );

    let dayIdx = null;
    if (monthIdx >= 0) {
      dayIdx = currTodo.date[monthIdx].days.findIndex(
        (curr) => curr.day === day
      );
    }

    if (monthIdx < 0) return { monthIdx: null, dayIdx: null };
    if (monthIdx >= 0 && dayIdx < 0) return { monthIdx, dayIdx: null };

    return { monthIdx, dayIdx };
  };

  async function handleChangeIcon(newIcon, iconIdx) {
    setIcon(newIcon);
    setCurrIcon(icons.indexOf(newIcon));

    if (!dayWtData)
      dispatch(
        updateIconAsync({
          user_id,
          category_index,
          dayWtData,
          iconIdx,
          monthIdx: null,
          dayIdx: null,
        })
      );

    // Get monthIdx and dayIdx
    const { dayIdx, monthIdx } = getDayMonthIdx(day, month_year);

    // Change icon index in the db and save the result
    dispatch(
      updateIconAsync({
        user_id,
        category_index,
        iconIdx,
        dayWtData,
        dayIdx,
        monthIdx,
      })
    );
  }

  useEffect(() => {
    setIcon(icons[currIcon]);
  }, [currIcon]);

  const popover = (
    <div className="bg-white border-solid border-2 border-red-600 rounded p-2">
      <Popover id="popover-positioned-top">
        <Popover.Body>
          <div className="grid grid-cols-6 gap-2">
            {icons.map((icon, idx) => (
              <div
                key={idx}
                className="transition ease-in-out hover:-translate-y-1 hover:scale-105 duration-50"
                onClick={() => handleChangeIcon(icon, idx)}
              >
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
      className=""
      trigger="click"
      key="top"
      rootClose
      placement="top-start"
      overlay={popover}
    >
      <Form.Label className="optionsStyle cursor-pointer p-1">
        {icon}
      </Form.Label>
    </OverlayTrigger>
  );
}

export default SelectIcon;
