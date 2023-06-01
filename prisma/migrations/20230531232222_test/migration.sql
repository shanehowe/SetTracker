-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "passwordHash" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkoutFolder" (
    "id" SERIAL NOT NULL,
    "folderName" VARCHAR(30) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "WorkoutFolder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Exercise" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Exercise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rep" (
    "weight" DOUBLE PRECISION NOT NULL,
    "reps" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "exercise" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Rep_pkey" PRIMARY KEY ("userId","createdAt")
);

-- CreateTable
CREATE TABLE "FolderExercise" (
    "exercise" TEXT NOT NULL,
    "folderId" INTEGER NOT NULL,

    CONSTRAINT "FolderExercise_pkey" PRIMARY KEY ("exercise","folderId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "WorkoutFolder" ADD CONSTRAINT "WorkoutFolder_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rep" ADD CONSTRAINT "Rep_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FolderExercise" ADD CONSTRAINT "FolderExercise_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "WorkoutFolder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
