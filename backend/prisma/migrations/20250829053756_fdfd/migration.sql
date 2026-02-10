/*
  Warnings:

  - You are about to drop the `Comprehenshion` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Comprehenshion" DROP CONSTRAINT "Comprehenshion_questionId_fkey";

-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "comprehension" TEXT[];

-- DropTable
DROP TABLE "Comprehenshion";
