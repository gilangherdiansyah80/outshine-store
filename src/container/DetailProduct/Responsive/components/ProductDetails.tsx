import { useState } from "react";
import { AccordionItem } from "@outshine/ui/Accordion/Accordion";
import type { ProductSpec } from "@outshine/services/Products/useGetDetailProduct";

interface ProductDetailsProps {
  description: string;
  specs: ProductSpec[];
  fabricAndCare: string;
}

const ProductDetails = ({
  description,
  specs,
  fabricAndCare,
}: ProductDetailsProps) => {
  const [openSection, setOpenSection] = useState<string | null>("description");

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="mt-8 border-b border-slate-200">
      <AccordionItem
        title="Deskripsi Produk"
        isOpen={openSection === "description"}
        onClick={() => toggleSection("description")}
        className="border-slate-200"
        titleClassName="text-slate-900"
        iconClassName="text-slate-900"
      >
        <div className="space-y-4 text-[15px] text-slate-600 leading-relaxed font-light">
          <p>{description}</p>
        </div>
      </AccordionItem>

      <AccordionItem
        title="Care Instructions"
        isOpen={openSection === "care"}
        onClick={() => toggleSection("care")}
        className="border-slate-200"
        titleClassName="text-slate-900"
        iconClassName="text-slate-900"
      >
        <div className="text-[15px] text-slate-600 leading-relaxed font-light">
          <p>{fabricAndCare}</p>
        </div>
      </AccordionItem>

      <AccordionItem
        title="Spesifikasi Produk"
        isOpen={openSection === "shipping"}
        onClick={() => toggleSection("shipping")}
        className="border-slate-200"
        titleClassName="text-slate-900"
        iconClassName="text-slate-900"
      >
        <div className="text-[15px] text-slate-600 leading-relaxed font-light">
          <ul className="space-y-2">
            {specs?.map((spec: ProductSpec) => (
              <li
                key={spec.id}
                className="flex justify-between border-b border-slate-100 pb-2 last:border-0 last:pb-0"
              >
                <span className="font-medium text-slate-900">{spec.key}</span>
                <span className="text-slate-600">{spec.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </AccordionItem>
    </div>
  );
};

export default ProductDetails;
