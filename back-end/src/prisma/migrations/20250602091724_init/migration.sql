/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Media` table. All the data in the column will be lost.
  - You are about to drop the column `bookId` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `rating` on the `Review` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[mediaId]` on the table `Book` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `mediaId` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Book" DROP CONSTRAINT "Book_id_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_bookId_fkey";

-- DropIndex
DROP INDEX "Media_type_idx";

-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "mediaId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Media" DROP COLUMN "createdAt";

-- AlterTable
ALTER TABLE "Review" DROP COLUMN "bookId",
DROP COLUMN "createdAt",
DROP COLUMN "rating";

-- CreateIndex
CREATE UNIQUE INDEX "Book_mediaId_key" ON "Book"("mediaId");

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Media"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
