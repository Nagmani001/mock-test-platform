/*
  Warnings:

  - Added the required column `testId` to the `Mcq` table without a default value. This is not possible if the table is not empty.
  - Added the required column `yearBasedSectionId` to the `Test` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Mcq" ADD COLUMN     "testId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Test" ADD COLUMN     "yearBasedSectionId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Test" ADD CONSTRAINT "Test_yearBasedSectionId_fkey" FOREIGN KEY ("yearBasedSectionId") REFERENCES "YearBasedSection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mcq" ADD CONSTRAINT "Mcq_testId_fkey" FOREIGN KEY ("testId") REFERENCES "Test"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
