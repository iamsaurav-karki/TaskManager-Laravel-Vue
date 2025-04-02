// TodoList.vue - Enhanced UI
<template>
  <div class="bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen">
    <div class="container mx-auto px-4 py-8 max-w-4xl">
      <div class="mb-8 text-center">
        <h1 class="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
          Task Master
        </h1>
        <p class="text-gray-600 mt-2">Organize your life, one task at a time</p>
      </div>

      <div class="bg-white rounded-xl shadow-xl p-6 mb-6">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-semibold text-gray-800 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            My Tasks
          </h2>
          <router-link 
            to="/create" 
            class="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:opacity-90 transition-all duration-200 flex items-center shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            Add New Task
          </router-link>
        </div>

        <div v-if="loading" class="flex justify-center py-12">
          <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
        
        <div v-else-if="todos.length === 0" class="text-center py-12 bg-gray-50 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <p class="text-gray-500 text-lg">No tasks yet. Create your first task!</p>
        </div>
        
        <div v-else class="space-y-3">
          <div 
            v-for="todo in todos" 
            :key="todo.id" 
            class="border border-gray-100 p-4 rounded-lg shadow-sm hover:shadow transition-all duration-200"
            :class="{ 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-100': todo.completed, 'bg-white': !todo.completed }"
          >
            <div class="flex justify-between items-center">
              <div class="flex items-center space-x-3 flex-1">
                <div class="relative">
                  <input 
                    type="checkbox" 
                    :checked="todo.completed" 
                    @change="toggleCompleted(todo)"
                    class="h-5 w-5 rounded-full border-2 border-gray-300 focus:ring-blue-500 text-blue-600 cursor-pointer"
                  />
                  <span v-if="todo.completed" class="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                </div>
                <h3 
                  class="text-lg font-medium transition-all duration-200"
                  :class="{ 'line-through text-gray-400': todo.completed, 'text-gray-800': !todo.completed }"
                >{{ todo.title }}</h3>
              </div>
              
              <div class="flex space-x-2">
                <router-link 
                  :to="`/edit/${todo.id}`"
                  class="text-blue-500 hover:text-blue-700 p-2 rounded-full hover:bg-blue-50 transition-colors duration-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </router-link>
                <button 
                  @click="deleteTodo(todo.id)"
                  class="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition-colors duration-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
            
            <p v-if="todo.description" class="mt-2 text-gray-600 pl-8">
              {{ todo.description }}
            </p>
          </div>
        </div>
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
        const updatedTodo = {...todo, completed: !todo.completed};
        const response = await axios.put(`/api/todos/${todo.id}`, updatedTodo);
        const index = this.todos.findIndex(t => t.id === todo.id);
        if (index !== -1) {
          this.todos[index] = response.data;
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
