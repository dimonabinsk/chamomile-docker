import { useState, useEffect } from "react";
import { Switch } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AppLoader } from "./components/hoc";
import Header from "./components/header/header";
import { GlobalRouting } from "./routing";

function App() {
  const [fixedHeader, setFixedHeader] = useState(false);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [scrollDistance, setScrollDistance] = useState(0);

  useEffect(() => {
    window.onscroll = () => {
      setScrollDistance(window.scrollY);
      if ((scrollDistance > lastScrollTop || !scrollDistance) && fixedHeader) {
        setFixedHeader(false);
      } else if (scrollDistance < lastScrollTop && !fixedHeader) {
        setFixedHeader(true);
      }
      setLastScrollTop(scrollDistance);
    };
  }, [fixedHeader, lastScrollTop, scrollDistance]);
  return (
    <>
      <AppLoader>
        <div
          className={`relative ${
            fixedHeader ? "top-[70px] lg:top-[107px]" : "top-0"
          }`}
        >
          <Header fixed={fixedHeader} />
          <Switch>
            <GlobalRouting />
          </Switch>
        </div>
      </AppLoader>
      <ToastContainer />
    </>
  );
}

export default App;
