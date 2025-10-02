"use client";

type ServiceCardProps = {
  name: string;
  description?: string;
  icon?: string | null;
  onSelect?: () => void;
};

export default function ServiceCard({
  name,
  description,
  icon,
  onSelect,
}: ServiceCardProps) {
  return (
    <div
      onClick={onSelect}
      role={onSelect ? "button" : undefined}
      className="flex flex-col items-center p-6 text-center transition transform bg-white shadow-md cursor-pointer rounded-2xl hover:shadow-xl hover:-translate-y-1"
    >
      {icon && (
        <img
          src={icon}
          alt={name}
          className="object-contain w-20 h-20 mb-4"
        />
      )}
      <h2 className="mb-2 text-xl font-semibold text-gray-800">{name}</h2>
      <p className="text-sm text-gray-600">
        {description || "No description available."}
      </p>
    </div>
  );
}
