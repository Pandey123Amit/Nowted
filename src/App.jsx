import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, Routes } from "react-router-dom";
import NotesBar from "./sharedcomponent/NotesBar";
import NotesDetails from "./Components/NotesDetails";
import Layout from "./Layout";
import NotesLayout from "./Components/NotesLayout";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<Layout />}>

          {/* Notes List and Notes Details */}
          <Route path="notes/:folderId" element={<NotesBar />}>
            <Route path=":notesId" element={<NotesDetails />}></Route>
          </Route>

          {/* Favorites */}
          <Route path="fav" element={<NotesBar />}>
            <Route path=":id" element={<NotesDetails />}></Route>
          </Route>

          {/* Trash */}
          <Route path="trash" element={<NotesBar />}>
            <Route path=":id" element={<NotesDetails />}></Route>
          </Route>

          {/* Archived */}
          <Route path="archived" element={<NotesBar />}>
            <Route path=":id" element={<NotesDetails />}></Route>
          </Route>
        </Route>

      </Routes>
    </QueryClientProvider>

  );
}

export default App;
