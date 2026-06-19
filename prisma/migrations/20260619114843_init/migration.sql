/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `usuário` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `usuário` MODIFY `perfil` VARCHAR(191) NOT NULL DEFAULT 'Funcionario';

-- CreateIndex
CREATE UNIQUE INDEX `usuário_email_key` ON `usuário`(`email`);
