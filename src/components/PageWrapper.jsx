function PageWrapper({ children }) {
  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-white p-4">
      {children}
    </div>
  );
}

export default PageWrapper;
