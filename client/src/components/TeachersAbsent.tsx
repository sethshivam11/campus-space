import React, { useEffect, useMemo } from "react";
import { Card, CardTitle, CardHeader, CardContent } from "./ui/card";
import { useUser } from "@/context/UserProvider";
import { useMantineReactTable, MRT_ColumnDef } from "mantine-react-table";
import { MantineReactTable } from "mantine-react-table";
function TeachersAbsent() {
  const { teachersAbsent, getTeachersAbsent } = useUser();

  useEffect(() => {
    getTeachersAbsent();
  }, [getTeachersAbsent]);

  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        accessorKey: "fullName",
        header: "Teacher",
      },
      {
        accessorKey: "email",
        header: "Email",
      },
    ],
    []
  );

  const table = useMantineReactTable({
    columns,
    data: teachersAbsent,
  });

  return (
    <section className="min-h-screen min-w-screen">
      <Card className="md:w-3/5 w-5/6 mx-auto dark:bg-zinc-900 bg-gray-900 my-6 select-none">
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            Teachers Absent
          </CardTitle>
        </CardHeader>
        <CardContent>
          <MantineReactTable table={table} />
        </CardContent>
      </Card>
    </section>
  );
}

export default TeachersAbsent;
