<script lang="ts">
  import type { Task } from '$lib/types/task';
  import TaskItem from './TaskItem.svelte';
  import { onMount } from 'svelte';
  import { readTextFile } from '@tauri-apps/api/fs';
  import { appDataDir } from '@tauri-apps/api/path';

  let tasks: Task[] = [];
  let loading = true;
  let error: string | null = null;

  async function loadTasks() {
    try {
      const appDir = await appDataDir();
      const tasksJson = await readTextFile(`${appDir}/tasks.json`);
      tasks = JSON.parse(tasksJson);
      loading = false;
    } catch (err) {
      console.error('Failed to load tasks:', err);
      error = 'Failed to load tasks';
      loading = false;
    }
  }

  function handleTaskUpdate(event: CustomEvent<Task>) {
    const updatedTask = event.detail;
    tasks = tasks.map(task => 
      task.id === updatedTask.id ? updatedTask : task
    );
  }

  onMount(() => {
    loadTasks();
  });
</script>

<div class="task-list">
  {#if loading}
    <div class="loading">Loading tasks...</div>
  {:else if error}
    <div class="error">{error}</div>
  {:else if tasks.length === 0}
    <div class="empty">No tasks yet. Create your first task!</div>
  {:else}
    {#each tasks as task (task.id)}
      <TaskItem 
        {task}
        on:taskUpdate={handleTaskUpdate}
      />
    {/each}
  {/if}
</div>

<style>
  .task-list {
    max-width: 800px;
    margin: 0 auto;
    padding: 1rem;
  }

  .loading, .error, .empty {
    text-align: center;
    padding: 2rem;
    color: #666;
  }

  .error {
    color: #dc3545;
  }
</style>
