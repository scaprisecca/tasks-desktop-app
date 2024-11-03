<script lang="ts">
  import { saveTask } from '$lib/storage';
  
  async function handleSave() {
    try {
      await saveTask(newTask);
      alert('Task saved!');
    } catch (error) {
      console.error('Failed to save task:', error);
    }
  }
</script>

<div class="task-form">
  <input bind:value={newTask.title} />
  <button on:click={handleSave}>Save Task</button>
</div> 