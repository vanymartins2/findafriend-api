/*
  Warnings:

  - A unique constraint covering the columns `[org_id]` on the table `pets` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "pets_org_id_key" ON "pets"("org_id");
