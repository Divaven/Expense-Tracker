<template>
  <div class="home">
    <h1>Expense Tracker</h1>
    <AddExpenseForm />
    <ExpenseTable />
  </div>
</template>

<script>
import AddExpenseForm from '../components/AddExpenseForm.vue';
import ExpenseTable from '../components/ExpenseTable.vue';

export default {
  name: 'Home',
  components: {
    AddExpenseForm,
    ExpenseTable,
  },
};
</script>

<style scoped>
.home {
  padding: 2em;
}
</style>
