const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-4xl md:text-6xl font-bold text-red-600">404</h1>
      <p className="text-lg md:text-2xl mt-4">Page Not Found</p>
      <a
        href="/"
        className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Go Back Home
      </a>
    </div>
  );
};

export default NotFound;
