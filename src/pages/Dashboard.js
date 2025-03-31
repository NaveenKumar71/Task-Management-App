import React, { useContext } from 'react';
import { TaskContext } from '../context/TaskContext';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

function Dashboard() {
  const { tasks } = useContext(TaskContext);

  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = tasks.length - completedTasks;

  const pieData = {
    labels: ['Completed', 'Pending'],
    datasets: [{
      data: [completedTasks, pendingTasks],
      backgroundColor: ['#4CAF50', '#FF5722'],
    }]
  };

  const priorityData = {
    labels: ['High', 'Medium', 'Low'],
    datasets: [{
      label: 'Tasks by Priority',
      data: [
        tasks.filter(task => task.priority === 'high').length,
        tasks.filter(task => task.priority === 'medium').length,
        tasks.filter(task => task.priority === 'low').length,
      ],
      backgroundColor: ['#f44336', '#ff9800', '#4caf50'],
    }]
  };

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="stats-container">
        <div className="stat-card">
          <h3>Total Tasks</h3>
          <p>{tasks.length}</p>
        </div>
        <div className="stat-card">
          <h3>Completed Tasks</h3>
          <p>{completedTasks}</p>
        </div>
        <div className="stat-card">
          <h3>Pending Tasks</h3>
          <p>{pendingTasks}</p>
        </div>
      </div>
      <div className="charts-container">
        <div className="chart">
          <h3>Task Status</h3>
          <Pie data={pieData} />
        </div>
        <div className="chart">
          <h3>Tasks by Priority</h3>
          <Bar data={priorityData} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;