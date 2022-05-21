import { useRef, useState } from "react";
import axios from "axios";
import {
  Button,
  Container,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

function EmployeeSearch() {
  const [employees, setEmployees] = useState([]);
  const [message, setMessage] = useState(
    "You not have performed any search yet..."
  );
  const [input, setInput] = useState("");
  const employeeRef = useRef();

  function getEmployees() {
    axios
      .get("https://thales-back.herokuapp.com/api/v1/employees")
      .then((res) => {
        setEmployees(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function getEmployeeById() {
    axios
      .get(`https://thales-back.herokuapp.com/api/v1/employee?id=${input}`)
      .then((res) => {
        if (res.data != "") {
          setEmployees([res.data]);
        } else {
          setMessage("No records found!");
          setEmployees([]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleClick() {
    setMessage("");
    console.log(input);

    if (input === "") {
      getEmployees();
    } else {
      getEmployeeById();
    }
  }

  return (
    <div>
      <Grid container direction="column" alignItems="center" justify="center">
        <TextField
          id="standard-basic"
          label="Employee ID"
          variant="standard"
          sx={{ m: 1 }}
          value={input}
          onChange={(i) => {
            setInput(i.target.value);
          }}
        />
        <Button
          variant="outlined"
          startIcon={<SearchIcon />}
          onClick={handleClick}
          sx={{ m: 1 }}
        >
          Search
        </Button>
        {message === "" ? (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">ID</TableCell>
                  <TableCell align="center">Name</TableCell>
                  <TableCell align="center">Salary</TableCell>
                  <TableCell align="center">Age</TableCell>
                  <TableCell align="center">Annula Salary</TableCell>
                  <TableCell align="center">Profile Image</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {employees.map((data, index) => (
                  <TableRow>
                    <TableCell align="center">{data.id}</TableCell>
                    <TableCell align="center">{data.name}</TableCell>
                    <TableCell align="center">{data.salary}</TableCell>
                    <TableCell align="center">{data.age}</TableCell>
                    <TableCell align="center">{data.annualSalary}</TableCell>
                    <TableCell align="center">{data.profileImage}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <label>{message}</label>
        )}
      </Grid>
    </div>
  );
}

export default EmployeeSearch;
