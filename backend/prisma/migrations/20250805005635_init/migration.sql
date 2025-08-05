-- CreateEnum
CREATE TYPE "TestType" AS ENUM ('FULL_LENGTH', 'SECTIONAL');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Section" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Section_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "YearBasedSection" (
    "id" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "totalTests" INTEGER NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "sectionId" TEXT NOT NULL,

    CONSTRAINT "YearBasedSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Test" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "type" "TestType" NOT NULL,
    "language" TEXT NOT NULL,
    "questions" INTEGER NOT NULL,
    "time" INTEGER NOT NULL,

    CONSTRAINT "Test_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mcq" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "metadata" JSONB NOT NULL,
    "options" TEXT[],

    CONSTRAINT "Mcq_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "YearBasedSection" ADD CONSTRAINT "YearBasedSection_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
