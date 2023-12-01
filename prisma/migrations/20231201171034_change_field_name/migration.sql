/*
  Warnings:

  - You are about to drop the column `Quantity_of_items_bought` on the `Product` table. All the data in the column will be lost.
  - Added the required column `quantity` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "Quantity_of_items_bought",
ADD COLUMN     "quantity" INTEGER NOT NULL;
