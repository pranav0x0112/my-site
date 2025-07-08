import React, { useEffect } from "react";
import "./App.scss";
import Main from "./containers/Main";
import Blogs from "./containers/blogs/Blogs";
import Guestbook from "./containers/guestbook/Guestbook"
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import ScrollToTopButton from "./containers/topbutton/Top";
import { StyleProvider } from "./contexts/StyleContext";
import { Switch, Route } from "react-router-dom";

function App() {
  const isDark = true; 
  const changeTheme = () => {}; 

  useEffect(() => {
    document.body.classList.add("dark-mode"); 
  }, []);

  return (
    <StyleProvider value={{ isDark, changeTheme }}>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route
          path="/blogs"
          render={() => (
            <>
              <Header />
              <Blogs />
              <Footer />
              <ScrollToTopButton />
            </>
          )}
        />
        <Route 
          path="/guestbook"
          render={() => (
            <>
            <Header />
            <Guestbook />
            <Footer />
            <ScrollToTopButton />
            </>
          )}
        />
      </Switch>
    </StyleProvider>
  );
}

export default App;