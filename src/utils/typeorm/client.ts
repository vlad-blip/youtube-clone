import "reflect-metadata";

import { DataSource } from "typeorm";

import { Video } from "./entity/video.entity";
import { Channel } from "./entity/channel.entity";
import { Category } from "./entity/category.entity";

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  synchronize: process.env.NODE_ENV === "development",
  logging: process.env.NODE_ENV === "development",
  entities: [Video, Channel, Category],
  subscribers: [],
  migrations: [],
});

export const getDataSource = async (): Promise<DataSource> => {
  if (AppDataSource.isInitialized) {
    console.log("Using existing TypeORM data source connection");
    return AppDataSource;
  } else {
    try {
      console.log("Initializing TypeORM data source connection...");
      await AppDataSource.initialize();
      console.log("TypeORM data source has been initialized!");
      return AppDataSource;
    } catch (error) {
      console.error("Error during TypeORM data source initialization:", error);
      // Rethrow or handle error appropriately
      throw error;
    }
  }
};
