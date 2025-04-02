export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.provide('psypres', {
    hello: () => alert('Hello from Nuxt plugin!')
  });
});
