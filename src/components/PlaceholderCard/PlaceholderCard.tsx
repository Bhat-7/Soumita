interface PlaceholderCardProps {
  title: string;
}

const PlaceholderCard = ({ title }: PlaceholderCardProps) => {
  return (
    <div className="flex h-full min-h-[250px] flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-4 text-center text-gray-500 transition-all duration-300 hover:border-gray-400 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:border-gray-500">
      <h3 className="mb-2 text-lg font-bold">{title}</h3>
      <p>Coming Soon...</p>
    </div>
  );
};

export default PlaceholderCard;
