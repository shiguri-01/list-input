
import React, { useState } from 'react';
import TagInput from './components/TagInput';

const App: React.FC = () => {
  const [tags, setTags] = useState<string[]>(['React', 'TypeScript', 'TailwindCSS']);

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center font-sans p-4">
      <div className="w-full max-w-2xl">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">List Input</h1>
          <p className="text-lg text-gray-400">
            Type a text and press Enter or Comma to add it.
          </p>
        </header>

        <main className="bg-gray-900 p-6 rounded-xl shadow-2xl shadow-blue-500/10">
          <label htmlFor="tags-input" className="block text-sm font-medium text-gray-300 mb-2">
            Project Tags
          </label>
          <TagInput 
            tags={tags} 
            setTags={setTags} 
            placeholder="Add a tag..."
          />
        </main>

        <footer className="mt-8 text-center">
            <h2 className="text-xl font-semibold text-white mb-4">Current List</h2>
            <div className="bg-gray-850 p-4 rounded-lg text-left">
              <pre className="text-sm text-green-400 whitespace-pre-wrap">
                <code>{JSON.stringify(tags, null, 2)}</code>
              </pre>
            </div>
        </footer>
      </div>
    </div>
  );
};

export default App;
