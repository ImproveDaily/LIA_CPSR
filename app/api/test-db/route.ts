import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-static'
export const revalidate = false

export async function GET() {
  try {
    console.log("Testing database connection...");
    console.log("DATABASE_URL:", process.env.DATABASE_URL);
    
    // Test de connectie door een eenvoudige query uit te voeren
    const userCount = await prisma.user.count();
    console.log("Database connection successful!");
    console.log("Number of users:", userCount);
    
    return NextResponse.json({ 
      success: true, 
      message: "Database connection successful",
      userCount 
    });
  } catch (error: any) {
    console.error("Database connection error:", error);
    return NextResponse.json(
      { 
        success: false, 
        error: "Database connection failed",
        details: error.message 
      },
      { status: 500 }
    );
  }
} 