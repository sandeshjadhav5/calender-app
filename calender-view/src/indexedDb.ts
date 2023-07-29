// src/indexedDB.ts
import { openDB, DBSchema, IDBPDatabase } from "idb";

interface CalendarEvent {
  id?: number;
  title: string;
  date: Date;
  duration: number;
}

interface CalendarAppDB extends DBSchema {
  events: {
    key: number;
    value: CalendarEvent;
    indexes: { date: Date };
  };
}

export const openDatabase = async (): Promise<IDBPDatabase<CalendarAppDB>> => {
  return openDB<CalendarAppDB>("calendar-db", 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains("events")) {
        const eventsStore = db.createObjectStore("events", {
          keyPath: "id",
          autoIncrement: true,
        });
        eventsStore.createIndex("date", "date");
      }
    },
  });
};

export const saveEventsToDB = async (
  events: CalendarEvent[]
): Promise<void> => {
  const db = await openDatabase();
  const tx = db.transaction("events", "readwrite");
  const eventStore = tx.objectStore("events");

  for (const event of events) {
    eventStore.add(event);
  }

  await tx.done;
};

export const getEventsFromDB = async (): Promise<CalendarEvent[]> => {
  const db = await openDatabase();
  const tx = db.transaction("events", "readonly");
  const eventStore = tx.objectStore("events");
  return eventStore.getAll();
};
