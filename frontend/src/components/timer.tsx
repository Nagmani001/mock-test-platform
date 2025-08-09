import { useEffect, useState } from "react"

export default function Timer({ hour, minute }: {
  hour: number,
  minute: number,
}) {
  const [time, setTime] = useState({
    hour,
    minute,
    second: 59
  });

  useEffect(() => {
    /* setTimeout(() => {
      // send request to backend 
    }, (hour * 60 * 60 * 1000 + minute * 60 * 1000 + second * 1000));
    */
    const secondIntervalId = setInterval(() => {
      if (time.second == 0) {
        clearInterval(secondIntervalId)
      }

      if (time.second > 0) {
        time.second--;
      }
      if (time.second == 0 && time.minute > 0) {
        time.second = 59
      }
      console.log("second", time.second);
      setTime((prev) => {
        return {
          ...prev,
          second: time.second
        }
      })
    }, 1000);

    const minuteIntervalId = setInterval(() => {
      if (time.minute == 0) {
        clearInterval(minuteIntervalId)
      }
      if (time.minute > 0) {
        time.minute--;
      }
      if (time.minute == 0 && time.hour > 0) {
        time.minute = 59
      }

      console.log("minute", minute);
      setTime((prev) => {
        return {
          ...prev,
          minute: time.minute
        }
      })
    }, 60 * 1000);

    const hourIntervalId = setInterval(() => {
      if (hour == 0) {
        clearInterval(hourIntervalId)
      }
      if (time.hour > 0) {
        time.hour--;
      }
      console.log("hour", hour);
      setTime((prev) => {
        return {
          ...prev,
          hour: time.hour
        }
      })
    }, 60 * 60 * 1000);
  }, []);
  return <div className="bg-red-50">
    <div className="flex mt-8 justify-center gap-x-3 text-3xl">
      <div>{time.hour} <span>:</span></div>
      <div>{time.minute} <span>:</span></div>
      <div>{time.second} </div>
    </div>
    <div className="flex justify-center gap-x-5 ">
      <div>Hour</div>
      <div>Minute</div>
      <div>Second</div>
    </div>
  </div>
}
