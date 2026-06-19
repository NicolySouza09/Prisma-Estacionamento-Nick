-- CreateTable
CREATE TABLE `movimentacao` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `dataEntrada` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `dataSida` DATETIME(3) NULL,
    `valorHora` DECIMAL(10, 2) NOT NULL,
    `valorTotal` DECIMAL(10, 2) NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'Aberto',
    `criadoEm` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `veiculo` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
