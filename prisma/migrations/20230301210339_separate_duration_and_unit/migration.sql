/*
  Warnings:

  - The `duration` column on the `Task` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "unit" TEXT,
DROP COLUMN "duration",
ADD COLUMN     "duration" DOUBLE PRECISION;
