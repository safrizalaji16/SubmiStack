-- DropForeignKey
ALTER TABLE "submission_logs" DROP CONSTRAINT "submission_logs_performedBy_fkey";

-- DropForeignKey
ALTER TABLE "submission_logs" DROP CONSTRAINT "submission_logs_submissionId_fkey";

-- AlterTable
ALTER TABLE "submission_logs" ADD COLUMN     "userId" UUID;
