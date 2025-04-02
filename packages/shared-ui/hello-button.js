class HelloButton extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = '<button>Hello from Web Component!</button>';
    this.querySelector('button').addEventListener('click', () => {
      alert('Shared UI says hello!');
    });
  }
}
customElements.define('hello-button', HelloButton);
