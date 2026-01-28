import '@chrctr/shoehorn';
import { initBuyMeCoffee } from './buy-me-coffee';
import './index.css';
import { initPlayground } from './playground';

document.addEventListener('DOMContentLoaded', () => {
  initPlayground();
  initBuyMeCoffee();
});
