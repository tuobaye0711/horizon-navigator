import * as React from "react";
import { PureComponent } from "react";

class Clock extends PureComponent {
  public state = {
    canvas: HTMLCanvasElement
  };
  constructor(props) {
    super(props);
  }
  public componentDidMount() {
    this.updateCanvas();
  }
  public updateCanvas() {
    const { canvas }: any = this.state;
    const clock = canvas.getContext("2d");
    clock.canvas.width = 200*1.5;
    clock.canvas.height = 200*1.5;
    clock.strokeStyle = "#28d1fa";
    clock.lineWidth = 5;
    clock.lineCap = "round";
    clock.shadowBlur = 0;
    clock.shadowColor = "#28d1fa";

    function degreeToRadian(degree) {
      return (degree * Math.PI) / 180;
    }

    function renderTime() {
      const now = new Date();
      const today = now.toDateString();
      const time = now.toLocaleTimeString();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();
      const miliSeconds = now.getMilliseconds();
      const newSeconds = seconds + miliSeconds / 1000;

      // HOURS
      clock.beginPath();
      clock.arc(
        100*1.5,
        100*1.5,
        80*1.5,
        degreeToRadian(270),
        degreeToRadian(hours * 15 - 90)
      );
      clock.stroke();

      // MINUTES
      clock.beginPath();
      clock.arc(
        100*1.5,
        100*1.5,
        72*1.5,
        degreeToRadian(270),
        degreeToRadian(minutes * 6 - 90)
      );
      clock.stroke();

      // SECONDS
      clock.beginPath();
      clock.arc(
        100*1.5,
        100*1.5,
        64*1.5,
        degreeToRadian(270),
        degreeToRadian(newSeconds * 6 - 90)
      );
      clock.stroke();

      // DATE
      clock.font = "400 14px Arial, sans-serif";
      clock.fillStyle = "#28d1fa";
      clock.fillText(today, 70*1.5, 100*1.5);

      // TIME
      clock.font = "400 14px Arial, sans-serif";
      clock.fillText(time, 74*1.5, 120*1.5);
    }

    setInterval(renderTime, 40);
  }
  public render() {
    return (
      <canvas
        ref={canvas => (canvas ? (this.state.canvas = canvas as any) : null)}
        id="clock"
        className="clock"
      />
    );
  }
}

export default Clock;
