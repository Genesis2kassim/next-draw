"use client";
import { useRecoilValue } from "recoil";
import styles from "./index.module.css";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { selectedColorAtom, selectedStrokeWidthAtom } from "@/state/atoms";

export default function Main() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);

  const selectedColor = useRecoilValue(selectedColorAtom);
  const selectedStrokeWidth = useRecoilValue(selectedStrokeWidthAtom);
  const isDrawing = useRef(false);

  useLayoutEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 2;
    canvas.height = window.innerHeight * 2;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.scale(2, 2);
      ctx.strokeStyle = selectedColor;
      ctx.lineWidth = selectedStrokeWidth;
      ctx.lineCap = "round";
      contextRef.current = ctx;
    }

    canvas.onmousedown = startDrawing;
    canvas.onmousemove = draw;
    canvas.onmouseup = stopDrawing;

    // canvas.addEventListener('touchend', handleMouseUp)

    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", stopDrawing);

    function startDrawing(e: globalThis.MouseEvent) {
      isDrawing.current = true;
      const { offsetX, offsetY } = e;
      contextRef.current?.beginPath();
      contextRef.current?.moveTo(offsetX, offsetY);
    }

    function draw(e: globalThis.MouseEvent) {
      if (!isDrawing.current) {
        return;
      }

      const { offsetX, offsetY } = e;
      contextRef.current?.lineTo(offsetX, offsetY);
      contextRef.current?.stroke();
    }

    function stopDrawing() {
      isDrawing.current = false;
    }
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const changeConfig = (color: string, size: number) => {
      if (ctx) {
        ctx.strokeStyle = color;
        ctx.lineWidth = size;
      }
    };

    const handleChangeConfig = (config: any) => {
      changeConfig(config.color, config.size);
    };
    changeConfig(selectedColor, selectedStrokeWidth);
  }, [selectedColor, selectedStrokeWidth]);
  return <canvas className={styles.container} ref={canvasRef}></canvas>;
}
