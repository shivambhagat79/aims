"use client";
import Loader from "@/components/common/loader";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

export default function CourseDetails({ course_code }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.post(
        "http://localhost:4000/course-details",
        { course_code: course_code },
        {
          withCredentials: true,
        }
      );

      if (res.data.valid) {
        setData(res.data.course_data);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Loader />;
  }
  return (
    <div className="m-2 md:m-6 lg:m-10">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Course Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="font-semibold">Course Code</TableCell>
                <TableCell>{course_code}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold">Course Name</TableCell>
                <TableCell>{data.course_name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold">Instructor</TableCell>
                <TableCell>{data.user_name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold">Department</TableCell>
                <TableCell>{data.department_name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold">Credits</TableCell>
                <TableCell>{data.credits}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold">Semester</TableCell>
                <TableCell>{data.semester}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
