import { useState } from "react";
import { AccordionItem } from "@outshine/ui/Accordion/Accordion";

interface ProductDetailsProps {
  fabricAndCare: string;
}

const ProductDetails = ({ fabricAndCare }: ProductDetailsProps) => {
  const [openSection, setOpenSection] = useState<string | null>("description");

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="mt-8 border-b border-slate-200">
      <AccordionItem
        title="Product Description"
        isOpen={openSection === "description"}
        onClick={() => toggleSection("description")}
        className="border-slate-200"
        titleClassName="text-slate-900"
        iconClassName="text-slate-900"
      >
        <div className="space-y-4 text-[15px] text-slate-600 leading-relaxed font-light">
          <p>
            Elevate your everyday rotation with our Heavyweight Sculpt Tee.
            Engineered from premium 320GSM organic cotton, this piece features a
            drop-shoulder silhouette with a structured fit that retains its
            shape wash after wash.
          </p>
          <ul className="space-y-2 list-disc list-inside marker:text-slate-300">
            <li>Custom boxy fit</li>
            <li>High-density screen print logo</li>
            <li>Reinforced double-stitched seams</li>
          </ul>
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
        title="Shipping & Returns"
        isOpen={openSection === "shipping"}
        onClick={() => toggleSection("shipping")}
        className="border-slate-200"
        titleClassName="text-slate-900"
        iconClassName="text-slate-900"
      >
        <div className="text-[15px] text-slate-600 leading-relaxed font-light">
          <p>
            Standard shipping takes 3-5 business days. Returns are accepted
            within 14 days of receipt for unused items in original packaging.
          </p>
        </div>
      </AccordionItem>
    </div>
  );
};

export default ProductDetails;
