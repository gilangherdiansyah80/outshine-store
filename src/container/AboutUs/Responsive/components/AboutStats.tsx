const AboutStats = () => {
  return (
    <div className="grid grid-cols-2 gap-3">
      {[
        { label: "Happy Customers", value: "10k+" },
        { label: "Years Experience", value: "5+" },
        { label: "Premium Products", value: "500+" },
        { label: "Country Delivery", value: "20+" },
      ].map((stat, idx) => (
        <div
          key={idx}
          className="bg-[#141925] p-4 rounded-2xl border border-white/5"
        >
          <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
          <div className="text-xs text-gray-500 font-medium uppercase tracking-wide">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AboutStats;
