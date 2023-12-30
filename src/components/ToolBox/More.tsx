"use client";

import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import { Tooltip } from "react-tooltip";
import { useTheme } from "next-themes";
import { IoMoonSharp, IoPeople, IoSunnySharp } from "react-icons/io5";

export default function More() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  const isDark = theme === "dark";
  const iconColor = isDark ? "#fff" : "#000";

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  return (
    <div className={styles.more}>
      <div
        data-tooltip-id="darkMode"
        data-tooltip-content="Toggle dark mode"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className={styles.iconWrapper}
      >
        {theme === "dark" ? (
          <IoSunnySharp color={iconColor} />
        ) : (
          <IoMoonSharp color={iconColor} />
        )}
      </div>
      <div
        data-tooltip-id="invite"
        data-tooltip-content="Invite people"
        className={styles.iconWrapper}
      >
        <IoPeople color={iconColor} />
      </div>
      <Tooltip id="darkMode" />
      <Tooltip id="invite" />
    </div>
  );
}
