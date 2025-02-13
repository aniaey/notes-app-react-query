import NotesList from "./components/NotesList.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-center" />
      <div className="d-flex flex-column gap-2 justify-content-center align-items-center pb-2">
        <h1>Notes</h1>
        <div className="col-10 col-md-6 col-lg-4">
          <NotesList />
        </div>
      </div>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
