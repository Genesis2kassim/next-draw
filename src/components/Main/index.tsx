"use client";
import { useRecoilState, useRecoilValue } from "recoil";
import styles from "./index.module.css";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  selectedColorAtom,
  selectedStrokeWidthAtom,
  selectedToolAtom,
  strokeOpacityAtom,
} from "@/state/atoms";
import { hexToRgb } from "@/utils";
import { TOOLS } from "@/constants";

export default function Main() {
  //#region REFS
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const isDrawing = useRef(false);
  const initialImageRef = useRef<ImageData | null>(null);
  //#endregion

  //#region STATE MANAGEMENT
  const [undoStack, setUndoStack] = useState<ImageData[]>([]);
  const [redoStack, setRedoStack] = useState<ImageData[]>([]);

  const selectedColor = useRecoilValue(selectedColorAtom);
  const selectedStrokeWidth = useRecoilValue(selectedStrokeWidthAtom);
  const strokeOpacity = useRecoilValue(strokeOpacityAtom);
  const [selectedTool, setSelectedTool] = useRecoilState(selectedToolAtom);
  //#endregion

  function undo() {
    if (undoStack.length > 0) {
      const canvas = canvasRef.current!;
      const ctx = contextRef.current!;
      const lastState = undoStack[undoStack.length - 1];

      // Restore previous state
      ctx.putImageData(lastState, 0, 0);

      // Update the Undo Stack
      setUndoStack((prevStack) => prevStack.slice(0, -1));

      setRedoStack((prevStack) => [...prevStack, lastState]);
    }
  }

  function redo() {
    if (redoStack.length > 0) {
      const canvas = canvasRef.current!;
      const ctx = contextRef.current!;

      const nextState = redoStack[redoStack.length - 1];

      setRedoStack((prevStack) => prevStack.slice(0, -1));

      ctx.putImageData(nextState, 0, 0);

      setUndoStack((prevStack) => [...prevStack, nextState]);
    }
  }

  function clearCanvas() {
    const canvas = canvasRef.current!;
    const ctx = contextRef.current!;

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Reset the undo and redo stacks
    setUndoStack([]);
    setRedoStack([]);

    // Save the initial state after clearing the canvas
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setUndoStack([imageData]);
  }

  useLayoutEffect(() => {
    if (!canvasRef?.current) return;

    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 2;
    canvas.height = window.innerHeight * 2;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.scale(2, 2);
      const colorWithOpacity = `rgba(${hexToRgb(
        selectedColor
      )}, ${strokeOpacity})`;
      ctx.strokeStyle = colorWithOpacity;
      ctx.lineWidth = selectedStrokeWidth;
      ctx.lineCap = "round";
      contextRef.current = ctx;

      initialImageRef.current = ctx.getImageData(
        0,
        0,
        canvas.width,
        canvas.height
      );
      setUndoStack([initialImageRef.current]);
    }

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
      const { offsetX, offsetY } = getCoordinates(e);
      contextRef.current?.beginPath();
      contextRef.current?.moveTo(offsetX, offsetY);

      if (!isDrawing.current) {
        // Save current state in Undo Stack
        const canvas = canvasRef.current!;
        const imageData = contextRef.current?.getImageData(
          0,
          0,
          canvas.width,
          canvas.height
        );
        if (imageData) {
          setUndoStack((prevStack) => [...prevStack, imageData]);
        }
      }

      isDrawing.current = true;
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
      contextRef.current?.closePath();
      isDrawing.current = false;
    }
  }, []);

  useEffect(() => {
    if (selectedTool === TOOLS.UNDO) {
      undo();
    } else if (selectedTool === TOOLS.REDO) {
      redo();
    } else if (selectedTool === TOOLS.CLEAR) {
      clearCanvas();
    }
    setSelectedTool("DEFAULT");
  }, [selectedTool]);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const changeConfig = (color: string, size: number, opacity: number) => {
      if (ctx) {
        const colorWithOpacity = `rgba(${hexToRgb(
          selectedColor
        )}, ${strokeOpacity})`;
        ctx.fillStyle = colorWithOpacity;
        ctx.strokeStyle = colorWithOpacity;
        ctx.lineWidth = size;
      }
    };

    const handleChangeConfig = (config: any) => {
      changeConfig(config.color, config.size, config.opacity);
    };
    changeConfig(selectedColor, selectedStrokeWidth, strokeOpacity);
  }, [selectedColor, selectedStrokeWidth, strokeOpacity]);

  return <canvas className={styles.container} ref={canvasRef}></canvas>;
}
