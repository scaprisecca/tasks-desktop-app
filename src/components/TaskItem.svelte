<script lang="ts">
  import type { Task } from '$lib/types/task';
  import { createEventDispatcher } from 'svelte';

  export let task: Task;
  
  const dispatch = createEventDispatcher<{
    taskUpdate: Task;
    editTask: Task;
  }>();

  function toggleComplete() {
    const updatedTask = {
      ...task,
      completed: !task.completed
    };
    dispatch('taskUpdate', updatedTask);
  }

  function handleEdit() {
    dispatch('editTask', task);
  }
</script>

<div class="task-item" class:completed={task.completed}>
  <div class="task-content">
    <input 
      type="checkbox" 
      checked={task.completed}
      on:change={toggleComplete}
    />
    
    <div class="task-details">
      <h3>{task.title}</h3>
      {#if task.description}
        <p>{task.description}</p>
      {/if}
      {#if task.dueDate}
        <span class="due-date">
          Due: {new Date(task.dueDate).toLocaleDateString()}
        </span>
      {/if}
    </div>
  </div>

  <div class="task-actions">
    <button 
      class="edit-btn"
      on:click={handleEdit}
    >
      Edit
    </button>
  </div>
</div>

<style>
  .task-item {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 1rem;
    margin-bottom: 1rem;
    background: white;
    transition: all 0.2s ease;
  }

  .task-content {
    display: flex;
    gap: 1rem;
    align-items: flex-start;
  }

  .task-details {
    flex: 1;
  }

  .task-details h3 {
    margin: 0;
    font-size: 1.1rem;
  }

  .task-details p {
    margin: 0.5rem 0;
    color: #666;
  }

  .completed {
    background: #f8f9fa;
  }

  .completed .task-details h3 {
    text-decoration: line-through;
    color: #6c757d;
  }

  .due-date {
    font-size: 0.9rem;
    color: #dc3545;
  }

  .task-actions {
    display: flex;
    justify-content: flex-end;
    margin-top: 0.5rem;
  }

  .edit-btn {
    background: #6c757d;
    color: white;
    border: none;
    padding: 0.3rem 0.8rem;
    border-radius: 4px;
    cursor: pointer;
  }

  .edit-btn:hover {
    background: #5a6268;
  }
</style>
