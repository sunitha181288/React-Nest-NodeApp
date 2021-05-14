import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../theme";
import App from './App';

test('renders app component', async () => {
  render(<ThemeProvider theme={theme}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ThemeProvider>);
  const titleElement  = screen.getByText(/users/i);
  expect(titleElement).toBeInTheDocument();
});
