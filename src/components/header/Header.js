import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Headroom from "react-headroom";
import "./Header.scss";
import StyleContext from "../../contexts/StyleContext";
import {
  greeting,
  workExperiences,
  skillsSection,
  openSource,
  blogSection,
  talkSection,
  achievementSection,
  resumeSection
} from "../../portfolio";

function Header() {
  const { isDark } = useContext(StyleContext);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  // Instead of conditionally rendering based on hasMounted,
  // we'll handle this differently
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const viewExperience = workExperiences.display;
  const viewOpenSource = openSource.display;
  const viewSkills = skillsSection.display;
  const viewAchievement = achievementSection.display;
  const viewBlog = blogSection.display;
  const viewTalks = talkSection.display;
  const viewResume = resumeSection.display;

  return (
    <Headroom>
      <header className={isDark ? "dark-menu header" : "header"}>
        <a href="/" className="logo">
          {/* Use this approach to avoid the fragment issue */}
          <span className="logo-name">{isClient ? greeting.username : ""}</span>
        </a>

        <input className="menu-btn" type="checkbox" id="menu-btn" />
        <label className="menu-icon" htmlFor="menu-btn" style={{ color: "white" }}>
          <span className={isDark ? "navicon navicon-dark" : "navicon"}></span>
        </label>

        <ul className={isDark ? "dark-menu menu" : "menu"}>
          {isHomePage && (
            <>
              {viewSkills && (
                <li><a href="#skills">Skills</a></li>
              )}
              {viewExperience && (
                <li><a href="#experience">Work Experiences</a></li>
              )}
              {viewOpenSource && (
                <li><a href="#opensource">Open Source</a></li>
              )}
              {viewAchievement && (
                <li><a href="#achievements">Achievements</a></li>
              )}
              {viewBlog && (
                <li><a href="#blogs">Blogs</a></li>
              )}
              {viewTalks && (
                <li><a href="#talks">Talks</a></li>
              )}
              {viewResume && (
                <li><a href="#resume">Resume</a></li>
              )}
              <li><a href="#contact">Contact Me</a></li>
            </>
          )}
        </ul>
      </header>
    </Headroom>
  );
}

export default Header;