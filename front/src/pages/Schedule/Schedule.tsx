import type { JSX } from "react";
import { useState, useEffect } from "react";

interface ScheduleData {
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
}

export default function Schedule(): JSX.Element {
  const [schedule, setSchedule] = useState<ScheduleData[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/schedule`)
      .then((res) => res.json())
      .then((resData) => setSchedule(resData))
      .catch((err) => console.error("Ошибка получения расписания: ", err));
  }, []);

  return (
    <div>
      {schedule.map((item, index) => (
        <div key={index}>
          <p>{item.monday}</p>
        </div>
      ))}
    </div>
  );
}
