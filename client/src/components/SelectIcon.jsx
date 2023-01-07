import React, { useState } from "react";
import { Form, OverlayTrigger, Popover } from "react-bootstrap";

import { HiCode } from "react-icons/hi";
import { MdOutlineAddBusiness } from "react-icons/md";
import { IoMdBusiness } from "react-icons/io";

function SelectIcon() {
  const iconObjs = { code: <HiCode />, business: <MdOutlineAddBusiness /> };

  const [icon, setIcon] = useState(<HiCode />);

  const icons = [iconObjs.code, iconObjs.business, <IoMdBusiness />];

  function hangleChangeIcon(newIcon) {
    setIcon(newIcon);
  }

  const popover = (
    <Popover id="popover-positioned-top">
      <Popover.Header as="h3">Change Icon</Popover.Header>
      <Popover.Body>
        <div className="grid grid-cols-6 gap-2">
          {icons.map((icon) => (
            <div onClick={() => hangleChangeIcon(icon)}>{icon}</div>
          ))}
        </div>
      </Popover.Body>
    </Popover>
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
