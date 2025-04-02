<template>
  <div>
    <div class="mb-4 flex justify-between items-center">
      <h2 class="text-2xl font-semibold">My Tasks</h2>
      <router-link 
        to="/create" 
        class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
      >
        Add New Task
      </router-link>
    </div>

    <div v-if="loading" class="text-center py-8">
      Loading...
    </div>
    
    <div v-else-if="todos.length === 0" class="text-center py-8 bg-gray-100 rounded">
      <p class="text-gray-500">No tasks yet. Create your first task!</p>
    </div>
    
    <div v-else class="space-y-2">
      <div 
        v-for="todo in todos" 
        :key="todo.id" 
        class="border p-4 rounded shadow-sm hover:shadow transition-shadow"
        :class="{ 'bg-green-50': todo.completed }"
      >
        <div class="flex justify-between items-center">
          <div class="flex items-center space-x-3">
            <input 
              type="checkbox" 
              :checked="todo.completed" 
              @change="toggleCompleted(todo)"
              class="h-5 w-5 rounded border-gray-300"
            />
            <h3 
              class="text-lg font-medium"
              :class="{ 'line-through text-gray-400': todo.completed }"
            >{{ todo.title }}</h3>
          </div>
          
          <div class="flex space-x-2">
            <router-link 
              :to="`/edit/${todo.id}`"
              class="text-blue-500 hover:text-blue-700"
            >
              Edit
            </router-link>
            <button 
              @click="deleteTodo(todo.id)"
              class="text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </div>
        </div>
        
        <p v-if="todo.description" class="mt-2 text-gray-600">
          {{ todo.description }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'TodoList',
  data() {
    return {
      todos: [],
      loading: true,
      error: null
    };
  },
  mounted() {
    this.fetchTodos();
  },
  methods: {
    async fetchTodos() {
      try {
        this.loading = true;
        const response = await axios.get('/api/todos');
        this.todos = response.data;
      } catch (error) {
        this.error = 'Failed to load todos';
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    async toggleCompleted(todo) {
      try {
        const response = await axios.put(`/api/todos/${todo.id}`, {
          completed: !todo.completed
        });
        const index = this.todos.findIndex(t => t.id === todo.id);
        if (index !== -1) {
          this.todos[index].completed = response.data.completed;
        }
      } catch (error) {
        console.error('Failed to update todo:', error);
      }
    },
    async deleteTodo(id) {
      if (!confirm('Are you sure you want to delete this task?')) return;
      
      try {
        await axios.delete(`/api/todos/${id}`);
        this.todos = this.todos.filter(todo => todo.id !== id);
      } catch (error) {
        console.error('Failed to delete todo:', error);
      }
    }
  }
};
</script>
