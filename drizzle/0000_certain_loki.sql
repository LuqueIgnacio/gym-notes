CREATE TABLE `actividad` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`huboActividad` integer,
	`fecha` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `ejercicio` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text
);
--> statement-breakpoint
CREATE TABLE `peso` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`peso` real NOT NULL,
	`fecha` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `rutina` (
	`id` blob PRIMARY KEY NOT NULL,
	`name` text
);
--> statement-breakpoint
CREATE TABLE `RutinaCabecera` (
	`id` blob PRIMARY KEY NOT NULL,
	`idRutina` blob NOT NULL,
	`fecha` text,
	`tiempoInicio` text,
	`tiempoFinal` text,
	`finished` integer DEFAULT false,
	FOREIGN KEY (`idRutina`) REFERENCES `rutina`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `RutinaDetalle` (
	`idRutinaCabecera` blob NOT NULL,
	`idEjercicio` integer NOT NULL,
	`numeroSerie` integer,
	`peso` real,
	`reps` integer,
	PRIMARY KEY(`idEjercicio`, `idRutinaCabecera`, `numeroSerie`),
	FOREIGN KEY (`idRutinaCabecera`) REFERENCES `RutinaCabecera`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`idEjercicio`) REFERENCES `ejercicio`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `Rutina-Ejercicio` (
	`rutinaId` blob NOT NULL,
	`ejercicioId` integer NOT NULL,
	PRIMARY KEY(`ejercicioId`, `rutinaId`),
	FOREIGN KEY (`rutinaId`) REFERENCES `rutina`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`ejercicioId`) REFERENCES `ejercicio`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `ejercicio_name_unique` ON `ejercicio` (`name`);--> statement-breakpoint
CREATE UNIQUE INDEX `rutina_name_unique` ON `rutina` (`name`);