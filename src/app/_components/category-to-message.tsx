import type { MessageDescriptor } from "@lingui/core";
import { msg } from "@lingui/core/macro";
import { Category } from "@/core/domains/auction";

export const CategoryToMessage = new Map<Category, MessageDescriptor>([
  [Category.ART, msg`Art`],
  [Category.AUTOMOTIVE, msg`Automotive`],
  [Category.COLLECTIBLES, msg`Collectibles`],
  [Category.ELECTRONICS, msg`Electronics`],
  [Category.FASHION, msg`Fashion`],
  [Category.HOME, msg`Home`],
  [Category.MUSIC, msg`Music`],
  [Category.SPORTS, msg`Sports`],
  [Category.TOYS, msg`Toys`],
]);
