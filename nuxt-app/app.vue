<template>
  <div>
    <nav>
      <NuxtLink to="/">Home</NuxtLink>
    </nav>

    <NuxtPage />
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f4f4f9;
  color: #333;
}

nav {
  background-color: #4CAF50;
  padding: 1rem;
  text-align: center;
}

nav a {
  color: white;
  text-decoration: none;
  margin: 0 1rem;
  font-weight: bold;
}

nav a:hover {
  text-decoration: underline;
}
</style>