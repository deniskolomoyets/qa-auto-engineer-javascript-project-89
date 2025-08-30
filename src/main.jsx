import '@hexlet/chatbot-v2/styles';
import ReactDOM from 'react-dom/client';
import Widget from '@hexlet/chatbot-v2';
// import steps from '@hexlet/chatbot-v2/example-steps';
import '@hexlet/chatbot-v2/styles';
import steps from '../__fixtures__/basicSteps.js';


const container = document.getElementById('root');
ReactDOM.createRoot(container)
  .render(Widget(steps));