const DashboardPage = () => {
  const performanceOverview = [
    {
      title: "Total Puzzles",
      value: "1,250",
      description: "(Lifetime Puzzles Solved)",
    },
    {
      title: "Accuracy",
      value: "85%",
      description: "(Overall Correct Solution Rate)",
    },
    {
      title: "Avg Time",
      value: "35s",
      description: "(Average Time per Attempt)",
    },
    {
      title: "Current Rank",
      value: "Master I",
      description: "(Global standing based on skill)",
    },
  ];  
  
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">PERFORMANCE OVERVIEW</h1>
      <hr className="text-gray-400" />
      <div className="grid grid-cols-4 gap-4">
        {performanceOverview.map((item, index) => {
          return (
            <div
              key={index}
              className="flex flex-col items-center gap-2 border border-gray-400 rounded-md p-4"
            >
              <h1 className="text-xl font-medium text-gray-600">
                {item.title}
              </h1>
              <h1 className="text-lg font-bold text-gray-500">{item.value}</h1>
              <p className="text-gray-500 text-center">{item.description}</p>
            </div>
          );
        })}
      </div>
      <hr className="text-gray-400" />
      <h1 className="text-2xl font-bold">CHALLENGE ZONE</h1>
      <hr className="text-gray-400" />
      <div>
        <button></button>
      </div>
    </div>
  );
}

export default DashboardPage