export default function Header() {
  return (
    <div className="bg-white border-b border-gray-200 px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-semibold text-blue-600 uppercase">
            Board Overview
          </p>
          <h1 className="text-2xl font-bold text-gray-900">Workspace</h1>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end w-full md:w-auto">
          <div className="relative w-full sm:w-64">
            <svg
              className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
              ></path>
            </svg>
            <input
              type="search"
              id="card-search"
              placeholder="Search tasks"
              className="w-full rounded-xl border border-gray-200 bg-white pl-11 pr-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-gray-900 focus:outline-none"
            />
          </div>
          <button className="px-4 py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors">
            + Add Task
          </button>
        </div>
      </div>
    </div>
  );
}
