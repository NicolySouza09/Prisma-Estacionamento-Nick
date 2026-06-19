/*
  Warnings:

  - You are about to drop the `client` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `movimentacao` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `usuário` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `vaga` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `veiculo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `client`;

-- DropTable
DROP TABLE `movimentacao`;

-- DropTable
DROP TABLE `usuário`;

-- DropTable
DROP TABLE `vaga`;

-- DropTable
DROP TABLE `veiculo`;

-- CreateTable
CREATE TABLE `usurio` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `senha` VARCHAR(191) NOT NULL,
    `perfil` VARCHAR(191) NOT NULL DEFAULT 'Funcionario',
    `criadoEm` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `usurio_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
