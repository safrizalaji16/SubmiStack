/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `submissions` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[imageId]` on the table `submissions` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "submissions" DROP COLUMN "imageUrl",
ADD COLUMN     "imageId" UUID;

-- CreateTable
CREATE TABLE "images" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "path" VARCHAR(255) NOT NULL,
    "file_name" VARCHAR(255) NOT NULL,
    "url" VARCHAR(500) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "images_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "submissions_imageId_key" ON "submissions"("imageId");

-- AddForeignKey
ALTER TABLE "submissions" ADD CONSTRAINT "submissions_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "images"("id") ON DELETE SET NULL ON UPDATE CASCADE;
