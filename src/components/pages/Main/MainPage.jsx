import { useState, useEffect } from "react";
function MainPage() {
  const [pageTitle, setPageTitle] = useState("");
  const fullTitle = "Добро пожаловать в систему кампусных курсов!";
  useEffect(() => {
    setPageTitle("");
    let i = 0;
    const timerTextAnimation = setInterval(() => {
      if (i === fullTitle.length - 1) {
        clearInterval(timerTextAnimation);
      }
      setPageTitle((pageTitle) => pageTitle + fullTitle[i++]);
    }, 30);
    return () => {
      clearInterval(timerTextAnimation);
    };
  }, []);
  return <h1 className="text-center">{pageTitle}</h1>;
}

export default MainPage;
