PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_post` (
	`id` integer PRIMARY KEY NOT NULL,
	`url` text,
	`title` text,
	`description` text,
	`date` numeric,
	`author` text,
	`category` text,
	`content` text
);
--> statement-breakpoint
INSERT INTO `__new_post`("id", "url", "title", "description", "date", "author", "category", "content") SELECT "id", "url", "title", "description", "date", "author", "category", "content" FROM `post`;--> statement-breakpoint
DROP TABLE `post`;--> statement-breakpoint
ALTER TABLE `__new_post` RENAME TO `post`;--> statement-breakpoint
PRAGMA foreign_keys=ON;