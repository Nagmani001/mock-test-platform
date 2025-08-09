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
  
  return (
    <div className="text-center py-4">
      {/* Timer Display */}
      <div className="flex justify-center items-center space-x-2">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-3 shadow-md">
          <div className="text-2xl font-bold text-white">{time.hour.toString().padStart(2, '0')}</div>
          <div className="text-xs text-blue-100 font-medium">H</div>
        </div>
        <div className="text-2xl font-bold text-gray-400">:</div>
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-3 shadow-md">
          <div className="text-2xl font-bold text-white">{time.minute.toString().padStart(2, '0')}</div>
          <div className="text-xs text-blue-100 font-medium">M</div>
        </div>
        <div className="text-2xl font-bold text-gray-400">:</div>
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-3 shadow-md">
          <div className="text-2xl font-bold text-white">{time.second.toString().padStart(2, '0')}</div>
          <div className="text-xs text-blue-100 font-medium">S</div>
        </div>
      </div>
    </div>
  );
}
