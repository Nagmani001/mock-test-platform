/*
  Warnings:

  - You are about to drop the `ComprehenshionAnswer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ComprehenshionAnswer" DROP CONSTRAINT "ComprehenshionAnswer_solutionId_fkey";

-- AlterTable
ALTER TABLE "Solution" ADD COLUMN     "ComprehensionAnswer" TEXT[],
ALTER COLUMN "wordsNumber" DROP NOT NULL;

-- DropTable
DROP TABLE "ComprehenshionAnswer";
