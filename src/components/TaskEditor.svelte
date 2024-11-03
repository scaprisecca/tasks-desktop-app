<script lang="ts">
  import type { Task } from '$lib/types/task';
  import { createEventDispatcher } from 'svelte';
  import { saveTask } from '$lib/storage';

  export let task: Task | undefined = undefined;
  const isEditing = !!task;

  const dispatch = createEventDispatcher<{
    save: Task;
    cancel: void;
  }>();

  let formData = {
    title: task?.title || '',
    description: task?.description || '',
    dueDate: task?.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '',
    priority: task?.priority || 1
  };

  async function handleSubmit() {
    try {
      const newTask: Task = {
        id: task?.id || crypto.randomUUID(),
        title: formData.title,
        description: formData.description,
        dueDate: formData.dueDate ? new Date(formData.dueDate) : undefined,
        priority: formData.priority,
        completed: task?.completed || false
      };

      await saveTask(newTask);
      dispatch('save', newTask);
    } catch (error) {
      console.error('Failed to save task:', error);
      // TODO: Add proper error handling
    }
  }

  function handleCancel() {
    dispatch('cancel');
  }
</script>

<form class="task-editor" on:submit|preventDefault={handleSubmit}>
  <div class="form-group">
    <label for="title">Title</label>
    <input
      id="title"
      type="text"
      bind:value={formData.title}
      required
    />
  </div>

  <div class="form-group">
    <label for="description">Description</label>
    <textarea
      id="description"
      bind:value={formData.description}
      rows="3"
    ></textarea>
  </div>

  <div class="form-group">
    <label for="dueDate">Due Date</label>
    <input
      id="dueDate"
      type="date"
      bind:value={formData.dueDate}
    />
  </div>

  <div class="form-group">
    <label for="priority">Priority</label>
    <select id="priority" bind:value={formData.priority}>
      <option value={1}>Low</option>
      <option value={2}>Medium</option>
      <option value={3}>High</option>
    </select>
  </div>

  <div class="form-actions">
    <button type="button" class="cancel-btn" on:click={handleCancel}>
      Cancel
    </button>
    <button type="submit" class="save-btn">
      {isEditing ? 'Update' : 'Create'} Task
    </button>
  </div>
</form>

<style>
  .task-editor {
    background: white;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }

  .form-group {
    margin-bottom: 1rem;
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }

  input, textarea, select {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
  }

  .form-actions {
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
    margin-top: 1.5rem;
  }

  .cancel-btn {
    background: #6c757d;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
  }

  .save-btn {
    background: #0d6efd;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
  }

  .cancel-btn:hover {
    background: #5a6268;
  }

  .save-btn:hover {
    background: #0b5ed7;
  }
</style>
