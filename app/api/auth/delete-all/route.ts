import { connectDB } from "@/db/db";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export const GET = async () => {
  await connectDB();
  try {
    const users = await mongoose.connection.db?.collection("user").find().toArray();
    return NextResponse.json({success: true, message: "Users found", users});
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete users.",
      },
      { status: 500 }
    );
  }
};
