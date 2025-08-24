import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

export default function Nav() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img
              src="https://guidely.in/assets/images/home/guidely-logo.svg"
              alt="Guidely Logo"
              className="h-8 w-auto"
            />
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <form className="w-full">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg 
                    className="w-4 h-4 text-gray-400" 
                    aria-hidden="true" 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 20 20"
                  >
                    <path 
                      stroke="currentColor" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="2" 
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" 
                    />
                  </svg>
                </div>
                <input 
                  type="search" 
                  id="default-search" 
                  className="block w-full pl-10 pr-20 py-2.5 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" 
                  placeholder="Search for tests, courses..." 
                  required 
                />
                <button 
                  type="submit" 
                  className="absolute right-1.5 top-1.5 text-white bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:outline-none focus:ring-blue-500 font-medium rounded-md text-sm px-3 py-1.5 transition-colors"
                >
                  Search
                </button>
              </div>
            </form>
          </div>

          {/* User Actions */}
          <div className="flex items-center gap-4">
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <div className="rounded-lg px-4 py-2 border border-gray-300 hover:bg-gray-50 cursor-pointer transition-colors">
                <SignInButton />
              </div>
            </SignedOut>
          </div>
        </div>
      </div>
    </div>
  );
}
