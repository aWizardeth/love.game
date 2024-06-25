import Image from "next/image";
import { MdArrowRight } from "react-icons/md";

interface IPanelListItemProps {
  haveSub: boolean | undefined;
  onSelected: (selected: string) => void;
  onShowSide: (showSide: boolean) => void;
  icon: any;
  name: string;
  menu: string;
  link?: string;
}

export const PanelListItem = ({
  haveSub,
  onSelected,
  onShowSide,
  icon,
  name,
  menu,
  link,
}: IPanelListItemProps) => {
  const handleClick = () => {
    if (link) {
      window.open(link, "_blank"); // Open the provided link in a new tab
    } else if (!haveSub) {
      onSelected(menu); // Select the menu item if no link and no submenu
    }
    // If haveSub is true, you might want to handle another logic here
  };

  return (
    <div
      className="flex flex-row justify-between font-windows hover:text-white hover:bg-[#0A0080] cursor-pointer"
      onMouseEnter={() => haveSub && onShowSide(true)}
      // onMouseLeave={() => !haveSub && onShowSide(false)} // Unnecessary comment
      onClick={handleClick}
    >
      <div className="flex flex-row items-center w-full">
        <div className="py-1 justify-center items-center w-[68px] flex">
          <Image src={icon} width={29} height={29} alt="icon" />
        </div>
        <div className="text-[16px]">
          <span dangerouslySetInnerHTML={{ __html: name }}></span>
        </div>
      </div>
      <div className="mt-1 ml-2">
        {haveSub ? <MdArrowRight className="text-black text-[32px]" /> : null}
      </div>
    </div>
  );
};
