import { CSVLink } from "react-csv";
import {
  Button,
  FormControl,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "axios";
import jwtDecode from "jwt-decode";
import React, { Fragment, useEffect, useState } from "react";
import { ACESS_TOKEN } from "../../constant/token";

const GenerateReport = () => {
  const token = localStorage.getItem(ACESS_TOKEN);
  const id = jwtDecode(token).sub;
  const [subjectCode, setSubjectCode] = React.useState(null);
  const [subjectDropdownData, setsubjectDropdownData] = useState([]);
  const [subjectData, setSubjectData] = useState(null);
  /*
SUBJECT CODE
SUBJECT NAME

LECTURER
DATE

STUDENT NAME ----- TIME CHECKED-IN
*/

  const fetchSubjects = async () => {
    axios
      .get(`http://${process.env.REACT_APP_SERVER_IP}:3000/subject/lect`, {
        params: { id },
      })
      .then((res) => {
        const r = res.data.subject.map((sub) => {
          return {
            value: [sub.subjectCode],
            label: `${sub.subjectCode} ${sub.subjectName}`,
          };
        });
        setsubjectDropdownData(r);
      });
  };

  const fetchSubjectDetails = async () => {
    try {
      const res = await axios.get(
        `http://${process.env.REACT_APP_SERVER_IP}:3000/attendance/report`,
        { params: { subjectCode } }
      );
      if (res) {
        setSubjectData(res.data);
      }
    } catch (error) {
      if (error.response) {
        console.error(error.response.status);
      }
    }
  };
  const renderOptions = () => {
    return (
      subjectDropdownData &&
      subjectDropdownData.map((item, index) => {
        const { value, label } = item || {};
        return (
          <Fragment key={index}>
            <option value={value ?? item}>{label ?? item}</option>
          </Fragment>
        );
      })
    );
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  useEffect(() => {
    subjectCode && fetchSubjectDetails();
  }, [subjectCode]);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h1>Generate Report</h1>

      {/* <CSVLink data={[]}>Generate Report</CSVLink> */}

      <FormControl variant="outlined">
        <Select
          native
          value={subjectCode}
          onChange={(e) => {
            setSubjectCode(e.target.value);
          }}
        >
          <option value="">{"Select subject"}</option>
          {renderOptions()}
        </Select>
      </FormControl>
      {subjectData && (
        <RenderRows
          data={subjectData.sessions}
          fullStudentList={subjectData.student}
          subjectCode={subjectData.subjectCode}
        />
      )}
    </div>
  );
};

export default GenerateReport;

const RenderRows = (props) => {
  const { data, fullStudentList, subjectCode } = props;

  const csvData = (sessionStudentList) => {
    const absentees = getAbsent(fullStudentList, sessionStudentList);
    const sessionStudentListupdated = sessionStudentList.map((s) => {
      return { ...s, attended: true };
    });

    return [...sessionStudentListupdated, ...absentees];
  };
  const generateCsvFileName = (date) => {
    const datestr = date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    });

    return `${subjectCode}(${datestr})`;
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "auto auto" }}>
      {data &&
        data?.map((x) => {
          const date = new Date(x.date);
          return (
            <>
              <div
                style={{
                  gridColumn: "1 /span 2",
                  justifyContent: "center",
                  display: "flex",
                  alignItem: "center",
                  width: "100%",
                  marginTop: "64px",
                }}
              >
                <Typography variant="h5" style={{ textAlign: "left" }}>
                  {date.toLocaleDateString("en-GB", {
                    weekday: "long",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                  })}
                </Typography>
                <Button variant="contained" style={{ marginLeft: "16px" }}>
                  <CSVLink
                    data={csvData(x.student)}
                    headers={headers}
                    target="_blank"
                    filename={generateCsvFileName(date)}
                    style={{
                      color: "white",
                      textDecoration: "none",
                      paddingTop: "10px",
                    }}
                  >
                    Download CSV Report
                  </CSVLink>
                </Button>
              </div>
              <Table
                key={x.id}
                sx={{
                  width: "100%",
                  height: "min-content",
                  marginBottom: "64px",
                }}
                aria-label="simple table"
              >
                <TableHead>
                  <TableRow></TableRow>
                  <TableRow>
                    <TableCell align="center">Attended</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {x.student.map((y, index) => {
                    return (
                      <TableRow
                        hover={true}
                        key={y + index}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell align="center">{y.name}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
              <Table
                sx={{
                  width: "100%",
                  height: "min-content",
                  marginBottom: "64px",
                }}
                aria-label="simple table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Absent</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {getAbsent(fullStudentList, x.student)?.map((y, index) => {
                    return (
                      <TableRow
                        hover={true}
                        key={y + index}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell align="center">{y.name}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </>
          );
        })}
    </div>
  );
};

const getAbsent = (full, partial) => {
  return full.filter((object1) => {
    return !partial.some((object2) => {
      return object1.name === object2.name;
    });
  });
};

const headers = [
  { label: "Name", key: "name" },
  { label: "Attended", key: "attended" },
];
