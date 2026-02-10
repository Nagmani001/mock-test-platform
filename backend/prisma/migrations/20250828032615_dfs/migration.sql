/*
  Warnings:

  - You are about to drop the column `questionId` on the `Comprehenshion` table. All the data in the column will be lost.
  - You are about to drop the column `solutionId` on the `ComprehenshionAnswer` table. All the data in the column will be lost.
  - Added the required column `testId` to the `Comprehenshion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `testAnswerId` to the `ComprehenshionAnswer` table without a default value. This is not possible if the table is not empty.
  - Made the column `words` on table `Question` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Comprehenshion" DROP CONSTRAINT "Comprehenshion_questionId_fkey";

-- DropForeignKey
ALTER TABLE "ComprehenshionAnswer" DROP CONSTRAINT "ComprehenshionAnswer_solutionId_fkey";

-- AlterTable
ALTER TABLE "Comprehenshion" DROP COLUMN "questionId",
ADD COLUMN     "testId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ComprehenshionAnswer" DROP COLUMN "solutionId",
ADD COLUMN     "testAnswerId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Question" ALTER COLUMN "words" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Comprehenshion" ADD CONSTRAINT "Comprehenshion_testId_fkey" FOREIGN KEY ("testId") REFERENCES "Test"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ComprehenshionAnswer" ADD CONSTRAINT "ComprehenshionAnswer_testAnswerId_fkey" FOREIGN KEY ("testAnswerId") REFERENCES "TestAnswer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
