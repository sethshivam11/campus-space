import React, { useMemo, useState, useEffect } from "react";
import { useMantineReactTable, type MRT_ColumnDef } from "mantine-react-table";
import {
  Select,
  SelectTrigger,
  SelectItem,
  SelectContent,
  SelectValue,
} from "./ui/select";
import { useRoom } from "@/context/RoomProvider";
import { useUser } from "@/context/UserProvider";
import { MantineReactTable } from "mantine-react-table";
export interface RoomInterface {
  id: string;
  roomNumber: string;
  capacity: number;
  location: string;
}

export function VacantRooms() {
  const { rooms, fetchVacantRooms, time: currentTime } = useRoom();
  const { timeslots } = useUser();
  const [time, setTime] = useState("");

  useEffect(() => {
    setTime(currentTime);
  }, [currentTime]);

  useEffect(() => {
    fetchVacantRooms(time);
  }, [time, fetchVacantRooms]);

  const columns = useMemo<MRT_ColumnDef<RoomInterface>[]>(
    () => [
      {
        accessorKey: "roomNumber",
        header: "Room Number",
      },
      {
        accessorKey: "capacity",
        header: "Capacity",
      },
      {
        accessorKey: "location",
        header: "Location",
      },
    ],
    []
  );

  const table = useMantineReactTable({
    columns,
    data: rooms,
  });

  return (
    <section className="min-h-screen">
      <h1 className="text-3xl text-center my-6">Vacant rooms</h1>
      <p className="text-gray-600 dark:text-gray-300 mx-auto md:w-3/5 w-4/5 mb-3 flex gap-2 items-center justify-start">
        Classes available at:
        <Select
          name="stream"
          onValueChange={(value: string) => {
            setTime(value);
          }}
          disabled={time === "closed"}
        >
          <SelectTrigger id="stream" className="w-36">
            <SelectValue
              placeholder={
                time === "closed" ? " " : time?.split("-")?.join(" to ")
              }
            />
          </SelectTrigger>
          <SelectContent position="popper">
            {timeslots.map((timeslot: string, index) => (
              <SelectItem value={timeslot} key={index}>
                {timeslot.split("-")?.join(" to ")}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </p>
      <div className="mx-auto md:w-3/5 w-4/5 mb-6 bg-neutral-800 text-white">
        <MantineReactTable table={table} />
      </div>
      {time === "closed" && (
        <p className="text-red-600 text-xl font-bold animate-pulse text-center">
          College is closed
        </p>
      )}
    </section>
  );
}

export default VacantRooms;
