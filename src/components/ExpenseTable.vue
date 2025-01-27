<template>
  <div class="expense-table">
    <table>
      <thead>
      <tr>
        <th>Название</th>
        <th>Сумма</th>
        <th>Категория</th>
        <th>Действия</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="expense in expenses" :key="expense.id">
        <td>{{ expense.title }}</td>
        <td>{{ expense.amount.toFixed(2) }} ₽</td>
        <td>{{ expense.category }}</td>
        <td>
          <button class="edit-btn" @click="editExpense(expense)">✎</button>
          <button class="delete-btn" @click="deleteExpense(expense.id)">✖</button>
        </td>
      </tr>
      </tbody>
    </table>
    <EditExpenseModal
        v-if="isModalOpen"
        :expense="selectedExpense"
        @close="isModalOpen = false"
    />
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import EditExpenseModal from './EditExpenseModal.vue';

export default {
  name: 'ExpenseTable',
  components: {
    EditExpenseModal,
  },
  setup() {
    const store = useStore();
    const isModalOpen = ref(false);
    const selectedExpense = ref(null);

    const expenses = computed(() => store.state.expenses);

    const deleteExpense = (id) => {
      if (confirm('Удалить этот расход?')) {
        store.commit('deleteExpense', id);
      }
    };

    const editExpense = (expense) => {
      selectedExpense.value = expense;
      isModalOpen.value = true;
    };

    return { expenses, deleteExpense, editExpense, isModalOpen, selectedExpense };
  },
};
</script>

<style scoped>
.expense-table table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.75em;
}

th,
td {
  padding: 6px;
  text-align: left;
  border: 1px solid #ddd;
}

tr:nth-child(even) {
  background-color: #fafafa;
}

.edit-btn,
.delete-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 0.85em;
  margin-right: 5px;
}

.edit-btn {
  color: #ffc107;
}

.delete-btn {
  color: #dc3545;
}

</style>
