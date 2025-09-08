ALTER TABLE "data_storage" ADD COLUMN "user_id" integer;--> statement-breakpoint
ALTER TABLE "data_storage" ADD CONSTRAINT "data_storage_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "data_storage" DROP COLUMN "description";