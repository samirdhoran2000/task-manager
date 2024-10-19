import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'
import { Container, Typography, Paper, Grid } from '@mui/material'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns'

const CalendarView = () => {
  const [tasks, setTasks] = useState([])
  const { token } = useAuth()
  const [currentDate, setCurrentDate] = useState(new Date())

  useEffect(() => {
    fetchTasks()
  }, [currentDate])

  const fetchTasks = async () => {
    try {
      const start = startOfMonth(currentDate)
      const end = endOfMonth(currentDate)
      const response = await axios.get('http://localhost:3000/tasks', {
        headers: { Authorization: `Bearer ${token}` },
        params: { 
          startDate: start.toISOString(),
          endDate: end.toISOString()
        }
      })
      setTasks(response.data)
    } catch (error) {
      console.error('Error fetching tasks:', error)
    }
  }

  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate)
  })

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Calendar - {format(currentDate, 'MMMM yyyy')}
      </Typography>
      <Grid container spacing={1}>
        {daysInMonth.map((day) => (
          <Grid item xs={12/7} key={day.toString()}>
            <Paper
              elevation={3}
              sx={{
                height: 100,
                p: 1,
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden'
              }}
            >
              <Typography variant="subtitle2">
                {format(day, 'd')}
              </Typography>
              {tasks
                .filter((task) => task.dueDate && isSameDay(new Date(task.dueDate), day))
                .map((task) => (
                  <Typography key={task._id} variant="caption" noWrap>
                    {task.title}
                  </Typography>
                ))}
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default CalendarView