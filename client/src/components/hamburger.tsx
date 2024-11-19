import classNames from "classnames";
import { useState } from "react";

export default function Hamburger() {
  const [opened, setOpened] = useState(false);

  return (
    <div className="relative">
      <div
        onClick={() => setOpened(!opened)}
        className={classNames("tham tham-e-squeeze tham-w-6", {
          "tham-active": opened,
        })}
      >
        <div className="tham-box">
          <div className="tham-inner bg-customTeal" />
        </div>
      </div>

      {opened && (
        <div className="absolute bottom-full left-1/4 transform -translate-x-1/2 bg-green-300 shadow-lg mt-4 p-0 flex flex-col gap-2 rounded-xl mb-5">
          <a
            href="/"
            className="text-customTeal hover:text-customBlue py-2 px-4 rounded-full transition-all font-semibold"
          >
            Home
          </a>
          <a
            href="/Trips"
            className="text-customTeal hover:text-customBlue py-2 px-4 rounded-full transition-all font-semibold"
          >
            Trips
          </a>
          <a
            href="/Calendar"
            className="text-customTeal hover:text-customBlue py-2 px-4 rounded-full transition-all font-semibold"
          >
            Calendar
          </a>
        </div>
      )}
    </div>
  );
}
