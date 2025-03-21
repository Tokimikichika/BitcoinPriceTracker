<template>
    <div>
      <h1>Bitcoin Price Tracker</h1>
      <select v-model="selectedPeriod" @change="fetchData">
        <option value="1">Day</option>
        <option value="7">Week</option>
        <option value="30">Month</option>
        <option value="365">Year</option>
      </select>
      <div v-if="loading">Loading...</div>
      <div v-else-if="chartData && chartData.length">
        <canvas ref="chartCanvas"></canvas>
      </div>
      <div v-else>
        <p>No data available for the selected period.</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, watch, nextTick } from 'vue';
  import { Chart } from 'chart.js/auto';
  import axios from 'axios';
  
  const selectedPeriod = ref('1');
  const chartData = ref([]);
  const chartInstance = ref(null);
  const chartCanvas = ref(null);
  const loading = ref(false);
  
  async function fetchData() {
    loading.value = true;
    try {
      const response = await axios.get(`/api/prices`, { params: { days: selectedPeriod.value } });
      
      if (!response.data || response.data.length === 0) {
        chartData.value = [];
      } else {
        chartData.value = response.data;
        await updateChart(chartData.value); 
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      chartData.value = [];
    } finally {
      loading.value = false;
    }
  }
  
  async function updateChart(data) {
    if (!data || data.length === 0) {
      console.error('updateChart: Нет данных для построения графика', data);
      return;
    }
  
    await nextTick(); 
  
    if (!chartCanvas.value) {
      console.error("Canvas element not found");
      return;
    }
  
    if (chartInstance.value) {
      chartInstance.value.destroy();
    }
  
    const ctx = chartCanvas.value.getContext('2d');
    chartInstance.value = new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.map(entry => new Date(entry.timestamp).toLocaleDateString()),
        datasets: [{
          label: 'Bitcoin Price (USD)',
          data: data.map(entry => entry.price),
          borderColor: '#4CAF50',
          tension: 0.1,
        }],
      },
    });
  }
  
  onMounted(async () => {
    console.log('Component mounted');
    await nextTick(); 
    fetchData();
  });
  
  watch(selectedPeriod, fetchData);
  </script>