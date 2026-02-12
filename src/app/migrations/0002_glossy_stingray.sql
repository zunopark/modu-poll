CREATE TABLE "move_likes" (
	"move_id" serial NOT NULL,
	"profile_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "move_likes_move_id_profile_id_pk" PRIMARY KEY("move_id","profile_id")
);
--> statement-breakpoint
CREATE TABLE "move_reviews" (
	"review_id" serial NOT NULL UNIQUE,
	"move_id" serial NOT NULL,
	"profile_id" uuid NOT NULL,
	"review" text NOT NULL,
	"user_vote_level" varchar(50) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "move_reviews_move_id_profile_id_pk" PRIMARY KEY("move_id","profile_id")
);
--> statement-breakpoint
CREATE TABLE "follows" (
	"follower_id" uuid,
	"following_id" uuid,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "profiles" (
	"profile_id" uuid PRIMARY KEY NOT NULL,
	"name" varchar(50) NOT NULL,
	"nickname" varchar(50) NOT NULL,
	"avatar_url" varchar(500),
	"bio" varchar(100),
	"is_teacher" boolean DEFAULT false NOT NULL,
	"stats" jsonb DEFAULT '{"followers":0,"following":0}'::jsonb NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "move_likes" ADD CONSTRAINT "move_likes_move_id_moves_id_fk" FOREIGN KEY ("move_id") REFERENCES "public"."moves"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "move_likes" ADD CONSTRAINT "move_likes_profile_id_profiles_profile_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("profile_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "move_reviews" ADD CONSTRAINT "move_reviews_move_id_moves_id_fk" FOREIGN KEY ("move_id") REFERENCES "public"."moves"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "move_reviews" ADD CONSTRAINT "move_reviews_profile_id_profiles_profile_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("profile_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "follows" ADD CONSTRAINT "follows_follower_id_profiles_profile_id_fk" FOREIGN KEY ("follower_id") REFERENCES "public"."profiles"("profile_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "follows" ADD CONSTRAINT "follows_following_id_profiles_profile_id_fk" FOREIGN KEY ("following_id") REFERENCES "public"."profiles"("profile_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_profile_id_users_id_fk" FOREIGN KEY ("profile_id") REFERENCES "auth"."users"("id") ON DELETE cascade ON UPDATE no action;