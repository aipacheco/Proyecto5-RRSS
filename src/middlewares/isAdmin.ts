import { NextFunction, Request, Response } from "express"

export const isAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.tokenData.role !== "admin") {
      return res.status(401).json({
        success: false,
        message: "UNAUTHORIZED",
      })
    }
    next()
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "You dont have permisions",
    })
  }
}