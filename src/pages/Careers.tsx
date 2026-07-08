const CareersPage = () => {
  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 py-24 min-h-[60vh] flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold text-slate-900 mb-6">Careers</h1>
      <p className="text-lg text-gray-600 max-w-lg mb-8">
        We currently do not have any open job listings. However, we are growing 
        rapidly and plan to open up several new opportunities soon.
      </p>
      <div className="p-6 bg-gray-50 rounded-xl border border-gray-100 text-gray-500 italic">
        Please check back later for updates!
      </div>
    </div>
  );
};

export default CareersPage;