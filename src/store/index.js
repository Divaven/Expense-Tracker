import { createStore } from 'vuex';

const STORAGE_KEY = 'expense_tracker_expenses';

export default createStore({
    state: {
        expenses: JSON.parse(localStorage.getItem(STORAGE_KEY)) || [],
    },
    mutations: {
        addExpense(state, expense) {
            state.expenses.push(expense);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state.expenses));
        },
        deleteExpense(state, id) {
            state.expenses = state.expenses.filter((expense) => expense.id !== id);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state.expenses));
        },
        editExpense(state, updatedExpense) {
            const index = state.expenses.findIndex((e) => e.id === updatedExpense.id);
            if (index !== -1) {
                state.expenses[index] = updatedExpense;
                localStorage.setItem(STORAGE_KEY, JSON.stringify(state.expenses));
            }
        },
        setExpenses(state, expenses) {
            state.expenses = expenses;
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state.expenses));
        },
    },
    getters: {
        totalAmount(state) {
            return state.expenses.reduce((sum, expense) => sum + expense.amount, 0);
        },
        expensesByCategory(state) {
            return state.expenses.reduce((acc, expense) => {
                acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
                return acc;
            }, {});
        },
    },
});
