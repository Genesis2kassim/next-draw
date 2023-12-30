"use client";

import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import {
  IoBrush,
  IoDownload,
  IoSunnySharp,
  IoMoonSharp,
  IoStopOutline,
  IoPeople,
} from "react-icons/io5";
import { FaEraser, FaRotateLeft, FaRotateRight } from "react-icons/fa6";
import { useTheme } from "next-themes";
import { Tooltip } from "react-tooltip";
import { useRecoilState } from "recoil";
import { selectedToolAtom } from "@/state/atoms";

export default function ToolBox() {
  // TODO: Handle keyboard shortcuts for selecting tools
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  const [selectedTool, setSelectedTool] = useRecoilState(selectedToolAtom);

  const isDark = theme === "dark";
  const iconColor = isDark ? "#fff" : "#000";

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div
        data-tooltip-id="pencil"
        data-tooltip-content="Pencil"
        className={styles.iconWrapper}
        onClick={() => setSelectedTool("Draw")}
      >
        <IoBrush color={iconColor} />
      </div>
      <div
        data-tooltip-id="rectangle"
        data-tooltip-content="Rectangle"
        className={styles.iconWrapper}
      >
        <IoStopOutline color={iconColor} />
      </div>
      <div
        data-tooltip-id="eraser"
        data-tooltip-content="Eraser"
        className={styles.iconWrapper}
      >
        <FaEraser color={iconColor} />
      </div>
      <div
        data-tooltip-id="undo"
        data-tooltip-content="Undo"
        className={styles.iconWrapper}
        onClick={() => setSelectedTool("UNDO")}
      >
        <FaRotateLeft color={iconColor} />
      </div>
      <div
        data-tooltip-id="redo"
        data-tooltip-content="Redo"
        className={styles.iconWrapper}
        onClick={() => setSelectedTool("REDO")}
      >
        <FaRotateRight color={iconColor} />
      </div>
      <div
        data-tooltip-id="download"
        data-tooltip-content="Download the sketch"
        className={styles.iconWrapper}
      >
        <IoDownload color={iconColor} />
      </div>
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
      </div>

      {/* Tooltips ref */}
      <Tooltip id="pencil" />
      <Tooltip id="rectangle" />
      <Tooltip id="eraser" />
      <Tooltip id="undo" />
      <Tooltip id="redo" />
      <Tooltip id="download" />
      <Tooltip id="darkMode" />
      <Tooltip id="invite" />
    </div>
  );
}
