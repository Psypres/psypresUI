<template>
  <PsypresThemeProvider>
    <div class="app">
      <div class="theme-switcher">
        <PsypresThemeToggle size="medium" />
      </div>
      
      <header>
        <h1>PsypresUI Vue Documentation</h1>
        <p>A component library for building modern, accessible Vue interfaces</p>
      </header>

      <section>
        <h2>Headers</h2>
        <div class="component-demo">
          <h3>Default Header</h3>
          <div class="component-row">
            <div class="component-example large-example">
              <PsypresHeader title="Psykologforeningen" />
            </div>
          </div>

          <h3>Header with Nav Items</h3>
          <div class="component-row">
            <div class="component-example large-example">
              <PsypresHeader 
                title="Psykologforeningen" 
                :navItems="[
                  { label: 'Home', url: '#' },
                  { label: 'About', url: '#' },
                  { label: 'Contact', url: '#' }
                ]" 
              />
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2>Buttons</h2>
        <div class="component-demo">
          <h3>Button Variants</h3>
          <div class="component-row">
            <div class="component-example">
              <PsypresButton variant="primary">Primary</PsypresButton>
              <code>variant="primary"</code>
            </div>
            <div class="component-example">
              <PsypresButton variant="secondary">Secondary</PsypresButton>
              <code>variant="secondary"</code>
            </div>
            <div class="component-example">
              <PsypresButton variant="success">Success</PsypresButton>
              <code>variant="success"</code>
            </div>
            <div class="component-example">
              <PsypresButton variant="danger">Danger</PsypresButton>
              <code>variant="danger"</code>
            </div>
          </div>

          <h3>Button Sizes</h3>
          <div class="component-row">
            <div class="component-example">
              <PsypresButton size="small">Small</PsypresButton>
              <code>size="small"</code>
            </div>
            <div class="component-example">
              <PsypresButton size="medium">Medium</PsypresButton>
              <code>size="medium"</code>
            </div>
            <div class="component-example">
              <PsypresButton size="large">Large</PsypresButton>
              <code>size="large"</code>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2>Theme Components</h2>
        <div class="component-demo">
          <h3>Theme Toggle</h3>
          <div class="component-row">
            <div class="component-example">
              <PsypresThemeToggle size="small" />
              <code>size="small"</code>
            </div>
            <div class="component-example">
              <PsypresThemeToggle size="medium" />
              <code>size="medium"</code>
            </div>
            <div class="component-example">
              <PsypresThemeToggle size="large" />
              <code>size="large"</code>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <p>Created with ❤️ by the PsypresUI team</p>
      </footer>
    </div>
  </PsypresThemeProvider>
</template>

<script>
import { 
  PsypresButton, 
  PsypresHeader,
  PsypresThemeProvider,
  PsypresThemeToggle 
} from '@psypres/vue';

export default {
  name: 'App',
  components: {
    PsypresButton,
    PsypresHeader,
    PsypresThemeProvider,
    PsypresThemeToggle
  }
}
</script>

<style>
@import '../assets/styles.css';
</style> 