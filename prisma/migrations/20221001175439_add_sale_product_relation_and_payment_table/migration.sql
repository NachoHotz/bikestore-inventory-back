-- CreateTable
CREATE TABLE "Sale" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "paymentMethodId" INTEGER NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Sale_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductsOnSale" (
    "productId" TEXT NOT NULL,
    "saleId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProductsOnSale_pkey" PRIMARY KEY ("productId","saleId")
);

-- CreateTable
CREATE TABLE "PaymentMethod" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PaymentMethod_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_paymentMethodId_fkey" FOREIGN KEY ("paymentMethodId") REFERENCES "PaymentMethod"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductsOnSale" ADD CONSTRAINT "ProductsOnSale_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductsOnSale" ADD CONSTRAINT "ProductsOnSale_saleId_fkey" FOREIGN KEY ("saleId") REFERENCES "Sale"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
