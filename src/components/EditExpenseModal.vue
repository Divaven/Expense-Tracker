<template>
  <div class="modal-overlay">
    <div class="modal">
      <h2>Редактировать</h2>
      <form @submit.prevent="updateExpense">
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
        <div class="buttons">
          <button type="submit" class="save-btn">✓</button>
          <button type="button" class="cancel-btn" @click="$emit('close')">✖</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'EditExpenseModal',
  props: {
    expense: {
      type: Object,
      required: true,
    },
  },
  setup(props, { emit }) {
    const store = useStore();
    const title = ref(props.expense.title);
    const amount = ref(props.expense.amount);
    const category = ref(props.expense.category);

    watch(
        () => props.expense,
        (newExpense) => {
          title.value = newExpense.title;
          amount.value = newExpense.amount;
          category.value = newExpense.category;
        }
    );

    const updateExpense = () => {
      if (title.value && amount.value > 0 && category.value) {
        store.commit('editExpense', {
          id: props.expense.id,
          title: title.value,
          amount: amount.value,
          category: category.value,
        });
        emit('close');
      }
    };

    return { title, amount, category, updateExpense };
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background-color: white;
  padding: 10px;
  border-radius: 4px;
  width: 90%;
  max-width: 250px;
}

h2 {
  margin-bottom: 10px;
  font-size: 1em;
  text-align: center;
}

form {
  display: flex;
  flex-direction: column;
  gap: 5px;
}


.buttons {
  display: flex;
  justify-content: flex-end;
  gap: 5px;
}


</style>
