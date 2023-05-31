/*
  Warnings:

  - Changed the type of `energy_level` on the `pets` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "pets" DROP COLUMN "energy_level",
ADD COLUMN     "energy_level" INTEGER NOT NULL;
