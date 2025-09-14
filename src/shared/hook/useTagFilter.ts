import { useMemo, useState } from 'react';

import { TChipData } from 'shared/types';

export const useTagFilter = () => {
  const [selectedTags, setSelectedTags] = useState<Set<TChipData>>(new Set());
  const [selectedAuthor, setSelectedAuthor] = useState<TChipData | null>(null);

  const handleRemoveTag = (item: TChipData) => {
    setSelectedTags((prev) => {
      const newPrev = new Set(prev);
      if (newPrev.delete(item)) {
        return new Set(newPrev);
      }
      return new Set(prev);
    });

    setSelectedAuthor((prev) => {
      if (prev && prev._id === item._id) {
        return null;
      }
      return prev;
    });
  };

  const handleAddTag = (item: TChipData, isAuthor = false) => {
    if (isAuthor) {
      setSelectedAuthor(item);
    } else {
      setSelectedTags((prev) => new Set(prev).add(item));
    }
  };

  const allTags = useMemo(() => {
    return selectedAuthor
      ? [...Array.from(selectedTags), selectedAuthor]
      : [...Array.from(selectedTags)];
  }, [selectedAuthor, selectedTags]);

  return {
    selectedTags,
    setSelectedTags,
    selectedAuthor,
    setSelectedAuthor,
    handleRemoveTag,
    handleAddTag,
    allTags,
  };
};
