-- AlterTable
ALTER TABLE "Solution" ALTER COLUMN "answer" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Comprehenshion" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,

    CONSTRAINT "Comprehenshion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ComprehenshionAnswer" (
    "id" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "solutionId" TEXT NOT NULL,

    CONSTRAINT "ComprehenshionAnswer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Comprehenshion" ADD CONSTRAINT "Comprehenshion_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ComprehenshionAnswer" ADD CONSTRAINT "ComprehenshionAnswer_solutionId_fkey" FOREIGN KEY ("solutionId") REFERENCES "Solution"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
