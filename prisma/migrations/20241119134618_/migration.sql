/*
  Warnings:

  - You are about to drop the column `categoryId` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_tripId_fkey";

-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_categoryId_fkey";

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "categoryId",
ADD COLUMN     "date" TEXT,
ADD COLUMN     "tripId" TEXT;

-- DropTable
DROP TABLE "Category";

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip"("id") ON DELETE SET NULL ON UPDATE CASCADE;
