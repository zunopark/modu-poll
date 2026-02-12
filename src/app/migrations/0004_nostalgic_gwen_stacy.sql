CREATE TYPE "public"."notification_types" AS ENUM('follow', 'like', 'comment', 'mention');--> statement-breakpoint
CREATE TYPE "public"."categories" AS ENUM('전체', '공지', '자유', '리뷰', '질문', '팁', '이벤트');--> statement-breakpoint
CREATE TYPE "public"."levels" AS ENUM('beginner', 'intermediate', 'advanced', 'master');--> statement-breakpoint
CREATE TABLE "community" (
	"community_id" serial PRIMARY KEY NOT NULL,
	"profile_id" uuid NOT NULL,
	"title" varchar(100) NOT NULL,
	"content" text,
	"category" "categories" NOT NULL,
	"stats" jsonb DEFAULT '{"views":0,"likes":0,"comments":0}'::jsonb NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "community_comments" (
	"comment_id" serial PRIMARY KEY NOT NULL,
	"community_id" integer NOT NULL,
	"profile_id" uuid NOT NULL,
	"parent_comment_id" integer,
	"content" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "community_likes" (
	"community_id" integer NOT NULL,
	"profile_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "community_likes_community_id_profile_id_pk" PRIMARY KEY("community_id","profile_id")
);
--> statement-breakpoint
CREATE TABLE "move_saves" (
	"move_id" integer NOT NULL,
	"profile_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "move_saves_profile_id_move_id_pk" PRIMARY KEY("profile_id","move_id")
);
--> statement-breakpoint
CREATE TABLE "notifications" (
	"notification_id" serial PRIMARY KEY NOT NULL,
	"source_profile_id" uuid,
	"target_profile_id" uuid NOT NULL,
	"type" "notification_types" NOT NULL,
	"community_id" integer,
	"read_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "move_likes" ALTER COLUMN "move_id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "move_reviews" ALTER COLUMN "move_id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "moves" ALTER COLUMN "level" SET DATA TYPE "public"."levels" USING "level"::text::"public"."levels";--> statement-breakpoint
ALTER TABLE "moves_to_tags" ALTER COLUMN "move_id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "moves_to_tags" ALTER COLUMN "tag_id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "follows" ALTER COLUMN "follower_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "follows" ALTER COLUMN "following_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "follows" ADD CONSTRAINT "follows_follower_id_following_id_pk" PRIMARY KEY("follower_id","following_id");--> statement-breakpoint
ALTER TABLE "community" ADD CONSTRAINT "community_profile_id_profiles_profile_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("profile_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "community_comments" ADD CONSTRAINT "community_comments_community_id_community_community_id_fk" FOREIGN KEY ("community_id") REFERENCES "public"."community"("community_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "community_comments" ADD CONSTRAINT "community_comments_profile_id_profiles_profile_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("profile_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "community_comments" ADD CONSTRAINT "community_comments_parent_comment_id_community_comments_comment_id_fk" FOREIGN KEY ("parent_comment_id") REFERENCES "public"."community_comments"("comment_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "community_likes" ADD CONSTRAINT "community_likes_community_id_community_community_id_fk" FOREIGN KEY ("community_id") REFERENCES "public"."community"("community_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "community_likes" ADD CONSTRAINT "community_likes_profile_id_profiles_profile_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("profile_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "move_saves" ADD CONSTRAINT "move_saves_move_id_moves_id_fk" FOREIGN KEY ("move_id") REFERENCES "public"."moves"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "move_saves" ADD CONSTRAINT "move_saves_profile_id_profiles_profile_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("profile_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_source_profile_id_profiles_profile_id_fk" FOREIGN KEY ("source_profile_id") REFERENCES "public"."profiles"("profile_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_target_profile_id_profiles_profile_id_fk" FOREIGN KEY ("target_profile_id") REFERENCES "public"."profiles"("profile_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_community_id_community_community_id_fk" FOREIGN KEY ("community_id") REFERENCES "public"."community"("community_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_nickname_unique" UNIQUE("nickname");