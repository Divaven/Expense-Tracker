<template>
  <header>
    <nav>
      <router-link to="/" class="nav-link">Главная</router-link>
      <router-link to="/statistics" class="nav-link">Статистика</router-link>
      <button @click="clearExpenses" class="clear-btn">Сбросить</button>
    </nav>
  </header>
</template>

<script>
import { useStore } from 'vuex';

export default {
  name: 'Header',
  setup() {
    const store = useStore();

    const clearExpenses = () => {
      if (confirm('Вы уверены, что хотите сбросить все расходы?')) {
        store.commit('setExpenses', []);
      }
    };

    return { clearExpenses };
  },
};
</script>

<style scoped>
header {
  background-color: #333;
  padding: 5px 10px;
}

nav {
  display: flex;
  align-items: center;
  gap: 10px;
}

.nav-link {
  color: #fff;
  text-decoration: none;
  font-size: 0.85em;
}

.nav-link:hover {
  text-decoration: underline;
}

.clear-btn {
  margin-left: auto;
  background-color: #d9534f;
  color: white;
  border: none;
  padding: 4px 8px;
  border-radius: 3px;
  cursor: pointer;
  font-size: 0.8em;
}

.clear-btn:hover {
  background-color: #c9302c;
}
</style>
