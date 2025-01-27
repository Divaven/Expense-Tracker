<template>
  <form @submit.prevent="addExpense" class="add-expense-form">
    <input v-model="title" placeholder="Название" required />
    <input type="number" v-model.number="amount" placeholder="Сумма" required min="0" />
    <select v-model="category" required>
      <option disabled value="">Категория</option>
      <option>Еда</option>
      <option>Транспорт</option>
      <option>Коммунальные</option>
      <option>Развлечения</option>
      <option>Другое</option>
    </select>
    <button type="submit">+</button>
  </form>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'AddExpenseForm',
  setup() {
    const store = useStore();
    const title = ref('');
    const amount = ref(0);
    const category = ref('');

    const addExpense = () => {
      if (title.value && amount.value > 0 && category.value) {
        store.commit('addExpense', {
          id: Date.now(),
          title: title.value,
          amount: amount.value,
          category: category.value,
        });
        title.value = '';
        amount.value = 0;
        category.value = '';
      }
    };

    return { title, amount, category, addExpense };
  },
};
</script>

<style scoped>
.add-expense-form {
  display: flex;
  gap: 5px;
  margin-bottom: 10px;
}

.add-expense-form input,
.add-expense-form select {
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
  font-size: 0.8em;
  flex: 1;
}

.add-expense-form button {
  width: 30px;
  padding: 5px;
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-size: 1.2em;
  line-height: 1;
}

.add-expense-form button:hover {
  background-color: #357ab8;
}
</style>
