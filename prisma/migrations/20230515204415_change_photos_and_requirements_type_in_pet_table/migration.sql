/*
  Warnings:

  - Changed the type of `photos` on the `pets` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `requirements` on the `pets` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "pets" DROP COLUMN "photos",
ADD COLUMN     "photos" JSONB NOT NULL,
DROP COLUMN "requirements",
ADD COLUMN     "requirements" JSONB NOT NULL;
