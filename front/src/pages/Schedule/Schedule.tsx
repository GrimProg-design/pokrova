import type { JSX } from "react";
import { useState, useEffect } from "react";
import "./Schedule.css";

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
    <div className="schedule-container">
      <h2 className="schedule-title">Расписание на неделю</h2>

      <div className="schedule-vertical">
        {schedule.map((item, index) => (
          <div className="schedule-card" key={index}>
            <div className="schedule-row">
              <span className="day">Понедельник</span>
              <span className="value">{item.monday}</span>
            </div>

            <div className="schedule-row">
              <span className="day">Вторник</span>
              <span className="value">{item.tuesday}</span>
            </div>

            <div className="schedule-row">
              <span className="day">Среда</span>
              <span className="value">{item.wednesday}</span>
            </div>

            <div className="schedule-row">
              <span className="day">Четверг</span>
              <span className="value">{item.thursday}</span>
            </div>

            <div className="schedule-row">
              <span className="day">Пятница</span>
              <span className="value">{item.friday}</span>
            </div>

            <div className="schedule-row">
              <span className="day">Суббота</span>
              <span className="value">{item.saturday}</span>
            </div>

            <div className="schedule-row">
              <span className="day">Воскресенье</span>
              <span className="value">{item.sunday}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
