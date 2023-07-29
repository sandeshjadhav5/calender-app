// src/calendarData.ts

export const creatingRandomEvent = (): {
  title: string;
  date: Date;
  duration: number;
} => {
  const titles = [
    "Meeting",
    "Appointment",
    "Workshop",
    "Interview",
    "Training",
  ];

  const randomTitle = titles[Math.floor(Math.random() * titles.length)];

  const randomDate = new Date();

  randomDate.setDate(randomDate.getDate() + Math.floor(Math.random() * 30));

  const randomDuration = Math.floor(Math.random() * 4) + 1;

  return { title: randomTitle, date: randomDate, duration: randomDuration };
};

export const generateStubData = (
  count: number
): { title: string; date: Date; duration: number }[] => {
  const data = [];
  for (let i = 0; i < count; i++) {
    data.push(creatingRandomEvent());
  }
  return data;
};
