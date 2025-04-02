<template>
  <div>
    <div class="mb-4">
      <h2 class="text-2xl font-semibold">{{ isEditing ? 'Edit Task' : 'Create New Task' }}</h2>
    </div>
    
    <form @submit.prevent="saveTodo" class="space-y-4">
      <div>
        <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
        <input 
          id="title"
          v-model="todo.title" 
          type="text" 
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
        />
      </div>
      
      <div>
        <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
        <textarea 
          id="description"
          v-model="todo.description" 
          rows="3"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
        ></textarea>
      </div>
      
      <div v-if="isEditing" class="flex items-center">
        <input 
          id="completed"
          v-model="todo.completed" 
          type="checkbox"
          class="h-4 w-4 rounded border-gray-300"
        />
        <label for="completed" class="ml-2 block text-sm text-gray-700">Mark as completed</label>
      </div>
      
      <div class="flex space-x-2">
        <button 
          type="submit"
          class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          {{ isEditing ? 'Update' : 'Create' }} Task
        </button>
        <router-link 
          to="/"
          class="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
        >
          Cancel
        </router-link>
      </div>
    </form>
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
