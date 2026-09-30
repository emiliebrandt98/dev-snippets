import Tag from "@/db/models/Tag";

export async function areTagsOwnedByUser(tagIds, userId) {
  if (!Array.isArray(tagIds)) {
    return false;
  }

  const ownedTagsCount = await Tag.countDocuments({
    _id: { $in: tagIds },
    userId: userId,
  });

  return ownedTagsCount === tagIds.length;
}
