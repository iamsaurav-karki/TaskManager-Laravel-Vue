// TodoForm.vue - Enhanced UI
<template>
  <div class="bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen">
    <div class="container mx-auto px-4 py-8 max-w-4xl">
      <div class="bg-white rounded-xl shadow-xl p-6">
        <div class="mb-6 flex items-center">
          <router-link 
            to="/"
            class="mr-4 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </router-link>
          <h2 class="text-2xl font-semibold text-gray-800">
            {{ isEditing ? 'Edit Task' : 'Create New Task' }}
          </h2>
        </div>
        
        <form @submit.prevent="saveTodo" class="space-y-6">
          <div>
            <label for="title" class="block text-sm font-medium text-gray-700 mb-1">Task Title</label>
            <input 
              id="title"
              v-model="todo.title" 
              type="text" 
              required
              placeholder="What needs to be done?"
              class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
            />
          </div>
          
          <div>
            <label for="description" class="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea 
              id="description"
              v-model="todo.description" 
              rows="4"
              placeholder="Add details about this task (optional)"
              class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
            ></textarea>
          </div>
          
          <div v-if="isEditing" class="flex items-center">
            <input 
              id="completed"
              v-model="todo.completed" 
              type="checkbox"
              class="h-5 w-5 rounded border-2 border-gray-300 focus:ring-blue-500 text-blue-600"
            />
            <label for="completed" class="ml-2 block text-sm text-gray-700">Mark as completed</label>
          </div>
          
          <div class="flex space-x-3 pt-4">
            <button 
              type="submit"
              class="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:opacity-90 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex-1"
              :disabled="loading"
            >
              <span v-if="loading" class="flex items-center justify-center">
                <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
              <span v-else>{{ isEditing ? 'Update Task' : 'Create Task' }}</span>
            </button>
            <router-link 
              to="/"
              class="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition-colors duration-200"
            >
              Cancel
            </router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'TodoForm',
  props: {
    id: {
      type: String,
      required: false
    }
  },
  data() {
    return {
      todo: {
        title: '',
        description: '',
        completed: false
      },
      loading: false
    };
  },
  computed: {
    isEditing() {
      return !!this.id;
    }
  },
  async mounted() {
    if (this.isEditing) {
      await this.fetchTodo();
    }
  },
  methods: {
    async fetchTodo() {
      try {
        const response = await axios.get(`/api/todos/${this.id}`);
        this.todo = response.data;
      } catch (error) {
        console.error('Failed to fetch todo:', error);
        this.$router.push('/');
      }
    },
    async saveTodo() {
      try {
        this.loading = true;
        
        if (this.isEditing) {
          await axios.put(`/api/todos/${this.id}`, this.todo);
        } else {
          await axios.post('/api/todos', this.todo);
        }
        
        this.$router.push('/');
      } catch (error) {
        console.error('Failed to save todo:', error);
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>
