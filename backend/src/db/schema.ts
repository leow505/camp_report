import { pgTable, serial, text, timestamp, integer, doublePrecision, varchar, pgEnum } from "drizzle-orm/pg-core";

// Status Enums
export const adStatusEnum = pgEnum("ad_status", ["active", "paused", "rejected", "pending"]);
export const creativeStatusEnum = pgEnum("creative_status", ["pending", "approved", "rejected", "flagged"]);

// Campaigns Table
export const campaigns = pgTable("campaigns", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    advertiserName: text("advertiser_name").notNull(),
    budgetTotal: doublePrecision("budget_total").notNull(),
    budgetDaily: doublePrecision("budget_daily").notNull(),
    status: adStatusEnum("status").default("active"),
    createdAt: timestamp("created_at").defaultNow(),
});

// Ads Table
export const ads = pgTable("ads", {
    id: serial("id").primaryKey(),
    campaignId: integer("campaign_id").references(() => campaigns.id),
    name: text("name").notNull(),
    status: adStatusEnum("status").default("active"),
    createdAt: timestamp("created_at").defaultNow(),
});

// Ad Stats / Pacing Table (Real-time data)
export const adStats = pgTable("ad_stats", {
    id: serial("id").primaryKey(),
    campaignId: integer("campaign_id").references(() => campaigns.id),
    timestamp: timestamp("timestamp").defaultNow(),
    spend: doublePrecision("spend").notNull(), // Accumulative spend for the day
    impressions: integer("impressions").default(0),
    clicks: integer("clicks").default(0),
    conversions: integer("conversions").default(0),
    country: varchar("country", { length: 50 }),
    os: varchar("os", { length: 50 }),
    deviceType: varchar("device_type", { length: 50 }),
});

// Creatives Table (Moderation Queue)
export const creatives = pgTable("creatives", {
    id: serial("id").primaryKey(),
    adId: integer("ad_id").references(() => ads.id),
    thumbnailUrl: text("thumbnail_url").notNull(),
    videoUrl: text("video_url").notNull(),
    status: creativeStatusEnum("status").default("pending"),
    rejectionReason: text("rejection_reason"),
    createdAt: timestamp("created_at").defaultNow(),
});

// Example table (existing)
export const users = pgTable("users", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
});
