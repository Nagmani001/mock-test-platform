/*
  Warnings:

  - You are about to drop the column `testId` on the `Comprehenshion` table. All the data in the column will be lost.
  - You are about to drop the column `testAnswerId` on the `ComprehenshionAnswer` table. All the data in the column will be lost.
  - Added the required column `questionId` to the `Comprehenshion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `solutionId` to the `ComprehenshionAnswer` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Comprehenshion" DROP CONSTRAINT "Comprehenshion_testId_fkey";

-- DropForeignKey
ALTER TABLE "ComprehenshionAnswer" DROP CONSTRAINT "ComprehenshionAnswer_testAnswerId_fkey";

-- AlterTable
ALTER TABLE "Comprehenshion" DROP COLUMN "testId",
ADD COLUMN     "questionId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ComprehenshionAnswer" DROP COLUMN "testAnswerId",
ADD COLUMN     "solutionId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Question" ALTER COLUMN "words" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Comprehenshion" ADD CONSTRAINT "Comprehenshion_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ComprehenshionAnswer" ADD CONSTRAINT "ComprehenshionAnswer_solutionId_fkey" FOREIGN KEY ("solutionId") REFERENCES "Solution"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
