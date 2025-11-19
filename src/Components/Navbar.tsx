import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Image,
} from "@heroui/react";
import { useBoundStore } from "../Store/BoundStore/BoundStore";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const clearUserData = useBoundStore((state) => state.clearUserData);

  const handleNavigateExit = () => {
    clearUserData();
    navigate("/");
  };

  return (
    <div className="w-full bg-[#000000] p-2 flex justify-between items-center">
      <div
        onClick={() => navigate("/csp/DefectsMap")}
        className="hover:cursor-pointer"
      >
        <Image
          alt="CSP LOGO"
          src="/csp_logo_a.png"
          width={90}
          className="rounded-none ml-11"
        />
        <p className="text-white text-tiny italic font-bold">
          The Composite Solution Partner
        </p>
      </div>
      <div className="text-white flex gap-4 justify-center items-center">
        <Dropdown>
          <DropdownTrigger>
            <Button color="primary" className="text-white rounded-3xl">
              QCNG REPORTS <i className="bi bi-caret-down-fill"></i>
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions">
            <DropdownItem
              key="home"
              onClick={() => navigate("/csp/DefectsMap")}
              endContent={<i className="bi bi-house-door"></i>}
            >
              Home
            </DropdownItem>
            <DropdownItem
              key="advancesSearch"
              onClick={() => navigate("/csp/inspectBox")}
              endContent={<i className="bi bi-search"></i>}
            >
              Advanced search
            </DropdownItem>
            <DropdownItem
              key="delete"
              endContent={<i className="bi bi-x-circle-fill"></i>}
              onClick={() => handleNavigateExit()}
            >
              Exit
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  );
}
