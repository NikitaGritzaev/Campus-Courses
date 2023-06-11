import Light from "../../img/light.png";
import Night from "../../img/night.png";
import cls from "./ThemeButton.module.css"
import { useEffect } from "react";
function ThemeButton({isLight, setIsLight}) {
  useEffect(() => {
    const mode = localStorage.getItem("mode");
    if (mode === "dark") {
      setIsLight(false);
    } else {
      localStorage.setItem("mode", "light");
      setIsLight(true);
    }
  });

  const onClick = () => {
    if (!isLight) {
        localStorage.setItem("mode", "light");
    }
    else {
        localStorage.setItem("mode", "dark");
    }
    setIsLight(!isLight);
  }
  return (
    <img
      src={isLight ? Light : Night}
      alt="тема"
      style={{ filter: isLight ? "invert(0%)" : "invert(100%)" }}
      onClick={onClick}
      className={cls.themeButton}
    />
  );
}

export default ThemeButton;
