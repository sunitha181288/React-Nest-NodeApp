import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import UsersTable from "../../components/UsersTable/UsersTable";
import Typography from "@material-ui/core/Typography";
import TablePagination from "@material-ui/core/TablePagination";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

function UsersPage() {
  const classes = useStyles();
  const [rowsPerPage] = useState(20);
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [rows, setRows] = useState([]);

  // Effects --------------------------------------
  useEffect(() => {
    loadUsers();
  }, [page]);

  /**
   * This method used to fetch users data
   */
  const loadUsers = () => {
    setIsLoading(true);
    fetch(
      `${process.env.REACT_APP_API_URL}/users?page=${page}&limit=${rowsPerPage}`
    )
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoading(false);
          setRows(result.data);
          setTotalPage(result.total);
        },
        (error) => {
          setIsLoading(false);
          setError(error);
        }
      );
  };

  /**
   * This method used to delete user and remove from the UI
   * @param {string} userId
   */
  const deleteUser = (userId) => {
    const requestOptions = {
      method: "DELETE",
    };
    fetch(
      `${process.env.REACT_APP_API_URL}/users/${userId}`,
      requestOptions
    ).then(
      () => {
        loadUsers();
      },
      (error) => {
        setError(error);
      }
    );
  };

  /**
   * This method will trigger when user click on delete button
   * @param {string} userId
   */
  const onDeleteUser = (userId) => {
    deleteUser(userId);
  };

  /**
   * This method will trigger when user click on next/previous page
   * @param {number} page
   */
  const onPageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <div className="users-page">
      <Backdrop className={classes.backdrop} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Typography variant="h4" component="h1" gutterBottom>
        Users
      </Typography>
      {rows.length > 0 && (
        <div>
          <UsersTable
            rows={rows}
            isLoading={isLoading}
            error={error}
            onDeleteUser={onDeleteUser}
          />
          <TablePagination
            rowsPerPageOptions={[]}
            component="div"
            count={totalPage}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={onPageChange}
          />
        </div>
      )}
    </div>
  );
}
export default UsersPage;
