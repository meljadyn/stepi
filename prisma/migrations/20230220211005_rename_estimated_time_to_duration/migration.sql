/*
  Warnings:

  - You are about to drop the column `timeEstimate` on the `Task` table. All the data in the column will be lost.
  - Added the required column `duration` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Task" DROP COLUMN "timeEstimate",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "duration" TIMESTAMP NOT NULL;
