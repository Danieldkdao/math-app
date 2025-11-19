import Link from "next/link";

const NotSignedIn = () => {
  return (
    <div className="border border-gray-400 rounded-md p-4 space-y-2">
      <h1 className="text-2xl font-bold text-center">401 Unauthorized</h1>
      <p className="text-center text-gray-600">
        You are not authorized to access this page. Please return to the home
        page or sign in.
      </p>
      <div className="flex gap-4 flex-wrap">
        <Link
          href="/"
          className="py-2 px-5 rounded-md border border-cyan-800 bg-cyan-50 hover:bg-cyan-100 transition-colors duration-300 ease-in-out"
        >
          Home
        </Link>
        <Link
          href="/auth/login"
          className="py-2 px-5 rounded-md border border-cyan-800 bg-cyan-50 hover:bg-cyan-100 transition-colors duration-300 ease-in-out"
        >
          Sign in
        </Link>
      </div>
    </div>
  );
}

export default NotSignedIn