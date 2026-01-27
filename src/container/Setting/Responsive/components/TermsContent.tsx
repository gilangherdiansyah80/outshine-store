interface TermsContentProps {
  title: string;
  content: string[];
}

const TermsContent = ({ title, content }: TermsContentProps) => {
  return (
    <div className="bg-white px-4 py-4 border-b border-gray-100">
      <h2 className="text-sm font-semibold text-gray-800 mb-2">{title}</h2>
      <div className="space-y-2">
        {content.map((paragraph, index) => (
          <p key={index} className="text-sm text-gray-600 leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
};

export default TermsContent;
