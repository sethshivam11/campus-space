import { Select } from "@mantine/core";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Label } from "@radix-ui/react-label";
import { useTimetable } from "@/context/TimetableProvider";
import React, { useMemo, useState } from "react";
import { useMantineReactTable, type MRT_ColumnDef } from "mantine-react-table";
import { MantineReactTable } from "mantine-react-table";
function Timetable() {
  const { timetable, courses, getCourses, getTimetable } = useTimetable();

  const [body, setBody] = useState({
    stream: "",
    course: "",
    semester: "",
  });

  const [semester, setSemester] = useState<number[]>([]);
  const semesters = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];

  React.useEffect(() => {
    courses.forEach((course) => {
      if (course.course === body.course) {
        setSemester(course.semester);
      }
    });
  }, [body.course, courses]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    getTimetable(body.stream, body.course, body.semester);
  }

  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      { accessorKey: "allotedTime", header: "Time" },
      { accessorKey: "day", header: "Day" },
      { accessorKey: "subject", header: "Subject" },
      { accessorKey: "allotedRoom?.roomNumber", header: "Room" },
      { accessorKey: "teacher?.fullName", header: "Teacher" },
      { accessorKey: "paperId", header: "Paper Id" },
    ],
    []
  );

  const table = useMantineReactTable({
    columns,
    data: timetable.classes,
  });

  return (
    <section className="min-h-screen min-w-screen">
      <form onSubmit={handleSubmit}>
        <Card className="w-4/5 md:w-3/5 mx-auto my-6 bg-zinc-100 dark:bg-card">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Timetable</CardTitle>
            <CardDescription>View coursewise timetable</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="stream">Select Stream</Label>
                <Select
                  name="stream"
                  placeholder="Stream"
                  data={[
                    { value: "Arts", label: "Arts" },
                    { value: "Science", label: "Science" },
                    { value: "Commerce", label: "Commerce" },
                  ]}
                  onChange={(value) => {
                    getCourses(value);
                    setBody({ ...body, stream: value });
                  }}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="course">Select Course</Label>
                <Select
                  name="course"
                  placeholder="Select"
                  data={
                    courses.length
                      ? courses.map((course) => ({
                          value: course.course,
                          label: course.course,
                        }))
                      : [{ value: "na", label: "No courses", disabled: true }]
                  }
                  onChange={(value) => setBody({ ...body, course: value })}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="semester" className="flex flex-start">
                  Semester
                </Label>
                <Select
                  name="semester"
                  placeholder="Semester"
                  data={
                    semester.length
                      ? semester.map((sem) => ({
                          value: sem.toString(),
                          label: semesters[sem - 1],
                        }))
                      : [{ value: "0", label: "No semester" }]
                  }
                  onChange={(value) => setBody({ ...body, semester: value })}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-evenly">
            <Button type="submit" size="lg">
              View
            </Button>
          </CardFooter>
        </Card>
      </form>
      <div className="mx-auto md:w-5/6 w-full my-2 bg-neutral-700 dark:bg-zinc-900">
        <MantineReactTable table={table} />
      </div>
    </section>
  );
}

export default Timetable;
