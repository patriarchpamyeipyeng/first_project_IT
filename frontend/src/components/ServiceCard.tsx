type ServiceCardProps = {
  name: string;
  description?: string;
  icon?: string | null;
};

export default function ServiceCard({ name, description, icon }: ServiceCardProps) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 flex flex-col items-center text-center">
      {icon && (
        <img
          src={icon}
          alt={name}
          className="w-20 h-20 mb-4 object-contain"
        />
      )}
      <h2 className="text-xl font-semibold text-gray-800 mb-2">{name}</h2>
      <p className="text-gray-600 text-sm">{description || "No description available."}</p>
    </div>
  );
}
