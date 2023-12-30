"use client";
import { useRecoilState, useRecoilValue } from "recoil";
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
    if (!canvasRef?.current) return;

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

    function getCoordinates(e: MouseEvent | TouchEvent) {
      let x, y;
      if (e instanceof MouseEvent) {
        x = e.offsetX;
        y = e.offsetY;
      } else if (e instanceof TouchEvent && e.touches.length > 0) {
        x = e.touches[0].pageX - canvasRef.current?.offsetLeft!;
        y = e.touches[0].pageY - canvasRef.current?.offsetTop!;
      } else {
        x = 0;
        y = 0;
      }
      return { offsetX: x, offsetY: y };
    }

    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("touchstart", (e) => {
      e.preventDefault();
      startDrawing(e);
    });
    canvas.addEventListener("touchend", stopDrawing);

    canvas.addEventListener("touchmove", (e) => {
      e.preventDefault();
      draw(e);
    });

    function startDrawing(e: MouseEvent | TouchEvent) {
      isDrawing.current = true;
      const { offsetX, offsetY } = getCoordinates(e);
      contextRef.current?.beginPath();
      contextRef.current?.moveTo(offsetX, offsetY);
    }

    function draw(e: MouseEvent | TouchEvent) {
      if (!isDrawing.current) {
        return;
      }

      const { offsetX, offsetY } = getCoordinates(e);
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
