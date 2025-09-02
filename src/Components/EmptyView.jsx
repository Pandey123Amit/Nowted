import { FileText } from "lucide-react"; // nice file icon

export default function EmptyNotesView() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-neutral-900 text-center">
      {/* Icon */}
      <FileText className="w-16 h-16 text-gray-400 mb-6" />

      {/* Title */}
      <h2 className="text-xl font-semibold text-gray-200">
        Select note to view
      </h2>

      {/* Subtitle */}
      <p className="text-gray-400 mt-2 max-w-md">
        Choose a note from the list on the left to view its contents, or create
        a new note to add to your collection.
      </p>
    </div>
  );
}
