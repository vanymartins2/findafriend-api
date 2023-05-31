/*
  Warnings:

  - The `photos` column on the `pets` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `requirements` column on the `pets` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "pets" DROP COLUMN "photos",
ADD COLUMN     "photos" TEXT[],
DROP COLUMN "requirements",
ADD COLUMN     "requirements" TEXT[];
