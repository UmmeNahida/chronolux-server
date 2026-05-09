import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";
import AppError from "../../ErrorHandler/appErrors";
import { createUserTokens } from "../../utils/userToken";
import { authService } from "./auth.services";
import { setAuthCookie } from "../../utils/setCookie";
import passport from "passport";

const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await authService.addUser(req.body);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "user created successfully",
      data: user,
    });
  },
);

const credentialsLogin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate(
      "local",
      (err: any, user: any, info: any) => {
        if (err) {
          return next(new AppError(401, info?.message || err));
        }

        if (!user) {
          return next(
            new AppError(401, info?.message || "User does not exist"),
          );
        }

        const userToken = createUserTokens(user);
        //    console.log("userToken",userToken)

        setAuthCookie(res, userToken);

        // remove password from user object
        const userObj = user.toObject();
        delete userObj.password;

        return sendResponse(res, {
          success: true,
          statusCode: httpStatus.OK,
          message: "user login successfully",
          data: {
            accessToken: userToken.accessToken,
            refreshToken: userToken.refreshToken,
            user: user,
          },
        });
      },
    )(req, res, next);
    // console.log(users)
  },
);

const logout = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // res.clearCookie("token", {
    //     httpOnly: true,
    //     secure: true,
    //     sameSite:
    // })

    // res.clearCookie("refreshToken", {
    //     httpOnly: true,
    //     secure: false,
    //     sameSite: "lax"
    // })

    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "user logout successfully",
      data: {},
    });
  },
);

const getRefreshToken = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token;
    if (!token) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "token is not found",
      );
    }
    const loginInfoDecoded = await authService.getNewRefreshToken(
      token as string,
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "user login successfully",
      data: loginInfoDecoded,
    });
    // console.log(users)
  },
);

export const authController = {
  createUser,
  credentialsLogin,
  getRefreshToken,
  logout,
};
