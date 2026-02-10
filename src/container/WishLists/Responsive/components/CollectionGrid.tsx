import CollectionCard from "./CollectionCard";
import type { Collection } from "@/services/Collection/useGetCollections";

interface CollectionGridProps {
  collections: Collection[];
  onOpenCollection: (id: string) => void;
  onCreateSuccess: () => void;
}

const CollectionGrid = ({
  collections,
  onOpenCollection,
  onCreateSuccess,
}: CollectionGridProps) => {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-8 pb-24">
      <CollectionCard isCreateNew onSuccess={onCreateSuccess} />
      {collections.map((collection) => (
        <CollectionCard
          key={collection.id}
          collection={collection}
          onClick={() => onOpenCollection(collection.id)}
        />
      ))}
    </div>
  );
};

export default CollectionGrid;
