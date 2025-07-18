import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@/components/theme-provider';
import { Home } from './pages/home';
import { Room } from './pages/room';
import { Rooms } from './pages/rooms';
import { UploadFilesPage } from './pages/uploadFiles';

const queryClient = new QueryClient();

export function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route element={<Home />} index />
            <Route element={<Rooms />} path="rooms" />
            <Route element={<Room />} path="/room/:roomId" />
            <Route element={<UploadFilesPage />} path="/room/:roomId/dados" />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
