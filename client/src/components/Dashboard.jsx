import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {  toast } from "react-toastify";
import {
  Container,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Grid,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,Paper
} from "@mui/material";
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    category: "",
    status: "pending",
    dueDate: "",
  });
  const [newCategory, setNewCategory] = useState("");
  const [filter, setFilter] = useState({ status: "", category: "" });
  const [editingTask, setEditingTask] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
    fetchCategories();
  }, [filter]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:3000/tasks", {
        headers: { Authorization: `Bearer ${token}` },
        params: filter,
      });
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:3000/categories", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

const handleCreateTask = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post("http://localhost:3000/tasks", newTask, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setNewTask({
      title: "",
      description: "",
      category: "",
      status: "pending",
      dueDate: "",
    });
    fetchTasks();
    toast.success("Task created successfully!");
  } catch (error) {
    console.error("Error creating task:", error);
    toast.error("Error creating task.");
  }
};

const handleCreateCategory = async (e) => {
  e.preventDefault();
  try {
    await axios.post(
      "http://localhost:3000/categories",
      { name: newCategory },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setNewCategory("");
    fetchCategories();
    toast.success("Category created successfully!");
  } catch (error) {
    console.error("Error creating category:", error);
    toast.error("Error creating category.");
  }
};

const handleUpdateTask = async () => {
  try {
    await axios.put(
      `http://localhost:3000/tasks/${editingTask._id}`,
      editingTask,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setOpenDialog(false);
    setEditingTask(null);
    fetchTasks();
    toast.success("Task updated successfully!");
  } catch (error) {
    console.error("Error updating task:", error);
    toast.error("Error updating task.");
  }
};

const handleDeleteTask = async (taskId) => {
  try {
    await axios.delete(`http://localhost:3000/tasks/${taskId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchTasks();
    toast.success("Task deleted successfully!");
  } catch (error) {
    console.error("Error deleting task:", error);
    toast.error("Error deleting task.");
  }
};

const handleLogout = () => {
  logout();
  navigate("/login");
  toast.success("Logged out successfully!");
};


  return (
    <Container>
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Task Manager
        </Typography>
        <Button onClick={handleLogout} variant="outlined">
          Logout
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            Create New Task
          </Typography>
          <form onSubmit={handleCreateTask}>
            <TextField
              fullWidth
              label="Title"
              value={newTask.title}
              onChange={(e) =>
                setNewTask({ ...newTask, title: e.target.value })
              }
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Description"
              value={newTask.description}
              onChange={(e) =>
                setNewTask({ ...newTask, description: e.target.value })
              }
              margin="normal"
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Category</InputLabel>
              <Select
                value={newTask.category}
                onChange={(e) =>
                  setNewTask({ ...newTask, category: e.target.value })
                }
              >
                {categories.map((category) => (
                  <MenuItem key={category._id} value={category._id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel>Status</InputLabel>
              <Select
                value={newTask.status}
                onChange={(e) =>
                  setNewTask({ ...newTask, status: e.target.value })
                }
              >
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="in-progress">In Progress</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Due Date"
              type="date"
              value={newTask.dueDate}
              onChange={(e) =>
                setNewTask({ ...newTask, dueDate: e.target.value })
              }
              InputLabelProps={{
                shrink: true,
              }}
              margin="normal"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
            >
              Create Task
            </Button>
          </form>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            Create New Category
          </Typography>
          <form onSubmit={handleCreateCategory}>
            <TextField
              fullWidth
              label="Category Name"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              margin="normal"
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
            >
              Create Category
            </Button>
          </form>
        </Grid>
          </Grid>
          <br />

      {/* Filters */}
      <Box sx={{ mb: 4 }}>
        <FormControl sx={{ minWidth: 120, mr: 2 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={filter.status}
                      onChange={(e) => {
                          setFilter({ ...filter, status: e.target.value })
                          console.log(filter);
                          
                      }}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="in-progress">In Progress</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Category</InputLabel>
          <Select
            value={filter.category}
                      onChange={(e) => {
                          setFilter({ ...filter, category: e.target.value });
                           console.log(filter);
                      }}
          >
            <MenuItem value="">All</MenuItem>
            {categories.map((category) => (
              <MenuItem key={category._id} value={category._id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Task Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Due Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task._id}>
                <TableCell>{task.title}</TableCell>
                <TableCell>{task.description}</TableCell>
                <TableCell>{task.status}</TableCell>
                <TableCell>
                  {task.category ? task.category.name : "None"}
                </TableCell>
                <TableCell>
                  {task.dueDate
                    ? new Date(task.dueDate).toLocaleDateString()
                    : "Not set"}
                </TableCell>
                <TableCell>
                  <IconButton
                    edge="end"
                    aria-label="edit"
                    onClick={() => {
                      setEditingTask(task);
                      setOpenDialog(true);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDeleteTask(task._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          {editingTask && (
            <>
              <TextField
                fullWidth
                label="Title"
                value={editingTask.title}
                onChange={(e) =>
                  setEditingTask({ ...editingTask, title: e.target.value })
                }
                margin="normal"
              />
              <TextField
                fullWidth
                label="Description"
                value={editingTask.description}
                onChange={(e) =>
                  setEditingTask({
                    ...editingTask,
                    description: e.target.value,
                  })
                }
                margin="normal"
              />
              <FormControl fullWidth margin="normal">
                <InputLabel>Category</InputLabel>
                <Select
                  value={editingTask.category ? editingTask.category._id : ""}
                  onChange={(e) =>
                    setEditingTask({ ...editingTask, category: e.target.value })
                  }
                >
                  {categories.map((category) => (
                    <MenuItem key={category._id} value={category._id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth margin="normal">
                <InputLabel>Status</InputLabel>
                <Select
                  value={editingTask.status}
                  onChange={(e) =>
                    setEditingTask({ ...editingTask, status: e.target.value })
                  }
                >
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="in-progress">In Progress</MenuItem>
                  <MenuItem value="completed">Completed</MenuItem>
                </Select>
              </FormControl>
              <TextField
                fullWidth
                label="Due Date"
                type="date"
                value={
                  editingTask.dueDate ? editingTask.dueDate.split("T")[0] : ""
                }
                onChange={(e) =>
                  setEditingTask({ ...editingTask, dueDate: e.target.value })
                }
                InputLabelProps={{
                  shrink: true,
                }}
                margin="normal"
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleUpdateTask}>Save</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Dashboard;
