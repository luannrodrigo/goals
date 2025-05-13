-- CreateTable
CREATE TABLE "thermal_sensations" (
    "id" TEXT NOT NULL,
    "thermalSensation" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "goalId" TEXT NOT NULL,

    CONSTRAINT "thermal_sensations_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "thermal_sensations" ADD CONSTRAINT "thermal_sensations_goalId_fkey" FOREIGN KEY ("goalId") REFERENCES "goals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
