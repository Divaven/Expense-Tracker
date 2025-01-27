<template>
  <div class="statistics">
    <h1>Статистика</h1>
    <div class="chart-container">
      <canvas v-if="hasData" ref="chartCanvas"></canvas>
      <p v-else>Нет данных</p>
    </div>
  </div>
</template>

<script>
import { computed, ref, onMounted, watch } from 'vue';
import { useStore } from 'vuex';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

export default {
  name: 'Statistics',
  setup() {
    const store = useStore();
    const chartCanvas = ref(null);
    const chartInstance = ref(null);
    const hasData = computed(() => store.state.expenses.length > 0);

    const renderChart = () => {
      if (chartInstance.value) {
        chartInstance.value.destroy();
      }

      if (hasData.value) {
        const ctx = chartCanvas.value.getContext('2d');
        chartInstance.value = new Chart(ctx, {
          type: 'pie',
          data: {
            labels: Object.keys(store.getters.expensesByCategory),
            datasets: [
              {
                data: Object.values(store.getters.expensesByCategory),
                backgroundColor: [
                  '#FF6384',
                  '#36A2EB',
                  '#FFCE56',
                ],
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false,
              },
            },
          },
        });
      }
    };

    onMounted(() => {
      renderChart();
    });

    watch(
        () => store.state.expenses,
        () => {
          renderChart();
        },
        {deep: true}
    );

    return {chartCanvas, hasData};
  },
};
</script>

<style scoped>
.statistics {
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

h1 {
  margin-bottom: 8px;
  font-size: 1em;
  color: #333;
}

.chart-container {
  width: 120px;
  height: 120px;
  position: relative;
}

canvas {
  width: 100% !important;
  height: 100% !important;
}

p {
  margin-top: 5px;
  color: #666;
  font-size: 0.75em;
}
</style>
